#!/bin/bash -e

python ./scripts/make_ItemInstanceMaker_js.py > ./src/in_out/ItemInstanceMaker.js
python ./scripts/make_BlockInstanceMaker_js.py > ./src/in_out/BlockInstanceMaker.js
