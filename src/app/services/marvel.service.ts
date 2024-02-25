import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { MarvelResponse } from '../MarvelResponse';
import { Marvel } from '../marvel';

@Injectable({
  providedIn: 'root'
})
export class MarvelService {

  constructor(private http: HttpClient) { }

  getMarvelCharacters(numberOfHeroesToShow: number): Observable<Marvel[]> {
    const publicKey = '9263312e28ad77e040f9f5e3d6c8e4f6';
    const apiUrl = 'https://gateway.marvel.com/v1/public/characters';
    const timestamp = 'patata';
    const apiKey = '9263312e28ad77e040f9f5e3d6c8e4f6';
    const hash = 'b0d6d2f464be8a623d2dbe8e4993fd63';
    const limit = '20'; // Limitamos a 20 resultados por página

    // Cálculo de un offset aleatorio
    const offset = Math.floor(Math.random() * 1544); // El total de personajes es 1564, por lo que el offset máximo es 1544

    const fullUrl = `${apiUrl}?ts=${timestamp}&apikey=${apiKey}&hash=${hash}&limit=${limit}&offset=${offset}`;

    return this.http.get<MarvelResponse>(fullUrl).pipe(
      map(response => {
        const results = response.data.results;

        // Barajar los resultados
        for (let i = results.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [results[i], results[j]] = [results[j], results[i]];
        }

        // Obtener los primeros 20 personajes barajados
        const randomHeroes = results.slice(0, numberOfHeroesToShow).map((result: { id: number; name: string; thumbnail: { path: string; extension: string; }; }) => ({
          id: result.id,
          name: result.name,
          thumbnail: result.thumbnail.path + '/detail.' + result.thumbnail.extension
        }));

        return randomHeroes;
      })
    );
  }


  searchMarvelCharacters(name: string): Observable<Marvel[]> {
    const publicKey = '9263312e28ad77e040f9f5e3d6c8e4f6';
    const apiUrl = 'https://gateway.marvel.com/v1/public/characters';

    // Parámetros de la petición
    const params = new HttpParams()
      .set('ts', 'patata')
      .set('apikey', publicKey)
      .set('hash', 'b0d6d2f464be8a623d2dbe8e4993fd63')
      .set('nameStartsWith', name);

    return this.http.get<MarvelResponse>(apiUrl, { params })
      .pipe(
        map(response => {
          const results = response.data.results;

          return results.map((result: { id: number; name: string; thumbnail: { path: string; extension: string; }; }) => ({
            id: result.id,
            name: result.name,
            thumbnail: result.thumbnail.path + '/standard_fantastic.' + result.thumbnail.extension
          }));
        })
      );
  }
}