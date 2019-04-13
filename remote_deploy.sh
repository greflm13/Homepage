#!/bin/bash
echo enter IP:
read HOST
cd chat && scp -r dist/* net@$HOST:/home/net/server &&
cd ../discord && scp -r dist/* net@$HOST:/home/net/server &&
cd ../films && scp -r dist/* net@$HOST:/home/net/server &&
cd ../game2048 && scp -r dist/* net@$HOST:/home/net/server &&
cd ../minecraft-server && scp -r dist/* net@$HOST:/home/net/server &&
cd ../minesweeper && scp -r dist/* net@$HOST:/home/net/server &&
cd ../server && scp -r dist/* net@$HOST:/home/net/server &&
cd ../timeline && scp -r dist/* net@$HOST:/home/net/server &&
cd ../vinyl && scp -r dist/* net@$HOST:/home/net/server &&
ssh net@$HOST "cd server && ./restart.sh"
echo Done.
read
