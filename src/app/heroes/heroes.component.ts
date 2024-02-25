import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { UpperCasePipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HEROES } from '../mock-heroes';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
import { HeroService } from '../services/hero.service';
import { MessageService } from '../services/message.service';
import { HeroSearchComponentComponent } from '../hero-search-component/hero-search-component.component';

@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [UpperCasePipe, NgFor, NgIf, FormsModule, HeroSearchComponentComponent],
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
  providers: [HeroService]
})
export class HeroesComponent implements OnInit {
  heroes: Hero[]= [];

  getHeroes(): void {
    this.heroService.getHeroes()
        .subscribe(heroes => this.heroes = heroes);
  }

  selectedHero?:Hero;

  constructor(
    private heroService: HeroService, 
    private messageService: MessageService
  ) { };


  public ngOnInit(): void {
    this.heroService.getHeroes().subscribe(heroes=>{
      this.heroes = heroes;
    });
    }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.messageService.add(`HeroesComponent: Selected hero id = ${ hero.id }`);
  }
}