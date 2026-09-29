# Meus Produtos — P1 Desenvolvimento Web/Mobile (UFT)

**Nome completo:** _Maria Luiza Pinheiro Higashi_  **Matrícula:** _2024213252_

## Instalação e execução
```bash
npm install
npx expo install --fix   # alinha as versões das dependências ao SDK instalado
npx expo start           # a (Android), i (iOS) ou w (web)
```
**Plataforma testada:** _web_

## Seção Claude IA
- Link: https://claude.ai/share/2a88bec3-6315-4eca-88aa-5d8faf66e07b

## Verificações
- `npx tsc --noEmit`: _registrar aqui o resultado após executar (esperado: sem erros)_
- Cenários 1 a 9 da Tabela 2: _registrar aqui, marcando cada um após testar_
  - Cenário 8 (id inexistente): na web, abra `/produtos/xyz`.
  - Cenário 9 (sem histórico): na web, abra `/produtos/xyz` direto; "Voltar para a tela inicial" usa `router.replace('/')`.

## Decisões sobre pontos ambíguos do enunciado
1. **Preço zero:** RF2 diz que zero é permitido; o cenário 4 lista "0" como recusado. Foi seguido o RF2 (a rubrica cita "conforme RF2"). Para inverter, mude `PERMITIR_PRECO_ZERO` em `src/utils/preco.ts`.
2. **"Seção 8":** o enunciado manda responder as "quatro perguntas da seção 8", mas elas estão na seção 9 (não existe seção 8). Estão respondidas abaixo.
3. **Escopo:** sem persistência, edição de nome/preço, exclusão, API ou autenticação, pois o PDF os exclui e avisa que podem descontar pontos.

## Limitações conhecidas
Os dados vivem só em memória; fechar ou recarregar o app zera a lista (exigido pelo PDF).

## Fontes consultadas
Enunciado da P1, documentação do Expo Router e do React Native. Assistência de IA (Claude): sessão completa anexada à entrega.

## Perguntas (seção 8 do PDF)
1. **Onde o provider está montado?** Em `app/_layout.tsx`, envolvendo o `<Stack>`. Como fica acima de todas as rotas, cadastro, tela inicial e detalhe chamam `useProdutos()` (`src/context/ProdutosContext.tsx`) e leem/alteram a mesma lista.
2. **Estado local, provider e derivados?** Local: `nome`, `preco`, `ativo` e "tocado" em `FormularioProduto.tsx`. Provider: o array `produtos` e as operações `cadastrarProduto` e `alternarSituacao`. Derivados: `ativos` e `inativos` (`useMemo` sobre `produtos`), o preço convertido (`validarPreco`) e o texto formatado (`formatarPreco`).
3. **Como a rota identifica o produto?** Pelo arquivo `app/produtos/[id].tsx`: só o `id` vai na URL (`useLocalSearchParams`) e o produto é buscado com `obterProduto(id)`. Ler do contexto evita uma cópia desatualizada: ao ativar/desativar, a tela reflete o estado atual, e id inexistente mostra "Produto não encontrado".
4. **Qual função ativa/desativa?** `alternarSituacao(id)` no provider: `setProdutos(anterior => anterior.map(p => p.id === id ? { ...p, ativo: !p.ativo } : p))`. Cria novo array e novo objeto só para o produto alterado, sem mutar o estado anterior. Ao recarregar o app, o estado em memória se perde e a lista volta vazia.
