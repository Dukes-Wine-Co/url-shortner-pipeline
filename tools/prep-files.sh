#!/bin/bash

source env.sh;

setCloudProject(){
  gcloud config configurations activate default;
}

loadBucketFiles(){
  node src/prep/load-all-files.js;
}

unzipFiles(){
  for file in tmp-objs/*gz
  do
    gunzip "$file"
  done
}

processLogs(){
  for file in tmp-objs/*.json
  do
    node src/prep/process-logs.js "$file" >> dist/output.json
  done
}

"$@"
