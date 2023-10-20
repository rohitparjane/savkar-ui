import { Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Record } from './payment.model';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  clName!: string;
  clMobile!:string;
  clAmount!: number ;
  records: Record[] = [];
  amount!:number;
  amount1!:number;

  constructor(private route: ActivatedRoute,
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<PaymentComponent>
   ) {}

   ngOnInit() {
    console.log("hi in payment")
    if (this.data && this.data.clName&&this.data.clMobile&&this.data.clAmount) {
      this.clName = this.data.clName;
      this.clMobile = this.data.clMobile;
      this.clAmount=this.data.clAmount
      console.log(this.clName);
      console.log("hi in payment2")
      // Make your API request using this.clName
      this.freshData();
    }
  }
  freshData(){
    this.authService.getHistory(this.clName).subscribe((data) => {    
      this.clAmount=data.totalAmount;
      if (data.entries !== null ){
      this.records=data.entries;}
      console.log(this.data);
      console.log("hi in record",this.records);
    });
  }

  // freshData(){
  //   this.authService.getHistory(this.clName).subscribe((data: Record[]) => {
  //     this.records = data;
  //     console.log(this.records);
  //   });
  // }

  insertEntry(state:string){
        if(state==='got'){          
          this.amount= -this.amount;
          console.log("in entry got",this.amount)
        }
        this.authService.insertEntry(this.clName,this.amount).subscribe(
          response=>{             
              console.log("in entry success")
              this.amount=this.amount1;
              this.freshData();
          }
        )
  }

  deleteEntry(srNo: number,hiAmount:number){
         console.log(srNo,this.clName,hiAmount)
         this.authService.deleteEntry(srNo,this.clName,hiAmount).subscribe(
          response=>{
            console.log("ClientDeleted")
            this.freshData();
          }
         )
  }

  close(){
    this.dialogRef.close();
   }
  

}
