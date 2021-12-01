set -e
cd ../
printf 'Uploading Frontend\n'
rsync --info=progress2 -e "ssh -i ~/.ssh/id_rsa" -r frontend pi@192.168.178.47:/home/pi/smart-alarm-clock
printf 'Uploading Backend\n'
rsync --info=progress2 -e "ssh -i ~/.ssh/id_rsa" -r backend pi@192.168.178.47:/home/pi/smart-alarm-clock
echo 'Done! Enter to exit'
read junk