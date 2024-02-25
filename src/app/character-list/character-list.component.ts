import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MarvelApiResponse, MarvelApiResponse2 } from '../MarvelApiResponse';
import { Character2 } from '../character';

@Component({
  selector: 'app-character-list',
  standalone: true,
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css'],
  imports: [CommonModule, RouterModule, MatPaginatorModule, MatListModule],
})
export class CharacterListComponent implements OnInit {
  characterslist: Character2[] = [];
  totalCharacters: number = 0;
  pageSize: number = 21;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const page = +params['page'] || 1;
      this.getCharacters(page);
    });
  }

  getCharacters(page: number) {
    const offset = (page - 1) * this.pageSize;
    const apiUrl = `https://gateway.marvel.com/v1/public/characters?ts=patata&apikey=9263312e28ad77e040f9f5e3d6c8e4f6&hash=b0d6d2f464be8a623d2dbe8e4993fd63&limit=${this.pageSize}&offset=${offset}`;
  
    this.http.get<MarvelApiResponse2>(apiUrl)
      .subscribe(response => {
        // Mapear los datos recibidos a la interfaz Character2
        this.characterslist = response.data.results.map((result: any) => ({
          id: result.id,
          name: result.name,
          comics: result.comics,
          series: result.series,
          thumbnail: result.thumbnail,
          description: result.description
        }));
        this.totalCharacters = response.data.total;
      });
  }

  onPageChange(event: PageEvent) {
    const nextPage = event.pageIndex + 1;
    this.router.navigate([], { queryParams: { page: nextPage } });
    this.getCharacters(nextPage);
    if (this.paginator) {
      this.paginator.pageIndex = event.pageIndex;
    }
  }
}
