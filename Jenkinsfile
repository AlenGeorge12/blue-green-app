pipeline {
    agent any
    environment {
        DOCKER_HUB_CREDS = credentials('dockerhub-creds')
        IMAGE_NAME       = "${env.DOCKER_HUB_CREDS_USR}/myapp"
        NEW_COLOR        = "green" // The new version we are deploying
        OLD_COLOR        = "blue"  // The current live version
    }
    stages {
        stage('Clone Repo') {
            steps {
                // This step is handled by the Jenkins job configuration
                script {
                    echo "Cloning repository..."
                }
            }
        }
        stage('Build Docker Image') {
            steps {
                sh "docker build -t ${IMAGE_NAME}:${BUILD_NUMBER} ."
            }
        }
        stage('Push Image to Docker Hub') {
            steps {
                sh 'echo $DOCKER_HUB_CREDS_PSW | docker login -u $DOCKER_HUB_CREDS_USR --password-stdin'
                sh "docker push ${IMAGE_NAME}:${BUILD_NUMBER}"
            }
        }
        stage('Deploy to Kubernetes (Green)') {
            steps {
                sh "kubectl set image deployment/myapp-${NEW_COLOR} myapp=${IMAGE_NAME}:${BUILD_NUMBER} --record"
                sh "kubectl rollout status deployment/myapp-${NEW_COLOR}"
            }
        }
        stage('Approval: Switch Traffic?') {
            steps {
                input "Switch live traffic to the ${NEW_COLOR} version?"
            }
        }
        stage('Switch Service to Green') {
            steps {
                sh 'kubectl patch service myapp-service -p "{\\"spec\\":{\\"selector\\":{\\"color\\": \\"${NEW_COLOR}\\"}}}"'
                echo "Service is now pointing to ${NEW_COLOR} deployment."
            }
        }
    }
}
