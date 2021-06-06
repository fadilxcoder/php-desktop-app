#!/bin/bash

# Import file
source "$(pwd)/bash/spinner.sh"

# Variables
REPO=codebase
GIT=https://github.com/fadilxcoder/live-css-editor.git


start_spinner 'App installation...'

git clone $GIT $REPO &> /dev/null # Prevent display in console
cd $REPO
rm -rf .git/ _config.yml chrome-capture-opt.gif README.md
cd ..
mv index.php index.php.old
mv $REPO/{*,.*} ./ &> /dev/null
rm -rf $REPO

stop_spinner $?

sleep 5