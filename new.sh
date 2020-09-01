#!/bin/bash
echo Enter name:
read name
. ./projects
PROJ="${PROJECTS} ${name}"
echo "PROJECTS=\"$PROJ\"" > ./projects
cp ./template ./server/src/$name.ts
sed -i s/template/$name/g ./server/src/$name.ts
ng new $name --skipInstall=true --prefix=$name --routing=true --skipGit=true --style=css
echo Installing dependencies...
cd $name
npm install
echo Done.
read