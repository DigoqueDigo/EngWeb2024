# Music School - Website

Este trabalho consiste em criar um *website* para uma escola de música, sendo que as informações necessárias estão contidas num ficheiro `.json`, que pode ser consultado recorrendo à *REST API* do `json-server`.

## Objetivos

- Apresentar uma listagem dos cursos, alunos e instrumentos existentes na escola.
- Analisar detalhadamente/individualmente os cursos e alunos.
- Proporcionar uma navegação intuitiva.

## Páginas
```
Página inicial: '/'
Página dos cursos: '/cursos'
Página dos alunos: '/alunos'
Página de um curso: '/cursos/<curso_ID>'
Página de um aluno: '/alunos/<aluno_ID>'
Página dos instrumentos: '/instrumentos'
```

## Run

```bash
chmod +x run.sh
./run.sh
```