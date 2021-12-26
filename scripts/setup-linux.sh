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
sudo -i -u root bash << EOF
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
nvm install 16.13.1
npm install -g yarn
yarn global add @types/node typescript ts-node
EOF

echo "Configure Bash"
sed -i '6,9 s/^/#/' .bashrc

echo "X11"
sudo apt-get install -y xorg unclutter screen
sudo raspi-config nonint do_boot_behaviour B2
echo "export DISPLAY=:0.0" >> .bashrc
echo "# Start X11 on login
if [[ ! \$DISPLAY && \$XDG_VTNR -eq 1 ]]; then
  exec startx
fi
export DISPLAY=:0.0" >> .profile
sudo sed -i 's/allowed_users=console/allowed_users=anybody/g' /etc/X11/Xwrapper.config

echo "Done. Rebooting..."
sudo reboot