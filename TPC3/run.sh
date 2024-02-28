#!/bin/bash

if [[ ! -f filmes.json ]]; then
    gdown --fuzzy -O filmes.json https://drive.google.com/file/d/1ASFG_hxO_SXeolFhKovG7uiPr3osHOAx/view?usp=sharing
fi

if [[ ! -f db.json ]]; then
    cat filmes.json | python3 script.py > db.json
fi

json-server --port 3000 db.json &
node server.js