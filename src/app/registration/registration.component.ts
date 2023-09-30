import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../AddClient/popup.component';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  response ! :String;
  constructor(private authService: AuthService,private dialog: MatDialog){} 

  register(userName:String,password:String,emailId:String,mobileNumber:String){
    this.authService.register(userName,password,emailId,mobileNumber).subscribe(
      response =>{
        if (response === 'User Id Already Present') {
          console.log('Response:', response);
          this.response=response;
         this.openSuccessPopup(response);
        
        }

      },
      error=>{
        console.error('Failed');
        console.error('Error:',error);
        

      }
    );
  }

  openSuccessPopup(response:String): void {
    this.dialog.open(PopupComponent, {
      data: {response}
    });
  }

}
