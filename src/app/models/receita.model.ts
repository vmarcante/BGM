export interface Receita {
  id?: number;
  valor: number | string;
  recorrente : number | boolean;
  descricaoReceita : string;
  data? : Date | string;
  comentario? : string;
}
