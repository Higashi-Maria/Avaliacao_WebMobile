import { useRouter } from 'expo-router';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FormularioProduto } from '../src/components/FormularioProduto';
import { useProdutos } from '../src/context/ProdutosContext';
import type { NovoProduto } from '../src/types/produto';

export default function TelaCadastro() {
  const router = useRouter();
  const { cadastrarProduto } = useProdutos();

  function aoCadastrar(dados: NovoProduto) {
    cadastrarProduto(dados);
    router.dismissTo('/'); // volta para a tela inicial já existente na pilha
  }

  return (
    <SafeAreaView style={styles.tela} edges={['bottom', 'left', 'right']}>
      <KeyboardAvoidingView style={styles.tela} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.conteudo} keyboardShouldPersistTaps="handled">
          <FormularioProduto onCadastrar={aoCadastrar} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: '#fafaf9' },
  conteudo: { padding: 16, paddingBottom: 40 },
});
