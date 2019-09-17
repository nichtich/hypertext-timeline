#!/bin/bash

SIZE=1280,800
DELAY=2000
CHROME=google-chrome

if hash chromium-browser 2>/dev/null; then
    CHROME=chromium-browser
fi

for NAME in "$@"; do
    $CHROME --headless --run-all-compositor-stages-before-draw \
    --virtual-time-budget=$DELAY --window-size=$SIZE \
    --screenshot=$NAME.png "http://jakobvoss.de/hypertext-timeline/#$NAME"
done

