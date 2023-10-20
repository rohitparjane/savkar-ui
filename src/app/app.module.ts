import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
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
import { TokenInterceptor } from './token.interceptor';
import { AppHeaderComponent } from './LogOut/logout.component';
import { PaymentComponent } from './payment/payment.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ClientsComponent,
    RegistrationComponent,
    PopupComponent,
    DelPopComponent,
    AppHeaderComponent,
    PaymentComponent
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
  providers: [
    { provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor, // Use your interceptor class
      multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }