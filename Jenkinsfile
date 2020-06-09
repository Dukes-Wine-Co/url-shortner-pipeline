pipeline {
  agent any

  tools {
    nodejs "node"
  }

  node {
    configFileProvider(
        [configFile(fileId: '3def6afe-170a-4598-a91a-7b66face82aa', variable: 'GCLOUD_VALS')]) {
        sh '$GCLOUD_VALS > storage/service-account-creds.json'
    }
  }

  stages {
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
