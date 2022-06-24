import { Transacao } from 'src/app/models/transacao.model';
import { TransacaoMes } from './../models/transacoesMes.model';
import { Component, OnInit } from '@angular/core';
import { TransacoesService } from '../services/transacoes/transacoes.service';

@Component({
  selector: 'app-extrato',
  templateUrl: './extrato.component.html',
  styleUrls: ['./extrato.component.scss'],
})
export class ExtratoComponent implements OnInit {
  todasTransacoes: Transacao[] = [];
  transacoesMes: TransacaoMes[] = [];

  constructor(private transacaoService: TransacoesService) {}

  ngOnInit(): void {
    this.getAllTransacoes();
  }

  getAllTransacoes() {
    this.transacaoService.getAllTransacoes().subscribe((res: any) => {
      this.todasTransacoes = res;
      this.construirMeses();
    });
  }

  construirMeses() {
    this.transacoesMes = [];
    let nomeMes = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]

    for (let i = 1; i <= 12; i++) {
      if (i >= 10) {
        this.transacoesMes.push({
          nomeMes : nomeMes[i-1],
          numeroMes: i.toString(),
          transacoes: [],
        });
        continue;
      }
      this.transacoesMes.push({
        nomeMes : nomeMes[i-1],
        numeroMes: '0' + i,
        transacoes: [],
      });
    }


    this.separarPorMeses();
  }

  separarPorMeses() {
    for (let transacao of this.todasTransacoes) {
      let mesData = transacao.data?.split('/' || '-')[1];
      this.transacoesMes.forEach((mes, i) => {
        if (mesData?.toString() === mes.numeroMes) {
          this.transacoesMes[i].transacoes?.push(transacao);
        }
      });
    }
    this.deletarMesesVazios();
  }

  deletarMesesVazios() {
    let i = 0;
    while (i < this.transacoesMes.length) {
      if (this.transacoesMes[i].transacoes != null && this.transacoesMes[i].transacoes?.length == 0) {
        this.transacoesMes.splice(i, 1);
      } else {
        ++i;
      }
    }
  }
}
