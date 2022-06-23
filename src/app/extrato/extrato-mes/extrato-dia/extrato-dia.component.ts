import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-extrato-dia',
  templateUrl: './extrato-dia.component.html',
  styleUrls: ['./extrato-dia.component.scss']
})
export class ExtratoDiaComponent implements OnInit {

  @Input() transacao : any;

  constructor() { this.transacao = {} }

  ngOnInit() {
    this.transacao.data = this.transacao.data.split('/' || '-')[0];
    this.transacao.valor = (Math.round(this.transacao.valor * 100) / 100).toFixed(2);
  }

}
