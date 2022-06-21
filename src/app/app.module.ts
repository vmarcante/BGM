import { MaterialBaseModule } from './material-base.module';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DespesaRapida } from './home/despesa-rapida/despesa-rapida.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DespesaRapida
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialBaseModule,
    BrowserAnimationsModule,
  ],
  exports: [
    FormsModule,
    MaterialBaseModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
