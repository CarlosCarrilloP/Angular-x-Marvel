import { Component, OnInit, ElementRef } from '@angular/core';

import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule, NgFor } from '@angular/common';
import { Marvel } from '../marvel';
import { MarvelService } from '../services/marvel.service';
import { FormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { filter } from 'rxjs/operators';






@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  imports: [CommonModule, RouterModule, NgFor, FormsModule, MatInputModule, MatCardModule]
})
export class DashboardComponent implements OnInit {

  heroes: Marvel[] = [];
  characters: Marvel[] = [];
  filteredHeroes: Marvel[] = [];
  filteredCharacters: Marvel[] = [];
  searchTerm: string = '';


  constructor(private marvelService: MarvelService, private el: ElementRef, private elRef: ElementRef,private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getMarvelData();

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      window.scrollTo(0, 0);
    });


  }

  getMarvelData() {

    this.marvelService.getMarvelCharacters(20).subscribe(characters => {
      this.characters = characters;
      this.filteredCharacters = characters;
    });
  }

  search() {
    if (this.searchTerm.trim() !== '') {
      this.marvelService.searchMarvelCharacters(this.searchTerm)
        .pipe(debounceTime(600))
        .subscribe(characters => {
          this.filteredCharacters = characters;
        });

      this.filteredHeroes = this.heroes.filter(hero =>
        hero.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredHeroes = this.heroes;
      this.marvelService.getMarvelCharacters(30)
        .pipe(debounceTime(600))
        .subscribe(characters => {
          this.filteredCharacters = characters;
        });
    }
  }


  
  scrollToContent() {
    const targetId = 'content'; 
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      const scrollTo = targetElement.offsetTop;
      const duration = 15000; 
      window.scrollTo({ top: scrollTo, behavior: 'smooth' });
    }
  }
  
  
}