import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-del-pop',
  templateUrl: './del-pop.component.html',
  styleUrls: ['./del-pop.component.css']
})
export class DelPopComponent {
  message!:String;
  message1!:String;

  constructor(private dialogRef: MatDialogRef<DelPopComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any 
    ){}

   
     ngOnInit(){
      if(this.data&&this.data.response){
        this.message1='register'
      }
      if(this.data && this.data.clAmount > 0){
        console.log(this.data.clAmount)
          this.message='Client is not Settled, want to '
      }
     }
      
   delete(){
    this.dialogRef.close({ success: true });
   }

   cancel(){
    this.dialogRef.close({ success: false });
   }
}
