set -e
cd ../
printf 'Cleaning Working Directory\n'
ssh -i ~/.ssh/id_rsa pi@192.168.178.47 /bin/bash << EOF
   rm -rf smart-alarm-clock/frontend
   rm -rf smart-alarm-clock/backend
EOF
printf 'Uploading Frontend\n'
rsync --exclude={'node_modules/','dist'} --info=progress2 -e "ssh -i ~/.ssh/id_rsa" -r frontend pi@192.168.178.47:/home/pi/smart-alarm-clock
printf 'Uploading Backend\n'
rsync --exclude={'node_modules/','dist'} --info=progress2 -e "ssh -i ~/.ssh/id_rsa" -r backend pi@192.168.178.47:/home/pi/smart-alarm-clock
echo 'Done! Enter to exit'
read junk