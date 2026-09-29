import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

type Props = {
  titulo: string;
  onPress: () => void;
  desabilitado?: boolean;
  variante?: 'primario' | 'secundario';
};

export function Botao({ titulo, onPress, desabilitado = false, variante = 'primario' }: Props) {
  const primario = variante === 'primario';
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: desabilitado }}
      disabled={desabilitado}
      onPress={onPress}
      style={[
        styles.base,
        primario ? styles.primario : styles.secundario,
        desabilitado && styles.desabilitado,
      ]}
    >
      <Text style={[styles.texto, !primario && styles.textoSecundario]}>{titulo}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { paddingVertical: 14, paddingHorizontal: 16, borderRadius: 8, alignItems: 'center', borderWidth: 2 },
  primario: { backgroundColor: '#88073f', borderColor: '#88073f' },
  secundario: { backgroundColor: '#fff', borderColor: '#88073f' },
  desabilitado: { opacity: 0.4 },
  texto: { color: '#fff', fontSize: 16, fontWeight: '700' },
  textoSecundario: { color: '#88073f' },
});
