#!/bin/bash
NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
. ./projects
echo ""
echo "updating server..."
cd server && nvm use "$(cat .nvmrc)" && npm update
for APP in $PROJECTS; do
	echo ""
	echo "updating $APP..."
	cd ../"$APP" || continue
	nvm use "$(cat .nvmrc)"
	ng update @angular/cli
done
