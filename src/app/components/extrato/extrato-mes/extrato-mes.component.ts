import { Transacao } from './../../../models/transacao.model';
import { TransacaoMes } from './../../../models/transacoesMes.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-extrato-mes',
  templateUrl: './extrato-mes.component.html',
  styleUrls: ['./extrato-mes.component.scss'],
})
export class ExtratoMesComponent implements OnInit {
  @Input() mes: TransacaoMes;
  montante : number = 0;

  constructor() {
    this.mes = {
      montanteMes: 0,
      nomeMes: '',
      saldoFinalMes: 0,
      numeroMes: 0,
    };
  }

  ngOnInit(): void {
  }


}
