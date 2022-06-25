import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { Transacao } from 'src/app/models/transacao.model';
import { TransacoesService } from 'src/app/services/transacoes/transacoes.service';

@Component({
  selector: 'app-nova-receita',
  templateUrl: './nova-receita.component.html',
  styleUrls: ['./nova-receita.component.scss'],
})
export class NovaReceitaComponent implements OnInit {
  public formulario: FormGroup;
  public isLoading: boolean = false;
  edicaoTransacao: any = {
    edicao: false,
    id: 0,
    tipo: '',
  };
  dadosEdicao: any = {};

  constructor(
    private form: FormBuilder,
    private transacaoService: TransacoesService,
    private activatedRoute: ActivatedRoute
  ) {
    this.formulario = this.setupForm(false);
  }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.params['id'] != '') {
      const id = this.activatedRoute.snapshot.params['id'];
      this.transacaoService.getDadosTransacao(id).subscribe((res: any) => {
        this.edicaoTransacao = {
          edicao: res.tipo == 'receita' ? true : false,
          id: id,
          tipo: res.tipo,
        };

        this.dadosEdicao = res;
        this.formulario = this.setupForm(this.edicaoTransacao.edicao);
      });
    }
  }

  setupForm(edicao: boolean) {
    if (edicao) {
      return this.form.group({
        descricaoReceita: new FormControl(this.dadosEdicao.nome, [
          Validators.required,
        ]),
        recorrente: this.dadosEdicao.recorrente,
        valor: new FormControl(this.dadosEdicao.valor, [
          Validators.required,
          Validators.min(0.01),
        ]),
        data: new FormControl(this.dadosEdicao.data, [
          Validators.required,
          Validators.minLength(10),
        ]),
      });
    }
    return this.form.group({
      descricaoReceita: new FormControl('', [Validators.required]),
      recorrente: false,
      valor: new FormControl(0, [Validators.required, Validators.min(0.01)]),
      data: new FormControl(moment(new Date()).format('DD/MM/YYYY'), [
        Validators.required,
        Validators.minLength(10),
      ]),
    });
  }

  cadastrarReceita() {
    if (this.formulario.valid) {
      this.isLoading = true;
      let receita: Transacao = {
        nome: this.formulario.get('descricaoReceita')?.value,
        valor: this.formulario.get('valor')?.value,
        data: this.formulario.get('data')?.value,
        recorrente: this.formulario.get('recorrente')?.value,
        tipo: 'receita',
      };

      if (this.edicaoTransacao.tipo) {
        receita.id = this.edicaoTransacao.id;
        this.transacaoService.editarDadosTransacao(receita).subscribe(() => {
          this.resetForm();
          setTimeout(() => {
            this.isLoading = false;
          }, 100);
        });
      } else {
        this.transacaoService
          .addNovaTransacao(receita)
          .subscribe((_res: any) => {
            this.resetForm();
            setTimeout(() => {
              this.isLoading = false;
            }, 100);
          });
      }
    } else {
      this.formulario.markAllAsTouched();
    }
  }

  resetForm() {
    this.formulario.get('descricaoReceita')?.setValue('');
    this.formulario.get('valor')?.setValue(0);
    this.formulario
      .get('data')
      ?.setValue(moment(new Date()).format('DD/MM/YYYY'));
    this.formulario.get('recorrente')?.setValue(false);
    this.formulario.markAsUntouched();
    this.formulario.updateValueAndValidity();
  }
}
