echo "Setup Password"
passwd

echo "Changing Mirror"
echo "deb http://ftp.halifax.rwth-aachen.de/raspbian/raspbian/ bullseye main contrib non-free rpi" | sudo tee /etc/apt/sources.list

echo "Update System"
sudo apt-get update
sudo apt-get -y upgrade

echo "Change Hostname & Timezone"
sudo raspi-config nonint do_hostname Bernd-Raspi
sudo raspi-config nonint do_change_locale de_utf8
sudo raspi-config nonint do_configure_keyboard de
sudo raspi-config nonint do_change_timezone Europe/Berlin

echo "Install Node"
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
nvm install 16.13.1
npm install -g yarn
yarn global add @types/node typescript ts-node

echo "Install Node as Root"
sudo -u root -i bash << EOF
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
EOF
sudo -i nvm install 16.13.1
sudo -i npm install -g yarn
sudo -i yarn global add @types/node typescript ts-node


echo "Configure Bash"
sed -i '6,9 s/^/#/' .bashrc

echo "Setup and Configure X11"
sudo apt-get install -y xorg unclutter screen libnss3 libatk1.0-0 libatk-bridge2.0-0 libcups2 libgtk-3-0
sudo raspi-config nonint do_boot_behaviour B2
echo "# Start X11 on login
if [[ ! \$DISPLAY && \$XDG_VTNR -eq 1 ]]; then
  exec startx
fi
export DISPLAY=:0.0" >> .profile
echo "export DISPLAY=:0.0" | sudo tee -a /root/.profile
sudo sed -i 's/allowed_users=console/allowed_users=anybody/g' /etc/X11/Xwrapper.config
echo "# Disable screen blanking and power saving
xset s off
xset s 0 0
xset -dpms
xhost +
# start smart-alarm-clock
/home/pi/smart-alarm-clock/smart-alarm-clock &" >> .xsessionrc

echo "Done. Rebooting..."
sudo reboot