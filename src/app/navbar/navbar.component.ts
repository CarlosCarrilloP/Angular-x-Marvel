import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, MatToolbarModule, RouterModule ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})


export class NavbarComponent {
  constructor(private router: Router) {}

  ngAfterViewInit() {
    window.addEventListener('scroll', this.handleScroll);
    this.handleScroll(); // Llamar a la función una vez para establecer el estado inicial

    // Suscribirse al evento NavigationEnd
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.handleScroll(); // Llamar a la función cada vez que cambia la ruta
      }
    });
  }
  
  handleScroll = () => {
    const navbar = document.querySelector('mat-toolbar');
    const headerSection = document.getElementById('header');

    if (navbar && headerSection) {
      const headerBottom = headerSection.offsetHeight;
      const scrollPosition = window.scrollY;
      const isInHeader = scrollPosition <= headerBottom;

      if (isInHeader || scrollPosition === 0) {
        navbar.classList.add('colored-background');
      } else {
        navbar.classList.remove('colored-background');
      }
    }
  }
  
  ngOnDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  }
}
