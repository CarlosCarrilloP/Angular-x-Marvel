import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { FormsModule } from '@angular/forms';
import { MessagesComponent } from './messages/messages.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import { NavbarComponent } from "./navbar/navbar.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet, MatButtonModule, HeroesComponent, FormsModule, MessagesComponent, HttpClientModule, RouterModule, NavbarComponent]
})

export class AppComponent {
  title = 'Tour Of Marvel';
}
