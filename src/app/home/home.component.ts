import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  formulario: FormGroup;

  constructor(private form : FormBuilder) {
    this.formulario = this.form.group({
      nomeItem: "",
      descricaoCompra: "",
      valor: 0,
      parcelado : false,
    });
  }

  ngOnInit(): void {}
}
