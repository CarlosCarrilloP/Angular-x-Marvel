import { Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CharacterListComponent } from './character-list/character-list.component';
import { CharacterDetailsComponent } from './character-details/character-details.component';

export const routes: Routes = [
    {path: 'characters', component: CharacterListComponent},
    {path: 'characters/:id', component: CharacterDetailsComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: '**', redirectTo: 'dashboard'}
];
