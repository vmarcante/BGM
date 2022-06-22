import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
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
    this.formulario = this.form.group({
      descricaoReceita: "",
      recorrente: false,
      valor: 0,
      data : new Date(),
    });
  }

  ngOnInit(): void {}

  cadastrarReceita() {
    this.isLoading = true;
    let objeto : Transacao = {
      nome : this.formulario.get('descricaoReceita')?.value,
      valor : this.formulario.get('valor')?.value,
      data : this.formulario.get('data')?.value,
      recorrente: this.formulario.get('recorrente')?.value,
      tipo : "receita"
    }

    if (objeto.data) {
      objeto.data = objeto.data.split("T")[0];
    }

    this.transacaoService.addNovaTransacao(objeto).subscribe( (res : any) => {
    this.transacaoService.updateTransacoes();
    this.isLoading = false;
    });

  }

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
