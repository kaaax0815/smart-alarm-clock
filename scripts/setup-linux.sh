echo "Setup Password"
passwd

echo "Changing Mirror"
echo "deb http://ftp.halifax.rwth-aachen.de/raspbian/raspbian/ bullseye main contrib non-free rpi" | sudo tee /etc/apt/sources.list

echo "Update System"
sudo apt-get update
sudo apt-get upgrade

echo "Change Hostname & Timezone"
sudo raspi-config nonint do_hostname Bernd-Raspi
sudo raspi-config nonint do_change_locale de_utf8
sudo raspi-config nonint do_configure_keyboard de
sudo raspi-config nonint do_change_timezone Europe/Berlin

echo "Done. Rebooting..."
sudo reboot