pipeline {
  agent any

  tools {
    nodejs "node"
  }

  stages {
    stage('Copy creds'){
      configFileProvider([configFile(fileId: '3def6afe-170a-4598-a91a-7b66face82aa', replaceTokens: true, targetLocation: '3def6afe-170a-4598-a91a-7b66face82aa', variable: 'GCLOUD_VAL')]){
              sh '$GCLOUD_VALS > storage/service-account-creds.json'
          }
    }

    stage('Cloning Git') {
      steps {
        git 'https://github.com/Dukes-Wine-Co/url-shortner-pipeline'
      }
    }

    stage('Install dependencies') {
      steps {
        sh 'npm ci'
      }
    }

    stage('Test') {
      steps {
        sh 'npm run test:unit'
      }
    }

    stage('Update Logs'){
      steps {
        sh 'npm run start'
      }
    }
  }
}
