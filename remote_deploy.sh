#!/bin/bash
echo enter Hostname:
read HOST
cd chat && scp -r dist/* $HOST:/home/pi/server &&
cd ../discord && scp -r dist/* $HOST:/home/pi/server &&
cd ../films && scp -r dist/* $HOST:/home/pi/server &&
cd ../game2048 && scp -r dist/* $HOST:/home/pi/server &&
cd ../minecraft-server && scp -r dist/* $HOST:/home/pi/server &&
cd ../minesweeper && scp -r dist/* $HOST:/home/pi/server &&
cd ../server && scp -r dist/* $HOST:/home/pi/server &&
cd ../timeline && scp -r dist/* $HOST:/home/pi/server
echo Done.
read
