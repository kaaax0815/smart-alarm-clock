# Scripts

## Scripts to help Deploy and Run the project

Requirements:

- WSL 2
- SSH Key in WSL
- RPi with IP: 192.168.178.47 and User "pi"

### Install OS

Easiest way is to use the Raspberry Pi Imager

- Select Raspberry Pi OS Lite (64-bit)
- On the lower right hand corner click on the gear icon
- Setup SSH, Password, Wifi

### Setup SD Card

- Copy `setup-sd.bat` to the boot drive
- Run it

### Setup OS

- Plug the SD Card into the RPi
- Boot up
- Run `setup-os.bat`
- Run `upload.bat`
- Manually restart

First boot will take a while
