import { Transacao } from './../../models/transacao.model';
import { TransacaoMes } from './../../models/transacoesMes.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-extrato-mes',
  templateUrl: './extrato-mes.component.html',
  styleUrls: ['./extrato-mes.component.scss'],
})
export class ExtratoMesComponent implements OnInit {
  @Input() mes: TransacaoMes;
  transacoesOrdenadas : Transacao [] = [];

  constructor() {
    this.mes = {};
  }

  ngOnInit(): void {this.transacoesOrdenadas = this.ordenarDatas()}

  ordenarDatas() {
    let transacoesOrdenadas: any = this.mes.transacoes?.slice();

    transacoesOrdenadas.forEach((_array: any) => {
      transacoesOrdenadas.forEach((_array2: any, j: any) => {
        let dataAtual : number = transacoesOrdenadas[j] ? transacoesOrdenadas[j]?.data.split('/' || '-')[0] : null;
        let dataProx : number = transacoesOrdenadas[j + 1] ? transacoesOrdenadas[j + 1]?.data.split('/' || '-')[0] : null;

        if (dataAtual != null && dataProx != null && dataAtual > dataProx) {
          let troca = transacoesOrdenadas[j];
          transacoesOrdenadas[j] = transacoesOrdenadas[j + 1];
          transacoesOrdenadas[j + 1] = troca;
        }
      });
    });

    return transacoesOrdenadas;
  }
}
