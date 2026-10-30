# Pesquisa de Matérias (FCTE/FGA)

Site estático para **pesquisar, filtrar e ordenar as disciplinas** dos cursos de
engenharia da Faculdade de Ciências e Tecnologias em Engenharia (FCTE/FGA), o
campus Gama da Universidade de Brasília (UnB).

🔗 **Acesse:** https://caio-venancio.github.io/pesquisa-de-materias-fcte/

Os dados são extraídos da estrutura curricular mais recente de cada curso,
disponível publicamente no SIGAA.

---

## Funcionalidades

- **Busca por texto** — procure uma matéria pelo nome ou código.
- **Filtro por seletividade** — Todas, Optativas ou Obrigatórias.
- **Filtro por curso** — Aeroespacial, Automotiva, Eletrônica, Energia e Software
  (combináveis entre si).
- **Ordenação** — alfabética, por código, por nível (fluxograma) ou aleatória.
- **Matérias compartilhadas** — uma disciplina que aparece em mais de um curso é
  mostrada em um único card, indicando em quais cursos ela é obrigatória ou optativa.
- **Pré e co-requisitos** e carga horária/créditos em cada card.

## Cursos e dados

| Curso | Arquivo | Matérias |
|-------|---------|----------|
| Engenharia Aeroespacial | `data/estrutura_aeroespacial.json` | 144 |
| Engenharia Automotiva | `data/estrutura_automotiva.json` | 96 |
| Engenharia Eletrônica | `data/estrutura_eletronica.json` | 105 |
| Engenharia de Energia | `data/estrutura_energia.json` | 134 |
| Engenharia de Software | `data/estrutura_software.json` | 112 |

Cada matéria segue o esquema:

```json
{
  "Código": "CIC0191",
  "Nome": "INTRODUÇÃO AO DESENVOLVIMENTO DE JOGOS",
  "Horas": "60h",
  "Obrigatoriedade": "Optativa",
  "Curso": "Engenharia de Software",
  "Nível": "N/A",
  "Pré-Requisitos": "( ( CIC0197 ) OU ( CIC0090 E CIC0008 ) )",
  "Co-Requisitos": "-"
}
```

> ℹ️ Ano/semestre do edital das estruturas curriculares: **a definir** (será exibido no site).

## Como rodar localmente

O site usa `fetch` para carregar os JSONs, então **não funciona abrindo o
`index.html` direto pelo `file://`** (bloqueio de CORS). É preciso servi-lo por um
servidor HTTP estático simples. Não há build nem dependências de front-end.

Com Python (já instalado na maioria dos sistemas):

```bash
python -m http.server 8000
```

Depois abra <http://localhost:8000/> no navegador.

Alternativas equivalentes, se preferir:

```bash
npx serve .
# ou
php -S localhost:8000
```

## Como funciona

Stack 100% vanilla: **HTML + CSS + JavaScript**, sem framework e sem bundler.

- `index.html` — página principal com os filtros e a área de resultados.
- `sobre.html` — página "Sobre".
- `scripts/script.js` — carrega os JSONs via `fetch`, monta os cards das matérias
  no DOM e trata a deduplicação de matérias compartilhadas entre cursos.
- `scripts/filterFunction.js` — estado dos filtros (objeto `pesquisa`) e lógica de
  filtragem/contagem de resultados.
- `scripts/sortFunction.js` — ordenação dos cards.
- `styles/` — folhas de estilo separadas por área (header, footer, produtos, etc.).
- `data/` — estruturas curriculares em JSON.

## Estrutura do projeto

```
.
├── index.html            # página principal
├── sobre.html            # página "Sobre"
├── data/                 # estruturas curriculares (JSON)
├── scripts/              # lógica de carga, filtro e ordenação
├── styles/               # CSS
├── images/               # imagens e favicons
├── scraper/              # (planejado) coleta dos dados do SIGAA
├── parser/               # (planejado) conversão dos dados para JSON
└── doc/                  # notas de planejamento do projeto
```

## Contribuindo

Contribuições são bem-vindas! Veja o [CONTRIBUTING.md](CONTRIBUTING.md) para saber
como reportar bugs, rodar o projeto e abrir um pull request.

## Licença

Distribuído sob a licença MIT. Veja o arquivo [LICENSE](LICENSE).

## Créditos

Criado por **Caio Venâncio do Rosário**, estudante de Engenharia de Software na
UnB/FGA. Logo por Noboru (em produção).
