#!/bin/bash

if [[ ! -d public ]]; then
    gdown --folder -O public https://drive.google.com/drive/folders/1mVVEpI-SkLWjuP3TDonX_GNZWHbCwq2L?usp=sharing
fi

if [[ ! -d db ]]; then
    gdown --folder -O db https://drive.google.com/drive/folders/19ZDaAp4Cnk-X3aRoZBStYb3Ltm6KgpOg?usp=sharing
fi

json-server --port 3000 db/compositores.json &
cd src/
node server.js