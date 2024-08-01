#!/bin/bash
echo enter IP:
read HOST
. ./projects
echo ""
echo "deploying server..."
cd server && rsync -avuP dist/* pi@$HOST:/home/pi/server
echo ""
echo "deploying filehost..."
cd ../filehost && rsync -avuP ../filehost/ pi@$HOST:/home/pi/server
for APP in $PROJECTS
do
    echo ""
    echo "deploying $APP..."
    cd ../$APP && rsync -avuP dist/* pi@$HOST:/home/pi/server
done
ssh pi@$HOST "cd server && ./restart.sh"
echo ""
echo Done.