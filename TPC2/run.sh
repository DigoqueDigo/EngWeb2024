#!/bin/bash

if [[ ! -f dataset.json ]]; then
    wget -O dataset.json https://epl.di.uminho.pt/~jcr/TRANSF/db.json
fi