import { Transacao } from './../../models/transacao.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { TransacoesService } from 'src/app/services/transacoes/transacoes.service';
import * as moment from 'moment';

@Component({
  selector: 'app-nova-despesa',
  templateUrl: './nova-despesa.component.html',
  styleUrls: ['./nova-despesa.component.scss'],
})
export class NovaDespesaComponent implements OnInit {

  public formulario : FormGroup;
  parcelamento : any[];
  isLoading : boolean = false;

  constructor
  (
    private form : FormBuilder,
    private transacaoService : TransacoesService
  )
  {
    this.parcelamento = [];
    this.formulario = this.setupForm();
  }

  ngOnInit(): void {
    this.construirParcelas();
  }

  setupForm() {
    return this.form.group({
      nomeItem: new FormControl('', [Validators.required]),
      valor: new FormControl(0, [Validators.required, Validators.min(0.01)]),
      parcelas : 1,
      dataCompra : new FormControl(
        moment(new Date()).format("DD/MM/YYYY"),
        [Validators.required, Validators.minLength(10)]
        ),
      comentario: ""
    });
  }

  construirParcelas() {
    this.parcelamento.push({parcelas: 1, nome: "A vista"})
    for (let i = 1; i < 12; i++) {
      this.parcelamento.push({parcelas: i+1, nome: i+1 + " parcelas"});
    }
  }

  cadastrarDespesa() {
    if (this.formulario.valid) {
      this.isLoading = true;
      const despesa : Transacao = {
        nome : this.formulario.get('nomeItem')?.value,
        valor : this.formulario.get('valor')?.value,
        data : this.formulario.get('dataCompra')?.value,
        parcelas: this.formulario.get('parcelas')?.value,
        tipo : "despesa",
        comentario : this.formulario.get('comentario')?.value != "" ? this.formulario.get('comentario')?.value : null,
      }

      this.transacaoService.addNovaTransacao(despesa).subscribe( () => {
      this.resetForm();
      setTimeout(() => {
        this.isLoading = false;
      }, 100);
      });
    } else {
      this.formulario.markAllAsTouched();
    }
  }

  resetForm() {
    this.formulario.get('nomeItem')?.setValue('');
    this.formulario.get('valor')?.setValue(0);
    this.formulario.get('dataCompra')?.setValue(moment(new Date()).format("DD/MM/YYYY"));
    this.formulario.get('parcelas')?.setValue(1);
    this.formulario.get('comentario')?.setValue('');
    this.formulario.markAsUntouched();
    this.formulario.updateValueAndValidity();
  }
}
