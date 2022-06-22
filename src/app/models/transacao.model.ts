export interface Transacao {
  tipo: string | number | null,
  nome: string | null,
  valor: number | null,
  data: string | null,
  comentario?: string | null,
  recorrente?: boolean | number | null,
  parcelas?: number | null,
  id?: number | null,
}

