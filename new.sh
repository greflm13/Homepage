#!/bin/bash
NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
if [[ $1 != "" ]]; then
	name="$1"
else
	echo Enter name:
	read -r name
fi
. ./projects
PROJ="${PROJECTS} ${name}"
echo "PROJECTS=\"$PROJ\"" >./projects
cp ./template "./server/src/$name.ts"
sed -i "s/template/$name/g" "./server/src/$name.ts"
ng new "$name" --skip-install --prefix="$name" --routing --skip-git --style=css --ssr --ai-config=none --package-manager=npm
cat <<<"$(jq '. | select (.scripts) .scripts.start = "npm run build"' ./$name/package.json)" >./$name/package.json
cat <<<"$(jq '. | select (.scripts) .scripts.restart = "scp -r dist/* $HOST:/home/pi/server"' ./$name/package.json)" >./$name/package.json
cat <<<"$(jq '. | select (.scripts) .scripts.prerestart = "npm run build"' ./$name/package.json)" >./$name/package.json
cat <<<"$(jq '. | select (.scripts) .scripts.build = "ng build --prod --build-optimizer --base-href=/'"$name"'/"' ./$name/package.json)" >./$name/package.json
cat <<<"$(jq '. | select (.scripts) .scripts.test = "ng build --watch --base-href=/'"$name"'/"' ./$name/package.json)" >./$name/package.json
cat <<<"$(jq '.folders[.folders| length] |= . + {"path": "'"$name"'", "name": "'"$name"'" }' ./homepage.code-workspace)" >./homepage.code-workspace
echo Installing dependencies...
cd "$name" || exit 1
jq '.devDependencies.["@types/node"]' <package.json | grep -Eo "\".{0,2}[[:digit:]]+" | grep -Eo "[[:digit:]]+" >.nvmrc
nvm install "$(cat .nvmrc)"
pnpm install
echo Done.
read -r
