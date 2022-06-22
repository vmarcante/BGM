import { Transacao } from 'src/app/models/transacao.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-extrato-dia',
  templateUrl: './extrato-dia.component.html',
  styleUrls: ['./extrato-dia.component.css']
})
export class ExtratoDiaComponent implements OnInit {

  @Input() transacao : any;

  constructor() { }

  ngOnInit() {
  }

}
