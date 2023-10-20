// app-header.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class AppHeaderComponent {
  constructor(private router: Router) {}

  logout() {
    // Clear user session, remove token from local storage, etc.
    // For example:
    localStorage.removeItem('token');
    
    // Redirect to the login page
    this.router.navigate(['/login']);
  }
}
