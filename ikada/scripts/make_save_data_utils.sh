#!/bin/bash -e

python ./scripts/make_ItemInstanceMaker_js.py > ./js/ItemInstanceMaker.js
python ./scripts/make_BlockInstanceMaker_js.py > ./js/BlockInstanceMaker.js
