pipeline {
  agent any

  tools {
    nodejs "node"
  }

  stages {
    stage('Copy creds') {
      steps {
        configFileProvider([configFile(fileId: '3def6afe-170a-4598-a91a-7b66face82aa', replaceTokens: true, targetLocation: 'storage/service-account-creds.json', variable: 'GCLOUD_VAL')]){
              sh 'echo "written successfully"'
          }
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

    stage('Update Logs'){
      steps {
        sh 'npm run start'
      }
    }
  }
}
