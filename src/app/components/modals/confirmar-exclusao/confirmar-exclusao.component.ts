import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirmar-exclusao',
  templateUrl: './confirmar-exclusao.component.html',
  styleUrls: ['./confirmar-exclusao.component.scss'],
})
export class ConfirmarExclusaoComponent implements OnInit {

  @Input() item : any;

  constructor() { }

  ngOnInit(): void {}
}
