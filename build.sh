#!/bin/bash
cd server && npm run build
for APP in chat discord films game2048 minecraft-server minesweeper timeline vinyl
do
    cd ../$APP && npm run build
done