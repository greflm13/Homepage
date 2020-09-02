#!/bin/bash
. ../projects
echo ""
echo "linking node_modules..."
ln -s ../node_modules dist/node_modules
for APP in $PROJECTS
do
    echo ""
    echo "linking $APP..."
    ln -s ../../$APP/dist/$APP dist/$APP
done
echo ""
echo "creating log folder"
mkdir -p dist/log
echo ""
echo Done.