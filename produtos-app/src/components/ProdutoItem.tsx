import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import type { Produto } from '../types/produto';
import { formatarPreco } from '../utils/preco';

type Props = { produto: Produto; onPress: (id: string) => void };

export function ProdutoItem({ produto, onPress }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${produto.nome}, ${formatarPreco(produto.preco)}. Abrir detalhes`}
      onPress={() => onPress(produto.id)}
      style={styles.item}
    >
      <Text style={styles.nome}>{produto.nome}</Text>
      <Text style={styles.preco}>{formatarPreco(produto.preco)}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#d6d3d1',
    gap: 12,
  },
  nome: { flex: 1, fontSize: 16, color: '#1c1917' },
  preco: { fontSize: 16, fontWeight: '700', color: '#1c1917' },
});
