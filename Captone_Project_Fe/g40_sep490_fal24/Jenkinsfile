pipeline {
    agent { label 'agent_server' }

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials')
        DOCKER_IMAGE = 'co0bridae/iap491_g4'
        ZAP_SERVER = credentials('zap-server-url')
        SONAR_SERVER = credentials('sonarqube-server-url')
        STAGING_SERVER = credentials('staging-server-url')
        SNYK_API = credentials('snyk-api-token')
        GITLAB_TOKEN = credentials('g40_sep490_token')
    }

    stages {
        stage('Info') {
            steps {
                sh(script: """ whoami;pwd;ls """, label: "first stage")
            }
        }

        stage('Checkout') {
            steps {
                checkout scm
            }
        }


        stage('SonarQube Scan') {
            steps {
                script {
                    dir('Front-end/WorkforceManagement') {
                        withSonarQubeEnv('Sonarqube server connection') {
                            sh 'npm install'
                            sh "npx @sonar/scan -Dsonar.projectKey=WorkforceManagement -Dsonar.host.url=$SONAR_SERVER -Dsonar.token=$GITLAB_TOKEN"
                        }
                        sleep 20
                        
                        def timestamp = new Date().format("yyyyMMdd_HHmmss")
                        env.TIMESTAMP = timestamp

                    sh "curl -u $GITLAB_TOKEN: \"$SONAR_SERVER/api/issues/search?componentKeys=WorkforceManagement&impactSeverities=BLOCKER,HIGH,MEDIUM&statuses=OPEN,CONFIRMED\" -o issues_${timestamp}.json"

                    sh "python3 convert_issue_json.py issues_${timestamp}.json sonarqube-report-${timestamp}.html"

                    archiveArtifacts artifacts: "sonarqube-report-${timestamp}.html", fingerprint: true

                    }
                }
            }
        }

        stage('Snyk Scan') {
            steps {
                script {
                    dir('Front-end/WorkforceManagement') {
                    sh 'npm install' 
                    sh 'snyk config set api=$SNYK_API'
                    def timestamp = new Date().format("yyyyMMdd_HHmmss")
                    sh """
                        snyk test --severity-threshold=high --json-file-output=snyk.json /var/lib/jenkins/workspace/Lab_iap491/g40_sep490_fal24_Project/Front-end/WorkforceManagement/ || true
                        snyk-to-html -i snyk.json -o snyk-report-${timestamp}.html || true
                    """
                archiveArtifacts artifacts: "snyk-report-${timestamp}.html", fingerprint: true
                    }
                }
            }
        }


        stage('Build Docker Image') {
            steps {
                dir('Front-end/WorkforceManagement') {
                    script {
                        sh '''
                        docker build -t $DOCKER_IMAGE:latest .
                        '''
                    }
                }
            }
        }


        stage('Trivy Scan') {
            steps {
                dir('Front-end/WorkforceManagement') {
                    script {
                        def timestamp = new Date().format("yyyyMMdd_HHmmss")
                        env.TIMESTAMP = timestamp

                        sh "trivy image --timeout 10m --format json --output trivy-report-${timestamp}.json --exit-code 0 --severity HIGH,CRITICAL $DOCKER_IMAGE:latest"

                        sh "python3 convert_json.py trivy-report-${timestamp}.json trivy-report-${timestamp}.html"

                        archiveArtifacts artifacts: "trivy-report-${timestamp}.html", fingerprint: true
                    }
                }
            }
        }





        stage('Push to Docker Hub') {
            steps {
                dir('Front-end/WorkforceManagement') {
                    script {
                        sh '''
                        echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin
                        docker push $DOCKER_IMAGE:latest
                        '''
                    }
                }
            }
        }

        stage('Deploy to Staging') {
            steps {
                script {
                    // Nội dung bash script cho triển khai
                    def deploying = """
                        #! /bin/bash
                        echo "Stopping existing container..."
                        docker ps -q --filter "name=workforce-management" && docker stop workforce-management || true
                        docker ps -a -q --filter "name=workforce-management" && docker rm workforce-management || true

                        echo "Pulling the latest Docker image..."
                        docker pull $DOCKER_IMAGE:latest

                        echo "Starting a new container..."
                        docker run -d --name workforce-management -p 8888:80 $DOCKER_IMAGE:latest
                    """
                    
                    // Sử dụng SSH để truy cập server Staging
                    sshagent(['jenkins-ssh-key']) {
                        sh """
                        ssh -o StrictHostKeyChecking=no root@192.168.230.101 'echo "$deploying" > /root/deploy.sh && chmod +x /root/deploy.sh && /root/deploy.sh'
                        """
                    }
                }
            }
        }

         stage('ZAP Scan') {
            steps {
                script {
                    def timestamp = new Date().format("yyyyMMdd_HHmmss")

                    sh """
                        cd /opt/zaproxy
                        ./zap.sh -daemon -port 8090 -host 0.0.0.0 \\
                        -config api.disablekey=true \\
                        -config api.addrs.addr.name=127.0.0.1 \\
                        -config api.addrs.addr.regex=true &
                        sleep 30

                        curl -s "http://127.0.0.1:8090/JSON/spider/action/scan/?url=http://192.168.230.101:8888"
                        sleep 30

                        curl -s "http://127.0.0.1:8090/JSON/ascan/action/scan/?url=http://192.168.230.101:8888"
                        sleep 60

                        curl -s "http://127.0.0.1:8090/OTHER/core/other/htmlreport/" -o "${WORKSPACE}/zap_report-${timestamp}.html"

                        curl -s "http://127.0.0.1:8090/JSON/core/action/shutdown/"
                    """

                    archiveArtifacts artifacts: "zap_report-${timestamp}.html", fingerprint: true
                }
            }
        }


    }

}
