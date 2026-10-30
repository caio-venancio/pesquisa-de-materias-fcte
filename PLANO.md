# PLANO — Finalizar "Pesquisa de Matérias (FCTE/FGA)"

Plano para levar o projeto a um estado publicável e agradável no **GitHub Pages**,
mantendo a stack **super simples**: HTML + CSS + JavaScript vanilla no front-end
(sem build, sem framework, sem bundler) e Python puro para o pipeline de dados.

- **Repositório:** https://github.com/caio-venancio/pesquisa-de-materias-fcte (público, branch `main`)
- **URL de destino (Pages):** https://caio-venancio.github.io/pesquisa-de-materias-fcte/
- **Status do Pages:** ❌ ainda não publicado (API `/pages` retorna 404)
- **Escopo escolhido:** C (completo) com restrição de manter a stack mínima

---

## Princípios

- Nada de framework/build. Continua abrindo com um servidor estático simples.
- Caminhos **relativos** em tudo, para funcionar em subdiretório do Pages.
- Pipeline de dados (scraper/parser) separado do site e opcional para rodar o site.
- Mudanças pequenas e verificáveis; o site tem que continuar funcionando a cada passo.

---

## Fase 0 — Bloqueadores de publicação (crítico) ✅ CONCLUÍDA

Sem isto o site quebra no GitHub Pages.

- [x] **Corrigir caminhos absolutos → relativos** (Pages serve em subpasta, não na raiz)
  - [x] `index.html`: nav `href="/index.html"` e `href="/sobre.html"`
  - [x] `sobre.html`: nav `href="/index.html"` e `href="/sobre.html"`
  - [x] `header.html`: nav (rascunho; corrigido por consistência, remoção fica p/ Fase 3)
  - [x] `scripts/filterFunction.js`: easter egg `src="/images/smug.png"`
  - [x] Varrer o repo atrás de qualquer outro caminho iniciado por `/` (nenhum restante)
- [x] **Validar os `fetch('./data/*.json')`** continuam resolvendo a partir de `index.html` (já eram relativos)

## Fase 1 — Publicar no GitHub Pages ✅ CONCLUÍDA

- [x] Adicionar `.nojekyll` na raiz (evita o Jekyll processar/ocultar arquivos)
- [x] Método de deploy escolhido (mais simples): **Deploy from a branch → `main` / root**
  - Alternativa equivalente: workflow mínimo de Pages (só se preferir CI). Mantido como opção, não padrão.
- [x] Pages ativado e **site no ar**: https://caio-venancio.github.io/pesquisa-de-materias-fcte/
  - Home (HTTP 200, title correto), `sobre.html` (200) e `data/*.json` (200) verificados.
  - HTTPS forçado habilitado.
  - Pendente de teste manual no navegador: interação de filtros e ordenação (JS roda só no cliente).

## Fase 2 — README e documentação do repositório

- [ ] Reescrever `README.md`: o que é, screenshot, como rodar localmente, como funciona, estrutura de pastas, dados/ano do edital, créditos, licença
- [ ] `CONTRIBUTING.md` (o README atual promete) — como reportar bug, rodar local, abrir PR
- [ ] `LICENSE` (open-source, conforme decisão em `doc/elaborate.txt`) — **definir qual (sugestão: MIT)**
- [ ] `.gitignore` (ex.: artefatos do Python do scraper, `__pycache__`, venv, etc.)

## Fase 3 — Limpeza e placeholders do site

- [ ] `index.html` / `sobre.html`: substituir texto placeholder **"Logo"** no header
  - **Logo final: PENDENTE EXTERNO — Noboru fará o SVG.** Usar placeholder decente até lá.
- [ ] Página **Sobre**: resolver placeholders
  - [ ] "Como funciona?" → texto real (hoje: `C.V.R. :D`)
  - [ ] "Imagem do autor" / "Imagem da documentação" → imagem real ou remover a caixa
  - [ ] "Olá! Eu sou Caio. Alguns links aí:" → **links PENDENTES (A DEFINIR pelo autor)**: GitHub do projeto, Twitter/LinkedIn
  - [ ] Imagem `Captura de Tela (3).png` está forçada a 80px — ajustar
- [ ] Remover/mover `header.html` da raiz (parece rascunho; candidato a ir para `doc/` ou ser apagado)
- [ ] Remover imagens não usadas de `images/` (ex.: `Fate-Stay-night-*.jpg`, `logo-dalle-*`) após confirmar que não são referenciadas
- [ ] **Aviso de ano/edital** de cada estrutura curricular (listado no to-do) — **ano A DEFINIR**

## Fase 4 — Pipeline de dados (scraper/parser) — pastas hoje vazias

Mantendo simples: Python puro, scripts executáveis à mão, saída direta em `data/*.json`.

- [ ] `scraper/` — baixar as estruturas curriculares do SIGAA
  - **Links scraping-friendly: o autor vai fornecer as URLs.** (Base conhecida: páginas de currículo público do SIGAA já listadas em `sobre.html`.)
- [ ] `parser/` — transformar o HTML/bruto baixado no formato JSON já usado pelo site
  - Esquema atual de cada matéria: `Código, Nome, Horas, Obrigatoriedade, Curso, Nível, Pré-Requisitos, Co-Requisitos`
- [ ] `requirements.txt` do pipeline + um `README` curto de como regenerar os dados
- [ ] Registrar o **ano/semestre do edital** capturado (alimenta o aviso da Fase 3)

## Fase 5 — Polimento de UX (itens desejados no to-do)

- [ ] **Modo noturno** (dark mode) — **A DEFINIR / a fazer**
- [ ] Responsividade mobile — revisar e finalizar (incl. texto da barra de pesquisa no celular)
- [ ] Destaque/realce do termo pesquisado nos cards (desejado no to-do) — opcional
- [ ] Favicon/arte final quando o logo chegar

## Fase 6 — Qualidade de código (sem complicar a stack)

- [ ] Declarar as globais implícitas (`disciplinas`, `materias`, `pesquisa`) com `let/const`
- [ ] Organizar os scripts mantendo-os vanilla (sem bundler); comentários de debug `console.log` opcionais atrás de uma flag
- [ ] Revisão leve da lógica de sincronização dos botões de filtro (pontos que o próprio autor marcou para "consertar")

---

## Pendências que dependem de você (externas ao código)

- [ ] **Logo** — Noboru (SVG)
- [ ] **Links da Sobre** — GitHub do projeto, Twitter/LinkedIn (a definir)
- [ ] **URLs do SIGAA** scraping-friendly — autor vai trazer
- [ ] **Ano/edital** das estruturas curriculares atuais
- [ ] **Licença** a adotar (sugestão: MIT)
- [ ] **Modo noturno** — confirmar se entra agora

---

## Ordem sugerida de execução

1. Fase 0 (destrava tudo) → 2. Fase 1 (site no ar) → 3. Fase 2 (README/docs) →
4. Fase 3 (limpeza) → 5. Fase 4 (dados) → 6. Fase 5 (UX) → 7. Fase 6 (código)

> As fases 0–3 já deixam o projeto "legal de deixar no GitHub Pages".
> As fases 4–6 completam o escopo C.
