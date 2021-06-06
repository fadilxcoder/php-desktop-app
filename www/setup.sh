#!/bin/bash

# Variables
REPO=codebase
GIT=https://github.com/fadilxcoder/live-css-editor.git

# Prevent display in console
git clone $GIT $REPO &> /dev/null

cd $REPO
rm -rf .git/ _config.yml chrome-capture-opt.gif README.md
cd ..
mv index.php index.php.old
mv $REPO/{*,.*} ./ &> /dev/null
rm -rf $REPO
echo 'App installed successfully...'
sleep 2