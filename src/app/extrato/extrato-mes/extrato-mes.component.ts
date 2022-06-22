import { TransacaoMes } from './../../models/transacoesMes.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-extrato-mes',
  templateUrl: './extrato-mes.component.html',
  styleUrls: ['./extrato-mes.component.scss'],
})
export class ExtratoMesComponent implements OnInit {
  @Input() mes: TransacaoMes;

  constructor() {
    this.mes = {};
  }

  ngOnInit(): void { }

}
