#!/bin/bash
. ./projects
cd server && npm run build
for APP in $PROJECTS
do
    cd ../$APP && npm run build
done