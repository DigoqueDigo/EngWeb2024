# Classical Composers - Website

Este trabalho consiste em criar um *website* para um arquivo de compositores, sendo que as informações necessárias estão contidas num ficheiro `.json`, que pode ser consultado recorrendo à *REST API* do `json-server`.

## Objetivos

- Apresentar uma listagem dos compositores e períodos.
- Analisar detalhadamente os elementos mencionados.
- Proporcionar uma navegação intuitiva.

## Operações

- Adicionar/Remover compositores.
- Editar as informações dos compositores.

## Páginas
```
Página inicial: '/'
Página dos períodos: '/periodos'
Página dos compositores: '/compositores'
Página de um período: '/periodos/<periodo>'
Página de um compositor: '/compositores/<compositor>'
```

## Run

```bash
chmod +x run.sh
./run.sh
```