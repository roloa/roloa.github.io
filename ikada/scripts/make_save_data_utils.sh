#!/bin/bash -e

python ./scripts/make_ItemInstanceMaker_js.py > ./src/ItemInstanceMaker.js
python ./scripts/make_BlockInstanceMaker_js.py > ./src/BlockInstanceMaker.js
