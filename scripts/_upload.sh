set -e
cd ../
printf 'Cleaning Working Directory\n'
ssh -i ~/.ssh/id_rsa pi@192.168.178.47 /bin/bash << EOF
   rm -rf smart-alarm-clock/frontend
   rm -rf smart-alarm-clock/backend
EOF
printf 'Uploading Workspace\n'
rsync --exclude={'node_modules/','dist'} --info=progress2 -e "ssh -i ~/.ssh/id_rsa" -r workspace/ pi@192.168.178.47:/home/pi/smart-alarm-clock
printf 'Uploading Start Script\n'
rsync --info=progress2 -e "ssh -i ~/.ssh/id_rsa" -r scripts/smart-alarm-clock pi@192.168.178.47:/home/pi/smart-alarm-clock
ssh -i ~/.ssh/id_rsa pi@192.168.178.47 /bin/bash << EOF
   chmod +x smart-alarm-clock/smart-alarm-clock
EOF
echo 'Done! Enter to exit'
read junk