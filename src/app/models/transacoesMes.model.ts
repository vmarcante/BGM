import { Transacao } from "./transacao.model";

export interface TransacaoMes {
  nomeMes: string,
  numeroMes : number | string,
  montanteMes : number,
  saldoFinalMes : number, //Saldo total do ano até o presente mês
  transacoes? : Transacao [],
}

