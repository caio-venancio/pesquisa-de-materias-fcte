# Como Contribuir

Obrigado pelo interesse em contribuir com o **Pesquisa de Matérias (FCTE/FGA)**!
Toda ajuda é bem-vinda: correção de bugs, novas funcionalidades, melhorias de
layout ou atualização dos dados das matérias.

## Reportando bugs

Abra uma [issue](https://github.com/caio-venancio/pesquisa-de-materias-fcte/issues)
descrevendo:

- O que você esperava que acontecesse e o que de fato aconteceu.
- Passos para reproduzir.
- Navegador e sistema operacional.
- Se possível, um print da tela ou do console (F12).

## Sugerindo melhorias

Abra uma issue descrevendo a ideia e o problema que ela resolve. Vale discutir
antes de implementar, para alinhar o escopo.

## Rodando o projeto localmente

Não há build nem dependências de front-end. Basta um servidor HTTP estático
(o `fetch` dos dados não funciona via `file://`):

```bash
python -m http.server 8000
```

Abra <http://localhost:8000/> no navegador.

## Fluxo de pull request

1. Faça um fork do repositório.
2. Crie um branch a partir do `main`:
   ```bash
   git checkout -b feat/minha-melhoria
   ```
3. Faça as alterações. Mantenha a stack simples: **HTML, CSS e JavaScript vanilla**,
   sem adicionar frameworks ou ferramentas de build.
4. Teste no navegador: navegação entre páginas, filtros, busca e ordenação.
5. Faça commits pequenos e descritivos. Mensagens em português no formato
   `tipo: descrição` (ex.: `fix: corrigir contagem de resultados`) são bem-vindas.
6. Abra o pull request contra o `main`, explicando o que mudou e por quê.

## Atualizando os dados das matérias

Os arquivos em `data/*.json` seguem o esquema documentado no
[README](README.md#cursos-e-dados). Ao atualizar, mantenha as chaves e o formato
existentes para não quebrar a renderização dos cards. O pipeline automatizado de
coleta (`scraper/`) e conversão (`parser/`) ainda está em desenvolvimento.

## Estilo de código

- Siga a indentação e o estilo já presentes nos arquivos.
- Evite dependências externas sempre que possível.
- Comentários em português são bem-vindos para explicar trechos não óbvios.
