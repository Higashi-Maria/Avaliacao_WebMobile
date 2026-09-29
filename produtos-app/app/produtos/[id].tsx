import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Botao } from '../../src/components/Botao';
import { useProdutos } from '../../src/context/ProdutosContext';
import { formatarPreco } from '../../src/utils/preco';

export default function TelaDetalhe() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id?: string | string[] }>();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const { obterProduto, alternarSituacao } = useProdutos();
  // Só o id vem pela rota; os dados sempre são lidos do contexto.
  const produto = id ? obterProduto(id) : undefined;

  function voltar() {
    if (router.canGoBack()) router.back();
    else router.replace('/');
  }

  return (
    <SafeAreaView style={styles.tela} edges={['bottom', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.conteudo}>
        {produto ? (
          <View>
            <Text style={styles.rotulo}>Nome</Text>
            <Text style={styles.valor}>{produto.nome}</Text>
            <Text style={styles.rotulo}>Preço</Text>
            <Text style={styles.valor}>{formatarPreco(produto.preco)}</Text>
            <Text style={styles.rotulo}>Situação</Text>
            <Text style={styles.valor}>{produto.ativo ? 'Ativo' : 'Inativo'}</Text>
            <View style={styles.acoes}>
              <Botao
                titulo={produto.ativo ? 'Desativar produto' : 'Ativar produto'}
                onPress={() => alternarSituacao(produto.id)}
              />
              <Botao titulo="Voltar para a tela inicial" variante="secundario" onPress={voltar} />
            </View>
          </View>
        ) : (
          <View>
            <Text style={styles.valor}>Produto não encontrado</Text>
            <View style={styles.acoes}>
              <Botao titulo="Voltar para a tela inicial" onPress={() => router.replace('/')} />
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: '#fafaf9' },
  conteudo: { padding: 16, paddingBottom: 40 },
  rotulo: { fontSize: 14, fontWeight: '700', color: '#57534e', marginTop: 16 },
  valor: { fontSize: 22, fontWeight: '700', color: '#1c1917', marginTop: 2 },
  acoes: { marginTop: 32, gap: 12 },
});
