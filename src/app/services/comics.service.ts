import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComicsService {

  constructor(private http: HttpClient) { }

  getComics(characterId: string): Observable<any> {
    const apiUrl = `https://gateway.marvel.com/v1/public/characters/${characterId}/comics?ts=patata&apikey=9263312e28ad77e040f9f5e3d6c8e4f6&hash=b0d6d2f464be8a623d2dbe8e4993fd63`;
    return this.http.get(apiUrl);
  }
}