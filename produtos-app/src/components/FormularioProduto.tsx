import React, { useState } from 'react';
import { StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import type { NovoProduto } from '../types/produto';
import { validarNome, validarPreco } from '../utils/preco';
import { Botao } from './Botao';

type Props = { onCadastrar: (dados: NovoProduto) => void };

// Valores em edição ficam no estado LOCAL do formulário (RT2).
const NOME_INICIAL = '';
const PRECO_INICIAL = '';
const ATIVO_INICIAL = true;

export function FormularioProduto({ onCadastrar }: Props) {
  const [nome, setNome] = useState(NOME_INICIAL);
  const [preco, setPreco] = useState(PRECO_INICIAL);
  const [ativo, setAtivo] = useState(ATIVO_INICIAL);
  const [nomeTocado, setNomeTocado] = useState(false);
  const [precoTocado, setPrecoTocado] = useState(false);

  const erroNome = validarNome(nome);
  const resultadoPreco = validarPreco(preco);
  const erroPreco = 'erro' in resultadoPreco ? resultadoPreco.erro : null;
  const formularioValido = !erroNome && !erroPreco;

  function cadastrar() {
    if (!formularioValido || 'erro' in resultadoPreco) return;
    onCadastrar({ nome: nome.trim(), preco: resultadoPreco.valor, ativo });
    setNome(NOME_INICIAL);
    setPreco(PRECO_INICIAL);
    setAtivo(ATIVO_INICIAL);
    setNomeTocado(false);
    setPrecoTocado(false);
  }

  return (
    <View>
      <Text style={styles.rotulo}>Nome do produto</Text>
      <TextInput
        accessibilityLabel="Nome do produto"
        style={[styles.campo, nomeTocado && erroNome ? styles.campoErro : null]}
        value={nome}
        onChangeText={(t) => { setNome(t); setNomeTocado(true); }}
        onBlur={() => setNomeTocado(true)}
        placeholder="Ex.: Arroz 1 kg"
      />
      {nomeTocado && erroNome ? <Text style={styles.erro}>{erroNome}</Text> : null}

      <Text style={styles.rotulo}>Preço (R$)</Text>
      <TextInput
        accessibilityLabel="Preço em reais"
        style={[styles.campo, precoTocado && erroPreco ? styles.campoErro : null]}
        value={preco}
        onChangeText={(t) => { setPreco(t); setPrecoTocado(true); }}
        onBlur={() => setPrecoTocado(true)}
        placeholder="Ex.: 12,50"
        keyboardType="numbers-and-punctuation"
      />
      {precoTocado && erroPreco ? <Text style={styles.erro}>{erroPreco}</Text> : null}

      <View style={styles.linhaSituacao}>
        <Text style={styles.rotuloSituacao}>Situação: {ativo ? 'Ativo' : 'Inativo'}</Text>
        <Switch accessibilityLabel="Produto ativo" value={ativo} onValueChange={setAtivo} />
      </View>

      {!formularioValido ? (
        <Text style={styles.dica}>Preencha nome e preço válidos para habilitar o cadastro.</Text>
      ) : null}
      <Botao titulo="Cadastrar produto" onPress={cadastrar} desabilitado={!formularioValido} />
    </View>
  );
}

const styles = StyleSheet.create({
  rotulo: { fontSize: 16, fontWeight: '700', color: '#1c1917', marginTop: 16, marginBottom: 6 },
  campo: { borderWidth: 2, borderColor: '#78716c', borderRadius: 8, padding: 12, fontSize: 16, backgroundColor: '#fff' },
  campoErro: { borderColor: '#b91c1c' },
  erro: { color: '#b91c1c', marginTop: 6, fontSize: 14, fontWeight: '600' },
  linhaSituacao: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 20 },
  rotuloSituacao: { fontSize: 16, fontWeight: '700', color: '#1c1917' },
  dica: { color: '#57534e', marginBottom: 12, fontSize: 14 },
});
