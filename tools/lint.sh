FILES="*.js src/**/*.js storage/*.js"

runLint(){
  eslint $FILES;
}

runFix(){
  eslint --fix $FILES
}

"$@"
