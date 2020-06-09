#!/usr/bin/env bash

. env.sh;
. tools/configure-database.sh;


(echo "Uploading files to mongodb" && uploadMongo) \
&& (echo "Uploading files to Google cloud storage" && uploadGcloud) \
&& echo "Upload complete";
