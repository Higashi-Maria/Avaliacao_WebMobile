import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { Produto } from '../types/produto';
import { ProdutoItem } from './ProdutoItem';

type Props = {
  titulo: string;
  produtos: Produto[];
  mensagemVazia: string;
  onAbrir: (id: string) => void;
};

export function SecaoProdutos({ titulo, produtos, mensagemVazia, onAbrir }: Props) {
  return (
    <View style={styles.secao}>
      <Text accessibilityRole="header" style={styles.titulo}>{titulo}</Text>
      {produtos.length === 0 ? (
        <Text style={styles.vazio}>{mensagemVazia}</Text>
      ) : (
        produtos.map((p) => <ProdutoItem key={p.id} produto={p} onPress={onAbrir} />)
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  secao: { marginTop: 24 },
  titulo: { fontSize: 20, fontWeight: '800', color: '#610b30', marginBottom: 4 },
  vazio: { fontSize: 15, color: '#57534e', paddingVertical: 12 },
});
