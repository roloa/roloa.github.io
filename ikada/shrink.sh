#!/bin/bash -e

cd ./img/illustya_src/
mogrify -path ../illustya/ -resize 64x64 *.png

cd ../../
python make_illustya_filename_js.py > illustya_filename.js
