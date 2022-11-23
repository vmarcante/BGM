
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
@Injectable({
  providedIn: 'root'
})
export class UtilService {
  constructor() {}

  private idObservable = new Subject<any>();
  private updateObservable = new Subject<any>();
  changeEmitted$ = this.idObservable.asObservable();
  updateEmitted$ = this.updateObservable.asObservable();


  emitChange(change: any) {
      if (change == 'atualizar') {
        this.updateObservable.next(change);
      } else {
        this.idObservable.next(change);
      }
  }
}