import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-nova-receita',
  templateUrl: './nova-receita.component.html',
  styleUrls: ['./nova-receita.component.scss'],
})
export class NovaReceitaComponent implements OnInit {

  public formulario : FormGroup;

  constructor(private form : FormBuilder) {
    this.formulario = this.form.group({
      descricaoReceita: "",
      recorrente: false,
      valor: 0,
      data : new Date(),
      comentario: ""
    });
  }

  ngOnInit(): void {}

  resetForm(){
    this.formulario = this.form.group({
      descricaoReceita: "",
      recorrente: false,
      valor: 0,
      data : new Date(),
      comentario: ""
    });
  }
}
