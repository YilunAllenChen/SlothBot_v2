# Run this script on ths SlothBot machines to install necessary software.


# setup git repo watcher CICD Pipeline
sudo git config --global credential.helper store
sudo git pull

# configure git hooks
git config --local core.hooksPath CICD/git_hooks/

# Install teensy loader cli
sudo apt-get install -y libusb-dev
git clone https://github.com/PaulStoffregen/teensy_loader_cli
cd teensy_loader_cli
make
cp teensy_loader_cli ../bin/teensy_loader_cli
cd ..
rm -rf teensy_loader_cli/


# Install arduino-cli
curl -fsSL https://raw.githubusercontent.com/arduino/arduino-cli/master/install.sh | sh

mv bin/arduino-cli ./SlothBot_Firmware/RPi/

rm -rf bin


# Setup main lifecycle script
sudo cp SlothBot_Firmware/config/rc.local /etc/rc.local
