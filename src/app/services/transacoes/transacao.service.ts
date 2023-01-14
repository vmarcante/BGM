import { Transacao } from '../../models/transacao.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
const serviceURL: string = environment.apiUrl + "/transacao";

@Injectable({
  providedIn: 'root'
})

export class TransacaoService {

  constructor(
    private HTTP: HttpClient,
    private formularioBuilder: FormBuilder,
  ) { }

  /*
  =-=-=-=-=-=-=-=-=-=-=-=
        UTILITARIOS
  =-=-=-=-=-=-=-=-=-=-=-=
  */
  getNovaTransacaoModel(): Transacao {
    return {
      tipoTransacao: "despesa",
      descricao: "",
      valor: 0,
      dataTransacao: moment(new Date()).format('DD/MM/YYYY'),
      comentario: null,
      recorrente: false,
      parcelas: 1,
      id: null,
      idTransacaoOriginal: null,
    };
  }

  buildTransacaoForm(transacao: Transacao) {
    return this.formularioBuilder.group({
      descricao: new FormControl(transacao.descricao, [Validators.required]),
      valor: new FormControl(transacao.valor * transacao.parcelas, [Validators.required, Validators.min(0.01)]),
      parcela: new FormControl(transacao.parcelas, [Validators.required]),
      dataTransacao: new FormControl(transacao.dataTransacao, [Validators.required, Validators.minLength(10)]),
      comentario: new FormControl(transacao.comentario),
      recorrente: new FormControl(transacao.recorrente),
      tipoTransacao: new FormControl(transacao.tipoTransacao)
    });
  }

  salvar(transacao : Transacao) : any {
    return transacao.id && transacao.id != "" ? 
    this.editarDadosTransacao(transacao) : this.addNovaTransacao(transacao);
  }

  /*
  =-=-=-=-=-=-=-=-=-=-=-=
        Métodos HTTP
  =-=-=-=-=-=-=-=-=-=-=-=
  */
  getAllTransacoes(): any {
    return this.HTTP.get<any[]>(serviceURL + "/getAll");
  }

  deleteTransacaoById(id: string) {
    return this.HTTP.delete<any>(serviceURL + "/delete/" + id);
  }

  getDadosTransacaoById(id: string) {
    return this.HTTP.get<any>(serviceURL + "/get/" + id);
  }

  editarDadosTransacao(objetoTransacao: Transacao) {
    return this.HTTP.put<any>(serviceURL + "/update", objetoTransacao);
  }

  addNovaTransacao(objetoTransacao: Transacao) {
    return this.HTTP.post<Transacao>(serviceURL, objetoTransacao);
  }
}
