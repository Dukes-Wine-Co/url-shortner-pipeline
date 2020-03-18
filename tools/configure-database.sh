DB="prod"
COLLECTION="url-traffic"

startDocker() {
  docker run -d -p 3000:3000 \
    -v ~/metabase-data:/metabase-data \
    -e "MB_DB_FILE=/metabase-data/metabase.db" \
    --name metabase metabase/metabase
}

killDocker() {
  (docker kill metabase || true) && (docker rm metabase || true) && echo "container killed"
}

uploadMongo() {
  source env.sh;

  mongoimport --host "$MONGO_DB_HOST" \
    --ssl --username "$MONGO_DB_USR" \
    --password "$MONGO_DB_PSW" \
    --authenticationDatabase admin \
    --db $DB \
    --collection $COLLECTION --drop \
    --type json \
    --file dist/output.json;
}

exportMongo(){
  mongoexport -d $DB -c $COLLECTION -o dist/"$COLLECTION".json;
}

uploadGcloud(){
  source env.sh;

  bq load \
  --autodetect \
  --replace=true \
  --source_format=NEWLINE_DELIMITED_JSON \
  "$GCLOUD_STORAGE" \
  dist/output.json;
}

"$@"
