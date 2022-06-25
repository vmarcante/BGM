import { Transacao } from '../../models/transacao.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TransacoesService {


  constructor( private httpClient: HttpClient) {
  }

  getAllTransacoes() {
    return this.httpClient.get<any[]>('http://localhost:3000/transacoes?_sort=data&_order=asc');
  }

  addNovaTransacao(objetoTransacao : Transacao){
    return this.httpClient.post<Transacao>('http://localhost:3000/transacoes', objetoTransacao);
  }

  deleteTransacaoById(id : number){
    return this.httpClient.delete<Transacao>('http://localhost:3000/transacoes/' + id);
  }

  getDadosTransacao(id: number){
    return this.httpClient.get<any>('http://localhost:3000/transacoes/' + id);
  }

  editarDadosTransacao(objetoTransacao : Transacao) {
    return this.httpClient.patch<any>('http://localhost:3000/transacoes/' + objetoTransacao.id, objetoTransacao);
  }
}
