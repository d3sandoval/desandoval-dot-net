#!/bin/bash
# determines whether or not to run build

SKIP_BUILD=true
CHANGES=$(git diff --name-only FETCH_HEAD^ FETCH_HEAD)

echo "checking if only markdown changed..."
for change in $CHANGES
do
    if [[ $change == *.md ]]
    then
        echo $change
    else
        echo "$change is not markdown and has changed"
        echo "rebuilding app..."
        SKIP_BUILD=false
        break
    fi
done

if $SKIP_BUILD
then
    echo "only markdown files have changed"
    echo "skipping build"
else
   npm run build
fi
