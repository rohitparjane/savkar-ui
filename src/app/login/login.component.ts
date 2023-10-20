// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent {
//   username = '';
//   password = '';

//   login() {
//     // Replace this with your authentication logic
//     if (this.username === 'user' && this.password === 'password') {
//       // Successful login logic (e.g., navigate to a different page)
//       console.log('Login successful');
//     } else {
//       // Failed login logic (e.g., display an error message)
//       console.error('Login failed');
//     }
//   }}

// }

import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  authentication: boolean |null=null;
  userDetails: any;
  userName!:String;
  constructor(private authService: AuthService, private router: Router,) {}
  

  login(userName: string, password: string): void {
    this.authService.login(userName, password).subscribe(
      Response => {
        // Save the token in localStorage

         localStorage.setItem('token', Response.jwt);
        console.log(Response.jwt);
        console.log('Authentication successful');
          this.authentication =true;

          this.authService.getUser(userName).subscribe(
            userDetails=>{
              console.log('User Fetched');
              this.userDetails = userDetails;
              this.userName=userName;
            },
            (error) => {
              console.error('Error:', error);}
          )
        // if(response==true){
        //   console.log('Authentication successful');
        //   this.authentication =true;

        //   this.authService.getUser(userName).subscribe(
        //     userDetails=>{
        //       console.log('User Fetched');
        //       this.userDetails = userDetails;
        //       this.userName=userName;
        //     }
        //   )

        // }else{
        //   console.error('Authentication failed');
        //   this.authentication=false;
        // }
       
        // Redirect the user to the home page or perform any other actions
      },
      error => {
        console.error('Authentication failed', error);
        this.authentication=false;
        // Display an error message to the user
      }
    );
  }
  navigateToNewPage(): void {
    // Use the router to navigate to the new page (replace 'new-page' with the actual route)
    
    this.router.navigate(['/clients'],{
    //  queryParams: { userDetails: JSON.stringify(this.userDetails) } 
    queryParams:{userName :this.userName}
  });
  }
  // navigateToRegister():void{
  //   this.router.navigate(['/register'])
  // }
}

