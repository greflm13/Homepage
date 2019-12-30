#!/bin/bash
echo enter IP:
read HOST
. ./projects
echo ""
echo "deploying server..."
cd server && scp -r dist/* net@$HOST:/home/net/server
for APP in $PROJECTS
do
    echo ""
    echo "deploying $APP..."
    cd ../$APP && scp -r dist/* net@$HOST:/home/net/server
done
ssh net@$HOST "cd server && ./restart.sh"
echo ""
echo Done.