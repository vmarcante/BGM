import { Transacao } from 'src/app/models/transacao.model';
import { TransacaoMes } from './../models/transacoesMes.model';
import { Component, OnInit } from '@angular/core';
import { NovaTransacaoService } from '../services/nova-transacao.service';

@Component({
  selector: 'app-extrato',
  templateUrl: './extrato.component.html',
  styleUrls: ['./extrato.component.scss'],
})
export class ExtratoComponent implements OnInit {
  todasTransacoes: Transacao[] = [];
  transacoesMes: TransacaoMes[] = [];
  ordenedTransacoes : Transacao[] = [];

  constructor(private transacaoService: NovaTransacaoService) {}

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


    this.separarPorMeses(this.ordenarDatas());
  }

  ordenarDatas() {
    let transacoesOrdenadas: any = this.todasTransacoes.slice();

    transacoesOrdenadas.forEach((_array: any) => {
      transacoesOrdenadas.forEach((_array2: any, j: any) => {
        let dataAtual : number = transacoesOrdenadas[j] ? transacoesOrdenadas[j]?.data.split('-')[2] : null;
        let dataProx : number = transacoesOrdenadas[j + 1] ? transacoesOrdenadas[j + 1]?.data.split('-')[2] : null;
        if (dataAtual != null && dataProx != null && dataAtual > dataProx) {
          let troca = transacoesOrdenadas[j];
          transacoesOrdenadas[j] = transacoesOrdenadas[j + 1];
          transacoesOrdenadas[j + 1] = troca;
        }
      });
    });

    return transacoesOrdenadas;
  }

  separarPorMeses(todasTransacoes : any []) {
    for (let transacao of todasTransacoes) {
      let mesData = transacao.data?.split('-')[1];
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
