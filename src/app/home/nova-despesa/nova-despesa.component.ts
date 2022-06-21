import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-nova-despesa',
  templateUrl: './nova-despesa.component.html',
  styleUrls: ['./nova-despesa.component.scss'],
})
export class NovaDespesaComponent implements OnInit {

  public formulario : FormGroup;
  parcelamento : any[];

  constructor(private form : FormBuilder) {
    this.parcelamento = [];
    this.formulario = this.form.group({
      nomeItem: "",
      valor: 0,
      parcelas : 1,
      dataCompra : new Date(),
      comentario: ""
    });
    this.construirParcelas();
  }

  construirParcelas() {
    this.parcelamento.push({parcelas: 1, nome: "A vista"})
    for (let i = 1; i < 12; i++) {
      this.parcelamento.push({parcelas: i+1, nome: i+1 + " parcelas"});
    }
  }

  resetForm() {
    this.formulario = this.form.group({
      nomeItem: "",
      valor: 0,
      parcelas : 1,
      dataCompra : new Date(),
      comentario: ""
    });
  }

  ngOnInit(): void {}
}
