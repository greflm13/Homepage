#!/bin/bash
. ./projects
echo ""
echo "updating server..."
cd server && npm update
for APP in $PROJECTS
do
    echo ""
    echo "updating $APP..."
    cd ../$APP && ng update @angular/cli
done