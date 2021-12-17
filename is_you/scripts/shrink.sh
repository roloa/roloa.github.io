#!/bin/bash -e

cd ./img/illustya_src/64/
mogrify -path ../../illustya/ -resize 64x64 *.png
cd ../256/
mogrify -path ../../illustya/ -resize 256x256 *.png

cd ../../../
python scripts/make_illustya_filename_js.py > ./js/illustya_filename.js
