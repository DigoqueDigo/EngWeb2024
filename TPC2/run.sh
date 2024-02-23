#!/bin/bash

if [[ ! -f db.json ]]; then
    wget -O db.json https://epl.di.uminho.pt/~jcr/TRANSF/db.json
fi

json-server --port 3000 db.json &
node server.js