import { Transacao } from '../models/transacao.model';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TransacoesService } from 'src/app/services/transacoes/transacoes.service';
import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nova-transacao',
  templateUrl: './nova-transacao.component.html',
  styleUrls: ['./nova-transacao.component.scss'],
})
export class NovaTransacaoComponent implements OnInit {
  formulario: FormGroup;
  tipoFormulario: FormGroup;
  placeholderNome = "Insira o nome do produto ou serviço";
  nomeLabel = "Nome do produto/serviço";
  dataLabel = "Data de Compra";
  parcelamento: any[];
  isLoading: boolean = false;
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
    this.parcelamento = [];
    this.formulario = this.setupForm(false);
    this.tipoFormulario = this.form.group({
      tipoTransacao: new FormControl('despesa', [Validators.required])
    });
  }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.params['id'] != '') {
      const id = this.activatedRoute.snapshot.params['id'];
      this.transacaoService.getDadosTransacao(id).subscribe((res: any) => {
        this.edicaoTransacao = {
          edicao: res.tipo == 'despesa' ? true : false,
          id: id,
          tipo: res.tipo,
        };

        this.dadosEdicao = res;
        this.formulario = this.setupForm(this.edicaoTransacao.edicao);
        this.toggleForm();
      });
    }
    this.construirParcelas();
  }

  setupForm(edicao: boolean, tipoFormulario?: string) {
    let formulario;
    if (edicao) {
      if (tipoFormulario == 'despesa') {
        formulario = this.form.group({
          nomeItem: new FormControl(this.dadosEdicao.nome, [Validators.required]),
          valor: new FormControl(this.dadosEdicao.valor, [
            Validators.required,
            Validators.min(0.01),
          ]),
          parcelas: this.dadosEdicao.parcelas,
          dataCompra: new FormControl(this.dadosEdicao.data, [
            Validators.required,
            Validators.minLength(10),
          ]),
          comentario: this.dadosEdicao.comentario,
          recorrente: this.dadosEdicao.recorrente
        });
      } else {
        formulario = this.form.group({
          nomeItem: new FormControl(this.dadosEdicao.nome, [Validators.required]),
          valor: new FormControl(this.dadosEdicao.valor, [
            Validators.required,
            Validators.min(0.01),
          ]),
          dataCompra: new FormControl(this.dadosEdicao.data, [
            Validators.required,
            Validators.minLength(10),
          ]),
          comentario: this.dadosEdicao.comentario,
          recorrente: this.dadosEdicao.recorrente
        });
      }
    } else {
      formulario = this.form.group({
        nomeItem: new FormControl('', [Validators.required]),
        valor: new FormControl(0, [Validators.required, Validators.min(0.01)]),
        parcelas: 1,
        dataCompra: new FormControl(moment(new Date()).format('DD/MM/YYYY'), [
          Validators.required,
          Validators.minLength(10),
        ]),
        comentario: '',
        recorrente: false
      });
    }

    return formulario;
  }

  toggleForm() {
    if (this.formulario.get('recorrente')?.value) {
      this.formulario.get('parcelas')?.setValue(0);
      this.formulario.get('parcelas')?.disable();
    } else {
      this.formulario.get('parcelas')?.setValue(1);
      this.formulario.get('parcelas')?.enable();
    }
  }

  construirParcelas() {
    this.parcelamento.push({ parcelas: 1, nome: 'A vista' });
    for (let i = 1; i < 12; i++) {
      this.parcelamento.push({ parcelas: i + 1, nome: i + 1 + ' parcelas' });
    }
  }

  cadastrarDespesa() {
    if (this.formulario.valid) {
      this.isLoading = true;
      let despesa: Transacao = {
        nome: this.formulario.get('nomeItem')?.value,
        valor: this.formulario.get('valor')?.value,
        data: this.formulario.get('dataCompra')?.value,
        parcelas: this.formulario.get('parcelas')?.value,
        tipo: 'despesa',
        recorrente: this.formulario.get('recorrente')?.value,
        comentario:
          this.formulario.get('comentario')?.value != ''
            ? this.formulario.get('comentario')?.value
            : null,
      };

      if (this.edicaoTransacao.tipo) {
        despesa.id = this.edicaoTransacao.id;
        this.transacaoService.editarDadosTransacao(despesa).subscribe(() => {
          this.resetForm();
          setTimeout(() => {
            this.isLoading = false;
          }, 100);
        });
      } else {
        this.transacaoService.addNovaTransacao(despesa).subscribe(() => {
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
    this.formulario.get('nomeItem')?.setValue('');
    this.formulario.get('valor')?.setValue(0);
    this.formulario.get('dataCompra')?.setValue(moment(new Date()).format('DD/MM/YYYY'));
    this.formulario.get('parcelas')?.setValue(1);
    this.formulario.get('comentario')?.setValue('');
    this.formulario.get('recorrente')?.setValue(false);
    this.formulario.markAsUntouched();
    this.formulario.updateValueAndValidity();
  }
}
