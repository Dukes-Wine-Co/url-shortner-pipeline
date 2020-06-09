#!/bin/bash

FILES="src/**/*.js storage/**/*.js test/**/*.js";

runLint(){
  eslint $FILES;
}

runFix(){
  eslint --fix $FILES;
}

"$@"
