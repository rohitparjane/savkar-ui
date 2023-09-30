import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-del-pop',
  templateUrl: './del-pop.component.html',
  styleUrls: ['./del-pop.component.css']
})
export class DelPopComponent {
  constructor(private dialogRef: MatDialogRef<DelPopComponent>){}

   delete(){
    this.dialogRef.close({ success: true });
   }

   cancel(){
    this.dialogRef.close({ success: false });
   }
}
