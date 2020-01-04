#!/bin/bash
. ./projects
echo ""
echo "building server..."
cd server && npm run build
for APP in $PROJECTS
do
    echo ""
    echo "building $APP..."
    cd ../$APP && npm run build
done