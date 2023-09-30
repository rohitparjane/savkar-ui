import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ClientsComponent } from './Clients/clients.component';
import { RouterModule } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PopupComponent } from './AddClient/popup.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DelPopComponent } from './del-pop/del-pop.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ClientsComponent,
    RegistrationComponent,
    PopupComponent,
    DelPopComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, // Add this line
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot([]),
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

