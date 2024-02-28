# American Movies - Website

Este trabalho consiste em criar um *website* para um arquivo de filmes americanos, sendo que as informações necessárias estão contidas num ficheiro `.json`, que pode ser consultado recorrendo à *REST API* do `json-server`.

## Objetivos

- Apresentar uma listagem dos filmes, atores e géneros.
- Analisar detalhadamente os elementos mencionados.
- Proporcionar uma navegação intuitiva.

## Páginas
```
Página inicial: '/'
Página dos filmes: '/filmes'
Página dos atores: '/atores'
Página dos géneros: '/generos'
Página de um filme: '/filmes/<filme_id>'
Página de um ator: '/atores/<ator_nome>'
Página de um género: '/generos/<genero>'
```

## Run

```bash
chmod +x run.sh
./run.sh
```