import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { ClientsComponent } from './Clients/clients.component';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [{ path: '', component: AppComponent },
{ path: 'login', component: LoginComponent },
{path:'clients',component: ClientsComponent},
{path:'register',component: RegistrationComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
