#!/bin/bash
NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
. ./projects
echo ""
echo "installing server..."
cd server && nvm use "$(cat .nvmrc)" && npm install && cd ..
for APP in $PROJECTS
do
    echo ""
    echo "installing $APP..."
    cd $APP
    jq '.devDependencies.["@types/node"]' < package.json | grep -Eo "\".{0,2}[[:digit:]]+" | grep -Eo "[[:digit:]]+" > .nvmrc
    nvm install "$(cat .nvmrc)"
    npm install
    cd ..
done