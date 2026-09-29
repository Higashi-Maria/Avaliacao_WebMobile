/**
 * Decisão documentada (README): RF2 diz que o preço "pode ser igual a zero",
 * mas o cenário 4 da Tabela 2 lista "0" entre as entradas recusadas.
 * Seguimos RF2 (a rubrica cita "conforme RF2"). Para seguir o cenário 4,
 * basta trocar a constante abaixo para false.
 */
export const PERMITIR_PRECO_ZERO = true;

export type ResultadoPreco = { valor: number } | { erro: string };

const SOMENTE_CARACTERES_VALIDOS = /^[0-9.,]+$/;
const FORMATO_VALIDO = /^\d+([.,]\d{1,2})?$/;

export function validarPreco(texto: string): ResultadoPreco {
  const t = texto.trim();
  if (t === '') return { erro: 'Informe o preço.' };
  if (!SOMENTE_CARACTERES_VALIDOS.test(t)) {
    return { erro: 'Use apenas números, vírgula ou ponto (sem sinais ou letras).' };
  }
  if (!FORMATO_VALIDO.test(t)) {
    return { erro: 'Use um único separador e no máximo duas casas decimais.' };
  }
  const valor = Math.round(parseFloat(t.replace(',', '.')) * 100) / 100;
  if (!PERMITIR_PRECO_ZERO && valor === 0) {
    return { erro: 'O preço deve ser maior que zero.' };
  }
  return { valor };
}

export function validarNome(texto: string): string | null {
  return texto.trim().length === 0 ? 'Informe o nome do produto.' : null;
}

/** 12.5 -> "R$ 12,50" (sempre vírgula, sem depender de Intl). */
export function formatarPreco(valor: number): string {
  return `R$ ${valor.toFixed(2).replace('.', ',')}`;
}
