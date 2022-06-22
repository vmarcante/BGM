import { Transacao } from './../models/transacao.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NovaTransacaoService {

  private transacoes : Transacao [];

  constructor( private httpClient: HttpClient) {
    this.transacoes = [];
    this.updateTransacoes();
  }

  getAllTransacoes(): Observable<any[]> {
    return this.httpClient.get<any[]>('http://localhost:3000/transacoes');
  }

  updateTransacoes() {
    this.getAllTransacoes().subscribe((res : any) =>
    this.transacoes = res);
  }

  addNovaTransacao(objetoTransacao : Transacao) : Observable<Transacao> {
    objetoTransacao.id = this.transacoes.length + 1;
    return this.httpClient.post<Transacao>('http://localhost:3000/transacoes', objetoTransacao);
  }
}
