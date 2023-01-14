import { Transacao } from '../../models/transacao.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TransacaoService } from 'src/app/services/transacoes/transacao.service';
import { UtilService } from '../../services/shared/util.service';
import * as moment from 'moment';


@Component({
  selector: 'app-nova-transacao',
  templateUrl: './nova-transacao.component.html',
  styleUrls: ['./nova-transacao.component.scss'],
})
export class NovaTransacaoComponent implements OnInit {
  placeholderNome = "Insira o nome do produto ou serviço";
  nomeLabel = "Nome do produto/serviço";
  dataLabel = "Data de Compra";

  formulario: FormGroup;
  parcelamento: {
    nome: string,
    parcelas: number,
  }[] = [];

  isLoading: boolean = false;
  idEdicao: string | null = null;

  constructor(
    private transacaoService: TransacaoService,
    private utilService: UtilService
  ) {
    this.parcelamento.push({ parcelas: 1, nome: 'A vista' });
    for (let i = 2; i <= 12; i++) {
      this.parcelamento.push({ parcelas: i, nome: i + ' parcelas' });
    }

    this.formulario = this.transacaoService.buildTransacaoForm(this.transacaoService.getNovaTransacaoModel());
    this.utilService.changeEmitted$.subscribe(id => {
      this.getDadosParaEdicao(id);
    });
  }

  ngOnInit(): void { }

  getDadosParaEdicao(id: string): void {
    this.transacaoService.getDadosTransacaoById(id).subscribe((response: Transacao) => {
      this.resetForm();
      this.formulario = this.transacaoService.buildTransacaoForm(response);
      this.toggleForm();
      this.idEdicao = id;
    });
  }

  toggleForm(): void {
    if (this.formulario.get("recorrente")?.value) {
      this.formulario.get('parcela')?.disable();
      this.formulario.get('parcela')?.setValue(1);
      return;
    }
    
    this.formulario.get('parcela')?.enable();
  }

  cadastrarTransacao(): void {
    if (this.formulario.valid) {
      this.isLoading = true;

      const transacaoModel: Transacao = {
        id :           this.idEdicao,
        dataTransacao: this.formulario.get('dataTransacao')?.value,
        tipoTransacao: this.formulario.get('tipoTransacao')?.value,
        recorrente:    this.formulario.get('recorrente')?.value,
        parcelas:      this.formulario.get("parcela")?.value,
        descricao:     this.formulario.get('descricao')?.value,
        valor:         this.formulario.get('valor')?.value,
        comentario:    this.formulario.get('comentario')?.value
      };

      console.log(transacaoModel);

      this.transacaoService.salvar(transacaoModel).subscribe((response: any) => {
        this.resetTransacao();
      }, (erro: any) => {
        this.resetTransacao()
        console.log("Erro ao salvar transação.\nMensagem: " + erro)
      })
    } else {
      this.formulario.markAllAsTouched();
    }
  }

  resetTransacao(): void {
    this.resetForm();
    this.idEdicao = null;
    setTimeout(() => {
      this.utilService.emitChange('atualizar');
      this.isLoading = false;
    }, 1000);
  }

  resetForm(): void {
    this.formulario.get('descricao')?.setValue('');
    this.formulario.get('valor')?.setValue(0);
    this.formulario.get('dataCompra')?.setValue(moment(new Date()).format('DD/MM/YYYY'));
    this.formulario.get('parcela')?.setValue(1);
    this.formulario.get('comentario')?.setValue('');
    this.formulario.get('recorrente')?.setValue(false);
    this.formulario.get('tipoTransacao')?.setValue('despesa')
    this.formulario.markAsUntouched();
    this.formulario.updateValueAndValidity();
  }
}
