import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../AddClient/popup.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DelPopComponent } from '../del-pop/del-pop.component';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  response ! :String;
  registrationForm: FormGroup;
  otpStatus: boolean=false;
  buttonColorClass:String='gray-button';
   emailId!: string;
   otpValid:boolean=false;
   invalidOtp:boolean=false;
   //countdown
   otpInput: string = ''; // Initialize OTP input value
   isOtpInputDisabled: boolean = false; // To control input box disable
   countdown: number = 30; // Countdown timer value in seconds
   countdownTimer: any; // Timer reference

  constructor(private authService: AuthService,private dialog: MatDialog,private fb: FormBuilder){
     this.registrationForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.email]], // Add email validation
      mobileNumber: ['', Validators.required],
      otp:['',[Validators.required,Validators.pattern('^[0-9]*$')]]
    });
  }

   

//  register(userName:String,password:String,emailId:String,mobileNumber:String){
  register(){console.log("register")
  console.log(this.registrationForm);
  console.log(this.registrationForm.get('userName')?.valid); 
  console.log(this.registrationForm.get('password')?.valid);
  console.log(this.registrationForm.get('emailId')?.valid); 
  console.log(this.registrationForm.get('mobileNumber')?.valid);   
  console.log('Form Valid:', this.registrationForm.valid);
    if (this.registrationForm.valid){
    const { userName, password, emailId, mobileNumber } = this.registrationForm.value;
    this.authService.register(userName,password,this.emailId,mobileNumber).subscribe(
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
}

  openSuccessPopup(response:String): void {
    this.dialog.open(DelPopComponent, {
      data: {response}
    });
  }

  sendOtp(emailId:string){
    this.emailId=emailId
     console.log(emailId)
     this.authService.sendOtp(emailId).subscribe(
      response=>{this.otpStatus=true});
      this.otpValid=false
      this.isOtpInputDisabled = true;
      this.registrationForm.get('emailId')?.disable();
      this.invalidOtp=false


    // Start the countdown timer
    this.countdown = 30; // Reset the countdown value
    this.startCountdownTimer();
  }

  validateOtp(otp: number){
    console.log(this.emailId)
    console.log(otp)
    this.authService.validateOtp(this.emailId,otp).subscribe(
      response=>{if(response===true){
             console.log(response)
             this.otpValid=true
             this.otpStatus=false
             clearInterval(this.countdownTimer);
             this.isOtpInputDisabled = false;
             this.registrationForm.get('emailId')?.disable();
             
             
      }
    else{console.log(response)
      this.invalidOtp=true
      
    }},
      error=>{
        console.error('Failed');
        console.error('Error:',error);
        

      }
    )
  }
  
  startCountdownTimer() {
    this.countdownTimer = setInterval(() => {
      this.countdown--;

      if (this.countdown <= 0) {
        // Re-enable the input and clear the timer
        this.isOtpInputDisabled = false;
        clearInterval(this.countdownTimer);
        this.registrationForm.get('emailId')?.enable();

      }
    }, 1000); // Update the countdown every second (1000 milliseconds)
  }
}
