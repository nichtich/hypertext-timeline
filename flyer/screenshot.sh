#!/bin/bash

SIZE=1280,800
DELAY=2000

for NAME in "$@"; do
  google-chrome --headless --run-all-compositor-stages-before-draw \
    --virtual-time-budget=$DELAY --window-size=$SIZE \
    --screenshot=$NAME.png "http://jakobvoss.de/hypertext-timeline/#$NAME"
done

