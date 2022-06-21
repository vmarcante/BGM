import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-despesa-rapida',
  templateUrl: './despesa-rapida.component.html',
  styleUrls: ['./despesa-rapida.component.scss'],
})
export class DespesaRapida implements OnInit {

  public formulario : FormGroup;
  parcelamento : any[];

  constructor(private form : FormBuilder) {
    this.parcelamento = [];
    this.formulario = this.form.group({
      nomeItem: "",
      descricaoCompra: "",
      valor: null,
      parcelas : 1,
      dataCompra : new Date(),
      comentario: ""
    });
    this.construirParcelas();
  }

  construirParcelas() {
    this.parcelamento.push({parcelas: 1, nome: "A vista"})
    for (let i = 1; i < 10; i++) {
      this.parcelamento.push({parcelas: i+1, nome: i+1 + " vezes"});
    }
  }

  ngOnInit(): void {}
}
