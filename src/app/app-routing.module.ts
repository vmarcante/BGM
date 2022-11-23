import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SobreComponent } from './sobre/sobre.component';
import { ExtratoComponent } from './extrato/extrato.component';

const routes: Routes = [
  {path: 'transacao', redirectTo: 'transacao/', pathMatch: 'full'},
  {path: '', redirectTo: 'transacao/', pathMatch: 'full'},
  {path: 'sobre', component: SobreComponent},
  {path: 'extrato', component: ExtratoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
