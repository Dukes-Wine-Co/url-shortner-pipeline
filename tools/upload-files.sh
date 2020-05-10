#!/usr/bin/env bash
source tools/configure-database.sh;
source env.sh;

(echo "Uploading files to mongodb" && uploadMongo) \
&& (echo "Uploading files to Google cloud storage" && uploadGcloud) \
&& echo "Upload complete";
