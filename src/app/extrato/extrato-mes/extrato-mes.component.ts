import { Transacao } from 'src/app/models/transacao.model';
import { TransacaoMes } from './../../models/transacoesMes.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-extrato-mes',
  templateUrl: './extrato-mes.component.html',
  styleUrls: ['./extrato-mes.component.scss'],
})
export class ExtratoMesComponent implements OnInit {
  @Input() mes: TransacaoMes;
  mesOrdenado: any;

  constructor() {
    this.mes = {};
    this.mesOrdenado = [];
  }

  ngOnInit(): void {
    this.mesOrdenado = this.ordernarTransacoes();
  }

  ordernarTransacoes() {
    if (this.mes.transacoes) {
      let mesOrdenado : any = this.mes.transacoes.slice();

      for (let i = 0; i < mesOrdenado.length; i++) {
        for (let j = 0; j < mesOrdenado.length - 1; j++) {
          let dataAtual: number = mesOrdenado[j].data.split('-')[2];
          let dataProx: number = mesOrdenado[j + 1].data.split('-')[2];
          if (dataAtual > dataProx) {
            let troca = mesOrdenado[j];
            mesOrdenado[j] = mesOrdenado[j + 1];
            mesOrdenado[j + 1] = troca;
          }
        }
      }

      return mesOrdenado;
    }
  }
}
