import { Component } from '@angular/core';
import { HeroService } from '../services/hero.service';
import { NgFor } from '@angular/common';
import { HEROES } from '../mock-heroes';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

export interface Hero {
  id: number;
  name: string;
}

@Component({
  selector: 'app-hero-search-component',
  standalone: true,
  imports: [NgFor, FormsModule, RouterModule],
  templateUrl: './hero-search-component.component.html',
  styleUrl: './hero-search-component.component.css'
})
export class HeroSearchComponentComponent {
   searchWord: string = '';
   heroes = HEROES;

   searchHeroes(): void {
    if (this.searchWord.length >= 3) {
      this.heroes = HEROES.filter(hero => hero.name.includes(this.searchWord));
    } 
  }
  
}
