#!/bin/bash

if [[ ! -f html/index.html ]] && [[ ! -d html/pages/ ]]; then
    wget https://epl.di.uminho.pt/~jcr/AULAS/EngWeb2024/semana1/MapaRuas-materialBase.zip
    unzip MapaRuas-materialBase
    mv MapaRuas-materialBase/texto/ .
    mv MapaRuas-materialBase/imagem/ html/
    rm -r __MACOSX/ MapaRuas-materialBase/ MapaRuas-materialBase.zip
    python3 scriptIndex.py
    python3 scriptPage.py
fi

firefox html/index.html