#!/bin/bash
. ./projects
echo ""
echo "installing server..."
cd server && npm update
for APP in $PROJECTS
do
    echo ""
    echo "installing $APP..."
    cd ../$APP && ng update @angular/cli
done