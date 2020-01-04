#!/bin/bash
sudo npm i -g pnpm
. ./projects
echo ""
echo "installing server..."
cd server && pnpm i
for APP in $PROJECTS
do
    echo ""
    echo "installing $APP..."
    cd ../$APP && pnpm i
done