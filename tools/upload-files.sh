#!/usr/bin/env bash

if [ "$(whoami)" == "tscafe" ]; then
        source env.sh;
fi
source tools/configure-database.sh;


(echo "Uploading files to mongodb" && uploadMongo) \
&& (echo "Uploading files to Google cloud storage" && uploadGcloud) \
&& echo "Upload complete";
