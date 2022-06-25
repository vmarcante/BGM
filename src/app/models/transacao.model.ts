export interface Transacao {
  tipo: string | number,
  nome: string,
  valor: number,
  data: string,
  comentario?: string | null,
  recorrente?: boolean | number | null,
  parcelas?: number,
  parcelaAtual? : number,
  id?: number,
}

