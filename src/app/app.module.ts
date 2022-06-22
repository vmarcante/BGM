//Componentes
import { NovaDespesaComponent } from './home/nova-despesa/nova-despesa.component';
import { NovaReceitaComponent } from './home/nova-receita/nova-receita.component';
import { SobreComponent } from './sobre/sobre.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ExtratoMesComponent } from './extrato/extrato-mes/extrato-mes.component';
import { ExtratoComponent } from './extrato/extrato.component';

import { MaterialBaseModule } from './material-base.module';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxMaskModule } from 'ngx-mask'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NovaDespesaComponent,
    NovaReceitaComponent,
    SobreComponent,
    ExtratoComponent,
    ExtratoMesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialBaseModule,
    BrowserAnimationsModule,
    HttpClientModule,
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
