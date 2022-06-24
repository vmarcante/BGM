import { Transacao } from '../../models/transacao.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransacoesService {

  private transacoes : Transacao [];

  constructor( private httpClient: HttpClient) {
    this.transacoes = [];
  }

  getAllTransacoes(): Observable<any[]> {
    return this.httpClient.get<any[]>('http://localhost:3000/transacoes?_sort=data&_order=asc');
  }

  addNovaTransacao(objetoTransacao : Transacao) : Observable<Transacao> {
    return this.httpClient.post<Transacao>('http://localhost:3000/transacoes', objetoTransacao);
  }

  deleteTransacaoById(id : number) : Observable <any> {
    return this.httpClient.delete<Transacao>('http://localhost:3000/transacoes/' + id);
  }
}
