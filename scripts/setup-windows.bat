echo Setup Display
(
echo # Display Settings
echo max_usb_current=1
echo hdmi_group=2
echo hdmi_mode=87
echo hdmi_cvt 800 480 60 6 0 0 0
echo hdmi_drive=1
)>>"config.txt"

echo Setup SSH
type nul > ssh

echo Setup WiFi
(
echo country=DE
echo ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
echo update_config=1
echo network={
echo       ssid="wlan-bezeichnung"
echo       psk="passwort"
echo       key_mgmt=WPA-PSK
echo }
)>>"wpa_supplicant.conf"