import { Transacao } from '../../models/transacao.model';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TransacoesService } from 'src/app/services/transacoes/transacoes.service';
import * as moment from 'moment';
import { UtilService } from '../../services/shared/util.service';

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
    private utilService: UtilService
  ) {
    this.parcelamento = [];
    this.formulario = this.setupForm(false);
    this.tipoFormulario = this.form.group({
      tipoTransacao: new FormControl('despesa', [Validators.required])
    });
    this.utilService.changeEmitted$.subscribe(id => {
      this.getDadosParaEdicao(id);
    });
  }

  ngOnInit(): void {
    this.construirParcelas();
  }

  getDadosParaEdicao(id: number) {
    this.transacaoService.getDadosTransacao(id).subscribe((res: any) => {
      this.edicaoTransacao = {
        edicao: res.tipo == 'despesa' || res.tipo == 'receita' ? true : false,
        id: id,
        tipo: res.tipo,
      };

      this.dadosEdicao = res;
      console.log(res);
      this.formulario = this.setupForm(this.edicaoTransacao.edicao);
      this.tipoFormulario = this.form.group({
        tipoTransacao: new FormControl(this.edicaoTransacao.tipo, [Validators.required])
      });
      this.toggleForm();
    });
  }

  setupForm(edicao: boolean) {
    let formulario;
    if (edicao) {
      console.log(this.dadosEdicao.parcelas);
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

  cadastrarTransacao() {
    if (this.formulario.valid) {
      this.isLoading = true;

      let transacao: Transacao = {
        nome: this.formulario.get('nomeItem')?.value,
        valor: this.formulario.get('valor')?.value,
        data: this.formulario.get('dataCompra')?.value,
        tipo: this.tipoFormulario.get('tipoTransacao')?.value,
        recorrente: this.formulario.get('recorrente')?.value,
        comentario:
          this.formulario.get('comentario')?.value != ''
            ? this.formulario.get('comentario')?.value
            : null,
      };

      if (this.tipoFormulario.get('tipoTransacao')?.value == 'despesa') {
        transacao.parcelas = this.formulario.get('parcelas')?.value;
      }

      if (this.edicaoTransacao.tipo) {
        transacao.id = this.edicaoTransacao.id;
        this.transacaoService.editarDadosTransacao(transacao).subscribe(() => {
          this.resetForm();
          setTimeout(() => {
            this.utilService.emitChange('atualizar');
            this.isLoading = false;
          }, 200);
        });
      } else {
        this.transacaoService.addNovaTransacao(transacao).subscribe(() => {
          this.resetForm();
          setTimeout(() => {
            this.utilService.emitChange('atualizar');
            this.isLoading = false;
          }, 200);
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
    this.tipoFormulario.get('tipoTransacao')?.setValue('despesa')
    this.formulario.markAsUntouched();
    this.formulario.updateValueAndValidity();
  }
}
