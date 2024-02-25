import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Character } from '../character';
import { ApiResponse, ApiResponse2 } from '../apiResponse';
import { Marvel } from '../marvel';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-character-details',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './character-details.component.html',
  styleUrl: './character-details.component.css',

})
export class CharacterDetailsComponent {
  character: Character | undefined;
  imageLoaded: boolean = false;
  sliderOpen: boolean = false;
  showMore: boolean = false;
  limit: number = 21;
  seriesCharacters: any[] = [];

  comicsCharacters: { name: string, thumbnail: string }[] = [];
  showMore2: boolean = false;
  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    
    const characterId = this.route.snapshot.paramMap.get('id');
    if (characterId) {
      this.getCharacter(characterId);
      this.getComics(characterId);
    } else {

      console.error('No se proporcionó un ID de personaje válido en la URL.');
    }
  }

  getCharacter(id: string) {
    const apiUrl = `https://gateway.marvel.com/v1/public/characters/${id}?ts=patata&apikey=9263312e28ad77e040f9f5e3d6c8e4f6&hash=b0d6d2f464be8a623d2dbe8e4993fd63`;
    this.http.get<ApiResponse>(apiUrl).subscribe(response => {
      this.character = {
        id: response.data.results[0].id,
        name: response.data.results[0].name,
        comics: response.data.results[0].comics.available,
        series: response.data.results[0].series.available,
        thumbnail: response.data.results[0].thumbnail.path + '.' + response.data.results[0].thumbnail.extension,
        description: response.data.results[0].description,
      };
      this.getComics(response.data.results[0].id.toString()).subscribe(comicsResponse => {
        this.processResponse(comicsResponse);
      });
      this.getSeries(response.data.results[0].id.toString()).subscribe(seriesResponse => {
        this.processSeriesResponse(seriesResponse);
      });
    });
  }
  
  getComics(characterId: string): Observable<ApiResponse2> {
    const apiUrl = `https://gateway.marvel.com/v1/public/characters/${characterId}/comics?ts=patata&apikey=9263312e28ad77e040f9f5e3d6c8e4f6&hash=b0d6d2f464be8a623d2dbe8e4993fd63&limit=${this.limit}`;
    return this.http.get<ApiResponse2>(apiUrl);
  }
  getSeries(characterId: string): Observable<ApiResponse2> {
    const apiUrl = `https://gateway.marvel.com/v1/public/characters/${characterId}/series?ts=patata&apikey=9263312e28ad77e040f9f5e3d6c8e4f6&hash=b0d6d2f464be8a623d2dbe8e4993fd63&limit=${this.limit}`;
    return this.http.get<ApiResponse2>(apiUrl);
  }
  processSeriesResponse(response: ApiResponse2) {
    this.seriesCharacters = response.data.results.map((result: any) => {
      return {
        name: result.title,
        thumbnail: result.thumbnail.path + '.' + result.thumbnail.extension
      };
    });
  }
  
  
  processResponse(response: ApiResponse2) {
    this.comicsCharacters = response.data.results.map((result: any) => {
      return {
        name: result.title,
        thumbnail: result.thumbnail.path + '.' + result.thumbnail.extension
      };
    });
  }
  
  
  
  imageLoad() {
    this.imageLoaded = true;
  }

  toggleSlider() {
    this.sliderOpen = !this.sliderOpen;
  }
  toggleShowMore() {
    this.showMore = !this.showMore;
    console.log(this.showMore);
  }

  toggleShowMore2() {
    this.showMore2 = !this.showMore2;
    console.log(this.showMore2);
  }
}