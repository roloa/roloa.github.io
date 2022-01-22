#!/bin/bash -e

npx webpack

npx babel dist --out-dir dist_babel
