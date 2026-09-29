import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import type { NovoProduto, Produto } from '../types/produto';

export type ProdutosContextData = {
  produtos: Produto[];
  /** Derivados da mesma lista (não são estado). */
  ativos: Produto[];
  inativos: Produto[];
  cadastrarProduto: (dados: NovoProduto) => void;
  alternarSituacao: (id: string) => void;
  obterProduto: (id: string) => Produto | undefined;
};

const ProdutosContext = createContext<ProdutosContextData | undefined>(undefined);

export function ProdutosProvider({ children }: { children: React.ReactNode }) {
  // Começa vazia; só existe em memória (sem persistência, conforme o escopo).
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const contador = useRef(0);

  const cadastrarProduto = useCallback((dados: NovoProduto) => {
    contador.current += 1;
    const id = `${Date.now().toString(36)}-${contador.current}`;
    setProdutos((anterior) => [...anterior, { id, ...dados }]);
  }, []);

  const alternarSituacao = useCallback((id: string) => {
    setProdutos((anterior) =>
      anterior.map((p) => (p.id === id ? { ...p, ativo: !p.ativo } : p)),
    );
  }, []);

  const obterProduto = useCallback(
    (id: string) => produtos.find((p) => p.id === id),
    [produtos],
  );

  const ativos = useMemo(() => produtos.filter((p) => p.ativo), [produtos]);
  const inativos = useMemo(() => produtos.filter((p) => !p.ativo), [produtos]);

  const valor = useMemo<ProdutosContextData>(
    () => ({ produtos, ativos, inativos, cadastrarProduto, alternarSituacao, obterProduto }),
    [produtos, ativos, inativos, cadastrarProduto, alternarSituacao, obterProduto],
  );

  return <ProdutosContext.Provider value={valor}>{children}</ProdutosContext.Provider>;
}

export function useProdutos(): ProdutosContextData {
  const ctx = useContext(ProdutosContext);
  if (!ctx) throw new Error('useProdutos deve ser usado dentro de ProdutosProvider');
  return ctx;
}
