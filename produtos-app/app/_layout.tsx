import { Stack } from 'expo-router';
import { ProdutosProvider } from '../src/context/ProdutosContext';

// Única instância do provider, acima do Stack, cobrindo todas as telas.
export default function RootLayout() {
  return (
    <ProdutosProvider>
      <Stack screenOptions={{ headerTitleAlign: 'center' }}>
        <Stack.Screen name="index" options={{ title: 'Meus produtos' }} />
        <Stack.Screen name="cadastro" options={{ title: 'Novo produto' }} />
        <Stack.Screen name="produtos/[id]" options={{ title: 'Detalhes do produto' }} />
      </Stack>
    </ProdutosProvider>
  );
}
