#!/bin/bash
echo Enter name:
read name
ng new $name --skipInstall=true --prefix=$name --routing=true --skipGit=true --style=css
echo Installing dependencies...
sudo npm i -g pnpm
cd $name
pnpm install
echo Done.
read