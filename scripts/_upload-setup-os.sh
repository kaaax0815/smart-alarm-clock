set -e
echo 'Uploading Setup Script'
scp -i ~/.ssh/id_rsa _setup-os.sh pi@192.168.178.47:/home/pi
ssh -i ~/.ssh/id_rsa pi@192.168.178.47 /bin/bash << EOF
  chmod +x ./_setup-os.sh
EOF
echo 'Please connect to SSH manually and run the _setup-os script'