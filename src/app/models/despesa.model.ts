export interface Despesa {
  id?: number;
  valor: number | string;
  parcelas : number;
  nomeItem : string;
  dataCompra? : Date | string;
  comentario? : string;
}
