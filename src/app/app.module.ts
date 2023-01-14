//Componentes
import { NovaTransacaoComponent } from './components/nova-transacao/nova-transacao.component';
import { SobreComponent } from './components/sobre/sobre.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExtratoMesComponent } from './components/extrato/extrato-mes/extrato-mes.component';
import { ExtratoComponent } from './components/extrato/extrato.component';
import { ExtratoDiaComponent } from './components/extrato/extrato-mes/extrato-dia/extrato-dia.component';

import { MaterialBaseModule } from './material-base.module';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxMaskModule } from 'ngx-mask'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule, FlexModule } from '@angular/flex-layout';
import { FiltroExtratoComponent } from './components/filtro-extrato/filtro-extrato.component';
import { ConfirmarExclusaoComponent } from './components/modals/confirmar-exclusao/confirmar-exclusao.component';


@NgModule({
  declarations: [
    AppComponent,
    NovaTransacaoComponent,
    SobreComponent,
    ExtratoComponent,
    ExtratoMesComponent,
    ExtratoDiaComponent,
    FiltroExtratoComponent,
    ConfirmarExclusaoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialBaseModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexModule,
    FlexLayoutModule,
    NgxMaskModule.forRoot()

  ],
  exports: [
    FormsModule,
    MaterialBaseModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
