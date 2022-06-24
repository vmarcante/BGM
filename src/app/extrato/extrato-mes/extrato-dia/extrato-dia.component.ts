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

  constructor(private transacaoService : TransacoesService, private extratoGeral : ExtratoComponent) { this.transacao = {} }

  ngOnInit() {
    this.transacao.data = this.transacao.data.split('/')[0] + "/" + this.transacao.data.split('/')[1];
    this.transacao.valor = (Math.round(this.transacao.valor * 100) / 100).toFixed(this.transacao.valor.toString().includes('.') ? 2 : 0);
  }

  changeDetalhes() {
    this.detalhes = !this.detalhes;
  }

  deleteTransacao() {
    this.transacaoService.deleteTransacaoById(this.transacao.id).subscribe((_res : any) => {
      this.extratoGeral.getAllTransacoes();
    });
  }

}
