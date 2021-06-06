#!/bin/bash

# Import file
source "$(pwd)/bash/spinner.sh"

# Variables
REPO=codebase
GIT=https://github.com/fadilxcoder/keys.git
GIT_BRANCH=php-desktop

# Setting up app repository
start_spinner 'App installation...'
git clone -b $GIT_BRANCH $GIT $REPO &> /dev/null # Prevent display in console
cd $REPO
rm -rf .git/ .gitignore README.md
cd ..
mv index.php index.php.old
mv $REPO/{*,.*} ./ &> /dev/null
rm -rf $REPO
stop_spinner $?

# PHP packages installation
start_spinner 'Packages installation...'
composer install --quiet --ignore-platform-reqs
stop_spinner $?

start_spinner 'System check...'
sleep 5 # LOL
stop_spinner $?