import { Component, Inject, Input } from '@angular/core';
import { AuthService } from '../auth.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-popup-Popup2',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent {
  // @Input()
  // response!: String;
  // constructor() {
  //   console.log('Message in PopupComponent:', this.response);
  // }
  check!:String;
  @Input()
   userName!:String
  constructor(private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private dialogRef: MatDialogRef<PopupComponent>) {
    this.userName = data.userName;
    console.log('Message in PopupComponent:', this.userName);
  }
   
  
  addClient(clName:String,mobileNumber:String,clAmount:String){
    this.authService.addClient(clName,clAmount,mobileNumber,this.userName).subscribe(
      response=>{
        if(response=='Client Added Successfully'){
           console.log("Success")
           this.dialogRef.close({ success: true });
        }
      },
        error=>{
            console.error("Failed",error)
            this.check="Error"
        }
    )
  }
  
 }
  
  

