export type Produto = {
  id: string;
  nome: string;
  /** Preço numérico em reais (ex.: 12.5). */
  preco: number;
  ativo: boolean;
};

export type NovoProduto = Omit<Produto, 'id'>;
