#!/bin/bash

source ./env.sh;
DB="prod";
COLLECTION="url-traffic";
CONTAINER_NAME="metabase";
PORT=3007;
METABASE_URL="http://localhost:$PORT";
NGROK_INSTALL="ngrok-install.zip";

openMetabaseChrome(){
   open -a "Google Chrome" "${NGROK_SUBDOMAIN}.ngrok.io";
}

restartDocker() {
  docker restart ${CONTAINER_NAME};
}

startDocker() {
  if [[ $(restartDocker) ]]
  then
    echo "$CONTAINER_NAME container restarted";
  else
    echo "need to start $CONTAINER_NAME - restart failed";

    docker run -d -p $PORT:3000 \
      -v ~/metabase-data:/metabase-data \
      -e "MB_DB_FILE=/metabase-data/metabase.db" \
      --name "$CONTAINER_NAME" metabase/metabase;

    echo "$CONTAINER_NAME container started";
  fi

  echo "$CONTAINER_NAME container running";

  runTunnel && sleep 30 && openMetabaseChrome;
}

killDocker() {
  (docker kill ${CONTAINER_NAME} || true) && (docker rm ${CONTAINER_NAME} || true) && echo "$CONTAINER_NAME container killed";
}

runTunnel(){
    docker exec -d ${CONTAINER_NAME} ./ngrok http 3000 -subdomain="${NGROK_SUBDOMAIN}";
}

updateMetabase(){
    docker pull metabase/metabase;
    startDocker;
}

addNgrok(){
    docker cp ngrok/${NGROK_INSTALL}- ${CONTAINER_NAME}:/;
    docker exec -it ${CONTAINER_NAME} unzip ${NGROK_INSTALL};
    docker exec -it ${CONTAINER_NAME} ./ngrok authtoken ${NGROK_AUTH_TOKEN};
}

uploadMongo() {
  mongoimport --host ${MONGO_DB_HOST} \
    --ssl --username ${MONGO_DB_USR} \
    --password ${MONGO_DB_PSW} \
    --authenticationDatabase admin \
    --db ${DB} \
    --collection ${COLLECTION} --drop \
    --type json \
    --file dist/output.json;
}

exportMongo(){
  mongoexport -d ${DB} -c ${COLLECTION} -o dist/${COLLECTION}.json;
}

uploadGcloud(){
  bq load \
  --autodetect \
  --replace=true \
  --source_format=NEWLINE_DELIMITED_JSON \
  ${GCLOUD_STORAGE} \
  dist/output.json;
}

"$@"
