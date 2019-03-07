@echo off
set /p HOST="Enter IP: "
cd chat && scp -r dist/* pi@%HOST%:/home/pi/server &
cd ../discord && scp -r dist/* pi@%HOST%:/home/pi/server &
cd ../films && scp -r dist/* pi@%HOST%:/home/pi/server &
cd ../game2048 && scp -r dist/* pi@%HOST%:/home/pi/server &
cd ../minecraft-server && scp -r dist/* pi@%HOST%:/home/pi/server &
cd ../minesweeper && scp -r dist/* pi@%HOST%:/home/pi/server &
cd ../server && scp -r dist/* pi@%HOST%:/home/pi/server &
cd ../timeline && scp -r dist/* pi@%HOST%:/home/pi/server &
cd ../vinyl && scp -r dist/* pi@%HOST%:/home/pi/server &
cd ..
set /p temp=Done.