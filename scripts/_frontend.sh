ssh -i ~/.ssh/id_rsa pi@192.168.178.47 /bin/bash << EOF
   cd smart-alarm-clock/frontend
   yarn && sudo -i cd /home/pi/smart-alarm-clock/frontend && screen -S frontend -dm yarn electron:prod
EOF