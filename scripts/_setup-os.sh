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
nvm install 16.15.1
npm install -g yarn
yarn global add @types/node typescript ts-node

echo "Install Node as Root"
sudo -u root -i bash << EOF
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
EOF
sudo -i nvm install 16.15.1
sudo -i npm install -g yarn
sudo -i yarn global add @types/node typescript ts-node


echo "Configure Bash"
sed -i '6,9 s/^/#/' .bashrc

echo "Setup and Configure X11"
sudo apt-get install -y xorg unclutter libnss3 libatk1.0-0 libatk-bridge2.0-0 libcups2 libgtk-3-0 dbus-x11
sudo raspi-config nonint do_boot_behaviour B2
echo "# Start X11 on login
if [[ ! \$DISPLAY && \$XDG_VTNR -eq 1 ]]; then
  exec startx -- -nocursor
fi
export DISPLAY=:0.0" >> .profile
echo "export DISPLAY=:0.0
export XDG_RUNTIME_DIR=/run/user/$(id -u)
mkdir -p $XDG_RUNTIME_DIR
chmod 0700 $XDG_RUNTIME_DIR
sudo chown $(id -un):$(id -gn) $XDG_RUNTIME_DIR
export DBUS_SESSION_BUS_ADDRESS=unix:path=$XDG_RUNTIME_DIR/bus
" | sudo tee -a /root/.profile
sudo sed -i 's/allowed_users=console/allowed_users=anybody/g' /etc/X11/Xwrapper.config
echo "# Disable screen blanking and power saving
xset s off
xset s 0 0
xset -dpms
xhost +
# start smart-alarm-clock
/home/pi/smart-alarm-clock/smart-alarm-clock &" >> .xsessionrc

echo "Setup Fonts"
sudo -u root -i bash << EOF
wget https://noto-website-2.storage.googleapis.com/pkgs/NotoColorEmoji-unhinted.zip
unzip NotoColorEmoji-unhinted.zip
mkdir ~/.fonts
mv NotoColorEmoji.ttf ~/.fonts
echo '<?xml version="1.0"?>
<!DOCTYPE fontconfig SYSTEM "fonts.dtd">
<fontconfig>
   <alias>
     <family>sans-serif</family>
     <prefer>
       <family>Noto Color Emoji</family>
       <family>Noto Emoji</family>
     </prefer>
   </alias>

   <alias>
     <family>serif</family>
     <prefer>
       <family>Noto Color Emoji</family>
       <family>Noto Emoji</family>
     </prefer>
   </alias>
</fontconfig>' > ~/.fonts.conf
sudo fc-cache -fv
rm LICENSE_OFL.txt NotoColorEmoji-unhinted.zip README
EOF

echo "Done. Please upload now..."