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
    let nomeMes = [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro',
    ];

    for (let i = 1; i <= 12; i++) {
      this.transacoesMes.push({
        nomeMes: nomeMes[i - 1],
        numeroMes: i,
        montanteMes: 0,
        saldoFinalMes: 0,
        transacoes: [],
      });
    }

    this.separarPorMeses();
  }

  separarPorMeses() {
    for (let transacao of this.todasTransacoes) {
      let mesData: number = transacao.data
        ? parseInt(transacao.data?.split('/')[1])
        : 1;
      if (transacao.parcelas != null && transacao.parcelas > 1) {
        let parcelaAtual = 1;
        for (let i = mesData - 1; i < mesData + transacao.parcelas - 1; i++) {
          if (i > 11) { continue; }
          this.transacoesMes[i].transacoes?.push({
            data: transacao.data,
            nome: transacao.nome,
            tipo: transacao.tipo,
            valor: transacao.valor / transacao.parcelas,
            comentario: transacao.comentario,
            id: transacao.id,
            parcelas: transacao.parcelas,
            recorrente: transacao.recorrente,
            parcelaAtual: parcelaAtual
          });
          parcelaAtual++;
        }
        continue;
      }
      this.transacoesMes[mesData - 1].transacoes?.push(transacao);
    }
    this.montarMontanteMes();
  }

  montarMontanteMes() {
    this.transacoesMes.forEach((mes, i) => {
      let saldo = 0;
      mes.transacoes?.forEach((transacao) => {
        if (transacao.valor != null && transacao.tipo == 'receita') {
          saldo += transacao.valor;
        }
        if (transacao.valor != null && transacao.tipo == 'despesa') {
          saldo -= transacao.valor;
        }
      });
      this.transacoesMes[i].montanteMes = parseInt((Math.round(saldo * 100) / 100).toFixed(2));
    });

    this.realizarBalancoGeral();
  }

  realizarBalancoGeral() {
    let valorTotal = 0;
    for (let i = 0; i < 12; i++) {
      let saldo = 0;
      for (let j = 0; j <= i; j++) {
        saldo += this.transacoesMes[j].montanteMes;
      }
      if (i == this.transacoesMes.length - 1) {
        valorTotal = saldo;
      }
      this.transacoesMes[i].saldoFinalMes = saldo;
    }
    this.deletarMesesVazios();
  }

  deletarMesesVazios() {
    let i = 0;
    while (i < this.transacoesMes.length) {
      if (
        this.transacoesMes[i].transacoes != null &&
        this.transacoesMes[i].transacoes?.length == 0
      ) {
        this.transacoesMes.splice(i, 1);
      } else {
        ++i;
      }
    }
  }
}
