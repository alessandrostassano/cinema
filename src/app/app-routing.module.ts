import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './containers/homepage/homepage.component';
import { PrenotazioneListComponent } from './containers/prenotazione-list/prenotazione-list.component';
import { PrenotazionePageComponent } from './containers/prenotazione-page/prenotazione-page.component';
import { RegisterFormComponent } from './containers/register-form/register-form.component';

const routes: Routes = [
  {path: "home", component: HomepageComponent},
  {path: "registrati", component: RegisterFormComponent},
  {path: "prenotazione" , component: PrenotazionePageComponent},
  {path: "visualizza", component:PrenotazioneListComponent},
  {path: "", redirectTo:"home", pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
