import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule, MatIconModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {

  isMenuOpen = false; 

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen; // Toggle the state
  }
  


}
