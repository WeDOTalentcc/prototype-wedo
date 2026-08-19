# Design System WeDO — regras para o protótipo

> Destilado das fontes canônicas do produto. Antes de desenhar QUALQUER tela, ler este
> arquivo. Para detalhe completo, consultar as fontes:
> `../prototype/plataforma-lia/docs/02-design-system.md` (DS v2.0, 1300 linhas),
> `../prototype/plataforma-lia/CLAUDE.md` (decisões v4.2.1) e
> `../prototype/plataforma-lia/src/styles/design-tokens.css` (tokens reais).

## Filosofia (padrão ElevenLabs)

Interface **monocromática (90%)** + **acentos WeDo dessaturados (10%)**.

- ✓ Texto escuro (nunca preto puro #000), backgrounds claros com hierarquia
- ✓ Bordas quase invisíveis, sombras sutis, cores de acento com parcimônia
- ✗ Gradientes (exceção única: bolha da LIA), bordas grossas, cores saturadas,
  animações excessivas

## Semântica dos acentos (NUNCA trocar o significado)

| Cor | Token | Significa |
|---|---|---|
| Cyan `#60BED1` | `--wedo-cyan` | **exclusivo de IA/LIA**: vagas com IA, automação, badges de sugestão |
| Green `#5DA47A` | `--wedo-green` | candidatos, sucesso, aprovação |
| Orange `#D19960` | `--wedo-orange` | tempo, custos, alertas |
| Purple `#9860D1` | `--wedo-purple` | insights, premium, análises IA |
| Magenta `#D160AB` | `--wedo-magenta` | urgência crítica, prioridade alta |
| Coral `#C74446` | `--lia-coral` | identidade LIA, uso MÍNIMO |
| Status | `--status-error/-warning/success` | erro `#DC2626`, warning `#D97706`, sucesso `#16A34A` |

Regra do produto: **cyan é a cor da IA** — toda surface de agente/LIA usa cyan; nunca
usar cyan para coisa sem IA.

## Tipografia

- **Inter** (body/UI) — pesos 300–700. **Source Serif 4 bold** só para destaques
  editoriais (hero do login, tagline). Carregar via Google Fonts `<link>` com fallback.
- Escala: 11 / 12.5 / 14 (base) / 16 / 20 / 26px. Hierarquia por PESO e tom de cinza,
  não por cor.

## Formas e profundidade

- Raios: cards e modais **12px** (`rounded-xl`), inputs e badges **8px**, pills/avatars
  `999px`. Tokens: `--radius-md/lg/full`.
- Sombras leves (`--shadow-sm/md/lg`); elevação sutil, nunca dramática.
- Espaçamento em múltiplos de 4px (`--space-*`).

## Movimento

- Transições específicas (`background`, `color`, `opacity`, `transform`) — **nunca**
  "transition: all".
- Animações discretas; respeitar `prefers-reduced-motion` (skeleton, typing, nuvens).

## Ícones

- Padrão **lucide** em SVG inline: `stroke="currentColor" stroke-width="2"`, 16px
  inline / 20px navegação-standalone. Decorativos com `aria-hidden="true"`.
- Copiar paths dos ícones já usados nas telas existentes antes de desenhar novos.

## Componentes

- Usar os canônicos do `styles/base.css` (mapa em `docs/PATTERNS.md`). Botão primário é
  ESCURO (`--bg-inverse`/`--text-primary`), não colorido; botão de IA é o `.btn-ai`
  (cyan suave). Badge de sugestão da IA = `.badge-ai` (✦ cyan).
- Estados de interação: hover = cinza sutil (`--interactive-hover`), foco = anel cyan
  (`--focus-ring`), erro = borda `--status-error`.

## Acessibilidade mínima

- Contraste AA nos textos; foco visível; `alt`/`aria-label` em imagem e botão só-ícone;
- Nunca transmitir estado só por cor (badge tem texto).

## Checklist de conformidade (rodar por tela)

- [ ] 90% cinza, acentos só com significado semântico correto?
- [ ] Zero hex fora do tokens.css? Zero gradiente (fora bolha LIA)?
- [ ] Raios 12/8, sombras leves, spacing múltiplo de 4?
- [ ] Ícones lucide 16px stroke-2 com aria-hidden?
- [ ] Elementos de IA (e só eles) em cyan?
