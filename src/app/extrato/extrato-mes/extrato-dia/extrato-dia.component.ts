import { Router } from '@angular/router';
import { ExtratoComponent } from './../../extrato.component';
import { Component, Input, OnInit } from '@angular/core';
import { TransacoesService } from 'src/app/services/transacoes/transacoes.service';

@Component({
  selector: 'app-extrato-dia',
  templateUrl: './extrato-dia.component.html',
  styleUrls: ['./extrato-dia.component.scss']
})
export class ExtratoDiaComponent implements OnInit {

  @Input() transacao : any;
  detalhes : boolean = false;
  valorTotal : number = 0;

  constructor(private transacaoService : TransacoesService, private extratoGeral : ExtratoComponent, private route : Router) { this.transacao = {} }

  ngOnInit() {
    this.transacao.data = this.transacao.data.split('/')[0] + "/" + this.transacao.data.split('/')[1];
    if (this.transacao.parcelas > 1) {
      this.valorTotal = this.transacao.valor * this.transacao.parcelas;
    }
    this.transacao.valor = (Math.round(this.transacao.valor * 100) / 100).toFixed(this.transacao.valor.toString().includes('.') ? 2 : 0);
  }

  toggleDetalhes() {
    this.detalhes = !this.detalhes;
  }

  editarTransacao() {
    this.route.navigateByUrl('transacao/' + this.transacao.id);
  }

  deleteTransacao() {
    this.transacaoService.deleteTransacaoById(this.transacao.id).subscribe((_res : any) => {
      this.extratoGeral.getAllTransacoes();
    });
  }

}
