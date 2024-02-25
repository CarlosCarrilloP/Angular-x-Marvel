import { Injectable } from '@angular/core';
import { HEROES } from '../mock-heroes';
import { Hero } from '../hero';
import { MessageService } from '../services/message.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root',
})
export class HeroService {
  //heroes: Hero[] =[];
  //selectedHero?: Hero;
 // heroObservable!: Subscription;
  /*public getHeroe(id: string): Observable<Hero> {
    return this.getHeroes().pipe(
      map(heroes =>{     
      return heroes.find(hero => hero.id === +id); 
      })
    );
  }*/

  constructor(private messageService: MessageService,
    private http: HttpClient) { }

  public getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>("http://localhost/Nueva%20carpeta%20(2)/")
    //const heroes = of(HEROES);
    
  }

  public getHeroe(id: number): Observable<Hero> {
    return this.getHeroes().pipe(
      map(heroes => heroes.find(hero => hero.id === +id) as Hero)
    );
  }
  
}