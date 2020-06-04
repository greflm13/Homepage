#!/bin/bash
echo enter IP:
read HOST
. ./projects
echo ""
echo "deploying server..."
cd server && scp -r dist/* pi@$HOST:/home/pi/server
echo ""
echo "deploying filehost..."
cd ../filehost && scp -r ../filehost/ pi@$HOST:/home/pi/server
for APP in $PROJECTS
do
    echo ""
    echo "deploying $APP..."
    cd ../$APP && scp -r dist/* pi@$HOST:/home/pi/server
done
ssh pi@$HOST "cd server && ./restart.sh"
echo ""
echo Done.