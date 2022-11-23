import { Transacao } from 'src/app/models/transacao.model';
import { TransacaoMes } from './../../models/transacoesMes.model';
import { Component, OnInit } from '@angular/core';
import { TransacoesService } from '../../services/transacoes/transacoes.service';
import { Router } from '@angular/router';
import { UtilService } from '../../services/shared/util.service';

@Component({
  selector: 'app-extrato',
  templateUrl: './extrato.component.html',
  styleUrls: ['./extrato.component.scss'],
})
export class ExtratoComponent implements OnInit {
  todasTransacoes: Transacao[] = [];
  transacoesMes: TransacaoMes[] = [];
  isLoading: boolean = false;

  constructor(
    private transacaoService: TransacoesService,
    private utilService: UtilService,
    private router: Router
  ) {
    this.utilService.updateEmitted$.subscribe(() => {
      this.getAllTransacoes();
    });
  }

  ngOnInit(): void {
    this.getAllTransacoes();
  }

  semRegistro() {
    this.router.navigateByUrl('transacao');
  }

  getAllTransacoes() {
    this.isLoading = true;
    this.transacaoService.getAllTransacoes().subscribe((res: any) => {
      this.todasTransacoes = res;
      this.construirMeses();
    });
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
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
      let mesData: number = transacao.data ? parseInt(transacao.data?.split('/')[1]) : 1;
      let mesAtual = '';

      if (transacao.recorrente) {
        for (let i = mesData - 1; i <  12 ; i++) {
          mesAtual = i >= 9 ? (i+1).toString() : '0' + (i + 1);
          this.transacoesMes[i].transacoes?.push({
            data:
              transacao.data?.split('/')[0] +
              '/' +
              mesAtual +
              '/' +
              transacao.data?.split('/')[2],
            nome: transacao.nome,
            tipo: transacao.tipo,
            valor: transacao.valor,
            comentario: transacao.comentario,
            id: transacao.id,
            recorrente: transacao.recorrente,
          });
        }
        continue;
      }

      if (transacao.parcelas != null && transacao.parcelas > 1) {
        let parcelaAtual = 1;
        for (let i = mesData - 1; i < mesData + transacao.parcelas - 1; i++) {
          if (i >= 12 ) {continue;}
          mesAtual = i >= 9 ? (i+1).toString() : '0' + (i + 1);
          this.transacoesMes[i].transacoes?.push({
            data:
              transacao.data?.split('/')[0] +
              '/' +
              mesAtual +
              '/' +
              transacao.data?.split('/')[2],
            nome: transacao.nome,
            tipo: transacao.tipo,
            valor: transacao.valor / transacao.parcelas,
            comentario: transacao.comentario,
            id: transacao.id,
            parcelas: transacao.parcelas,
            recorrente: transacao.recorrente,
            parcelaAtual: parcelaAtual,
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
      this.transacoesMes[i].montanteMes = parseInt(
        (Math.round(saldo * 100) / 100).toFixed(2)
      );
    });

    this.realizarBalancoGeral();
  }

  realizarBalancoGeral() {
    for (let i = 0; i < 12; i++) {
      let saldo = 0;
      for (let j = 0; j <= i; j++) {
        saldo += this.transacoesMes[j].montanteMes;
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

    this.isLoading = false;
  }
}
