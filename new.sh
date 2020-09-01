#!/bin/bash
echo Enter name:
read name
. ./projects
PROJ="${PROJECTS} ${name}"
echo "PROJECTS=\"$PROJ\"" > ./projects
cp ./template ./server/src/$name.ts
sed -i s/template/$name/g ./server/src/$name.ts
ng new $name --skipInstall=true --prefix=$name --routing=true --skipGit=true --style=css
cat <<< $(jq '. | select (.scripts) .scripts.start = "npm run build"' ./$name/package.json) > ./$name/package.json
cat <<< $(jq '. | select (.scripts) .scripts.restart = "scp -r dist/* $HOST:/home/pi/server"' ./$name/package.json) > ./$name/package.json
cat <<< $(jq '. | select (.scripts) .scripts.prerestart = "npm run build"' ./$name/package.json) > ./$name/package.json
cat <<< $(jq '. | select (.scripts) .scripts.build = "ng build --prod --build-optimizer --base-href=/'$name'/"' ./$name/package.json) > ./$name/package.json
cat <<< $(jq '. | select (.scripts) .scripts.test = "ng build --watch --base-href=/'$name'/"' ./$name/package.json) > ./$name/package.json
echo Installing dependencies...
cd $name
npm install
echo Done.
read