ssh -i ~/.ssh/id_rsa pi@192.168.178.47 /bin/bash << EOF
    cd smart-alarm-clock/backend
    yarn && yarn build && screen -S backend -dm yarn start
EOF