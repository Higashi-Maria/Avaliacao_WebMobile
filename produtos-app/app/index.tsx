import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Botao } from '../src/components/Botao';
import { SecaoProdutos } from '../src/components/SecaoProdutos';
import { useProdutos } from '../src/context/ProdutosContext';

export default function TelaInicial() {
  const router = useRouter();
  const { ativos, inativos } = useProdutos();
  const abrir = (id: string) => router.push({ pathname: '/produtos/[id]', params: { id } });

  return (
    <SafeAreaView style={styles.tela} edges={['bottom', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.conteudo}>
        <Botao titulo="Cadastrar novo produto" onPress={() => router.push('/cadastro')} />
        <SecaoProdutos
          titulo="Produtos ativos"
          produtos={ativos}
          mensagemVazia="Nenhum produto ativo. Cadastre um produto ou ative um existente."
          onAbrir={abrir}
        />
        <SecaoProdutos
          titulo="Produtos inativos"
          produtos={inativos}
          mensagemVazia="Nenhum produto inativo."
          onAbrir={abrir}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: '#fafaf9' },
  conteudo: { padding: 16, paddingBottom: 40 },
});
