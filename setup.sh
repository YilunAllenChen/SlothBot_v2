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
cp teensy_loader_cli ../bin_RPi/teensy_loader_cli
cd ..
rm -rf teensy_loader_cli/


# Install arduino-cli
curl -fsSL https://raw.githubusercontent.com/arduino/arduino-cli/master/install.sh | sh




# Setup main lifecycle script
chmod 755 slothbot_system.sh 
cp slothbot_system.sh /etc/init.d/slothbot_system.sh
cd /etc/init.d/
sudo update-rc.d slothbot_system.sh defaults

