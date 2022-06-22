import { Transacao } from "./transacao.model";

export interface TransacaoMes {
  nomeMes?: string,
  numeroMes? : number | string,
  transacoes? : Transacao [],
}

