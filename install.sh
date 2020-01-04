#!/bin/bash
. ./projects
echo ""
echo "installing server..."
cd server && npm i
for APP in $PROJECTS
do
    echo ""
    echo "installing $APP..."
    cd ../$APP && npm i
done