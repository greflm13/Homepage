#!/bin/bash
NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
. ./projects
echo ""
echo "building server..."
cd server && nvm use "$(cat .nvmrc)" && npm run build
for APP in $PROJECTS
do
    echo ""
    echo "building $APP..."
    cd ../$APP && nvm use "$(cat .nvmrc)" && npm run build
done