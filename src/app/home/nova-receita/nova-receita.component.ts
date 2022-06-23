import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import * as moment from 'moment';
import { Transacao } from 'src/app/models/transacao.model';
import { NovaTransacaoService } from 'src/app/services/nova-transacao.service';

@Component({
  selector: 'app-nova-receita',
  templateUrl: './nova-receita.component.html',
  styleUrls: ['./nova-receita.component.scss'],
})
export class NovaReceitaComponent implements OnInit {

  public formulario : FormGroup;
  public isLoading : boolean = false;

  constructor(private form : FormBuilder, private transacaoService : NovaTransacaoService) {
    this.formulario = this.setupForm();
  }

  ngOnInit(): void {}

  setupForm() {
    return this.form.group({
      descricaoReceita: new FormControl('', [Validators.required]),
      recorrente: false,
      valor: new FormControl(0, [Validators.required, Validators.min(0.01)]),
      data : new FormControl(
        moment(new Date()).format("DD/MM/YYYY"),
        [Validators.required, Validators.minLength(10)]
        ),
    });
  }

  cadastrarReceita() {
    if (this.formulario.valid) {
      this.isLoading = true;
      const receita : Transacao = {
        nome : this.formulario.get('descricaoReceita')?.value,
        valor : this.formulario.get('valor')?.value,
        data : this.formulario.get('data')?.value,
        recorrente: this.formulario.get('recorrente')?.value,
        tipo : "receita"
      }

      this.transacaoService.addNovaTransacao(receita).subscribe((_res : any) => {
      this.resetForm();
      this.transacaoService.updateTransacoes();
      setTimeout(() => {
        this.isLoading = false;
      }, 100);
      });
    } else {
      this.formulario.markAllAsTouched();
    }
  }

  resetForm() {
    this.formulario.get('descricaoReceita')?.setValue('');
    this.formulario.get('valor')?.setValue(0);
    this.formulario.get('data')?.setValue(moment(new Date()).format("DD/MM/YYYY"));
    this.formulario.get('recorrente')?.setValue(false);
    this.formulario.markAsUntouched();
    this.formulario.updateValueAndValidity();
  }
}
