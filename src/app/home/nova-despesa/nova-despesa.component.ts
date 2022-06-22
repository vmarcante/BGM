import { Transacao } from './../../models/transacao.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { NovaTransacaoService } from 'src/app/services/nova-transacao.service';

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
    private transacaoService : NovaTransacaoService
  )
  {
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

  cadastrarDespesa() {
    this.isLoading = true;
    let objeto : Transacao = {
      nome : this.formulario.get('nomeItem')?.value,
      valor : this.formulario.get('valor')?.value,
      data : this.formulario.get('dataCompra')?.value,
      parcelas: this.formulario.get('parcelas')?.value,
      tipo : "despesa",
      comentario : this.formulario.get('comentario')?.value != "" ? this.formulario.get('comentario')?.value : null,
    }

    if (objeto.data) {
      objeto.data = objeto.data.split("T")[0];
    }

    this.transacaoService.addNovaTransacao(objeto).subscribe( () => {
    this.transacaoService.updateTransacoes();
    this.isLoading = false;
    });

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
