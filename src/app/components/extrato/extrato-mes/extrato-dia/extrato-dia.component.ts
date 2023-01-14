import { ExtratoComponent } from './../../extrato.component';
import { Component, Input, OnInit } from '@angular/core';
import { TransacaoService } from 'src/app/services/transacoes/transacao.service';
import { UtilService } from 'src/app/services/shared/util.service';

@Component({
  selector: 'app-extrato-dia',
  templateUrl: './extrato-dia.component.html',
  styleUrls: ['./extrato-dia.component.scss']
})
export class ExtratoDiaComponent implements OnInit {

  @Input() transacao : any;
  detalhes : boolean = false;
  valorTotal : number = 0;
  itemModal : any = null;

  constructor(
    private transacaoService : TransacaoService,
    private utilService: UtilService,
    private extratoGeral : ExtratoComponent
    ) { this.transacao = {} }

  ngOnInit() {
    this.transacao.dataTransacao = this.transacao.dataTransacao.split('/')[0] + "/" + this.transacao.dataTransacao.split('/')[1];
    if (this.transacao.parcelas > 1) {
      this.valorTotal = this.transacao.valor * this.transacao.parcelas;
    }
    this.transacao.valor = (Math.round(this.transacao.valor * 100) / 100).toFixed(this.transacao.valor.toString().includes('.') ? 2 : 0);
  }

  editarTransacao(transacao : any) {
    let parcelaDeTransacao : boolean = transacao.idTransacaoOriginal && transacao.idTransacaoOriginal != "";
    this.utilService.emitChange(parcelaDeTransacao ? transacao.idTransacaoOriginal : transacao.id);
  }

  deleteTransacao() {
    this.transacaoService.deleteTransacaoById(this.transacao.id).subscribe((_res : any) => {
      this.extratoGeral.getAllTransacoes();
    });
  }
}
