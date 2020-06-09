#!/bin/bash

TMP_DIR=tmp-objs;
OUTPUT_DIR=dist;

clean(){
  rm -rf $TMP_DIR $OUTPUT_DIR;
}

makeDirs(){
  mkdir $TMP_DIR $OUTPUT_DIR;
}

run(){
  clean;
  makeDirs;
}

"$@"
