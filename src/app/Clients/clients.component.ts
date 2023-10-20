import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "../auth.service";
import { Client } from './clients.model';
import { PopupComponent } from "../AddClient/popup.component";
import { MatDialog } from "@angular/material/dialog";
import { DelPopComponent } from "../del-pop/del-pop.component";
import { PaymentComponent } from "../payment/payment.component";



@Component({
    selector: 'app-login',
    templateUrl: './clients.component.html',
    styleUrls: ['./clients.component.css']
  })
  export class ClientsComponent implements OnInit {
    userName!: string;
    clientDetails:any;
    clients: Client[] = [];
    

   constructor(private route: ActivatedRoute,
                private authService: AuthService ,
                private dialog: MatDialog
               ) {}
  
    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            if (params["userName"]) {
             // this.userDetails = JSON.parse(params["userDetails"])
             this.userName= params["userName"];
              console.log(this.userName)
              this.freshClients();
            
            }
        })
    }

    freshClients(){
        this.authService.getClients(this.userName).subscribe((data: Client[]) => {
            this.clients = data.map(client => ({ ...client, showDetails: false }));
            console.log(this.clients);
        });
    }

    insertClient(){
       const dialogRef= this.dialog.open(PopupComponent, {
            data: {userName:this.userName }
          });
          dialogRef.afterClosed().subscribe(result => {
            console.log("inside close popup")
            // This code will be executed when the dialog is closed.
            if (result && result.success) {
              // The API call was successful, so you can reload the parent page
             // window.location.reload();
             this.freshClients();
            }
          });
         
    }
    deleteClient(client:any,clAmount:String,event:Event){
        event.stopPropagation();
        console.log("in Delete",client)
        console.log("In Delete",this.userName)
        const dialogRef=this.dialog.open(DelPopComponent,{
            data:{clAmount}
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log("inside delete popup")
            // This code will be executed when the dialog is closed.
            if (result && result.success) {
                this.authService.deleteClient(client,this.userName).subscribe(
                response=>{ console.log("Deleted")
                //window.location.reload();
                this.freshClients();
            }
                )
            }else{
                console.log("Cancelled")
            }
          },error=>{
             console.error("Failed to delete",error)
          });
        
    }

    showClientDetails(clName: String,clMobile:String,clAmount:String) {
        // client.showDetails = !client.showDetails;
        const dialogRef=this.dialog.open(PaymentComponent, {
            data:{clName,clMobile,clAmount} // Pass the client data here
          });
          dialogRef.afterClosed().subscribe(response=>{
            this.freshClients();}
          );
      }
      

    
}
