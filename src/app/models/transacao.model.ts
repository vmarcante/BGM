export interface Transacao {
  id: string | null,
  tipoTransacao: string | number,
  descricao: string,
  valor: number,
  dataTransacao: string,
  comentario?: string | null,
  recorrente: boolean | number | null,
  parcelas: number,
  parcelaAtual?: number,
  idTransacaoOriginal? : string | null,
}

