#!/bin/bash
echo enter IP:
read HOST
cd server && scp -r dist/* net@$HOST:/home/net/server
for APP in chat discord films game2048 minecraft-server minesweeper timeline vinyl
do
    echo ""
    echo "deploying $APP..."
    cd ../$APP && scp -r dist/* net@$HOST:/home/net/server
done
ssh net@$HOST "cd server && ./restart.sh"
echo ""
echo Done.
read
