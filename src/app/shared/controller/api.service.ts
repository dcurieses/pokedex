import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon } from '../model/pokemon.models';

@Injectable({ providedIn: 'root' })
export class ApiRestService {
  private static readonly BASE_URI = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) {} // inyectamos el servicio HttpClient

  // GET all pokemons
  getAllPokemons(): Observable<HttpResponse<any>> {
    let url = ApiRestService.BASE_URI + '?limit=5000';
    return this.http.get<any>(url, { observe: 'response' });
  }

  // GET pokemons/{name}
  getPokemon(name: String): Observable<HttpResponse<any>> {
    let url = ApiRestService.BASE_URI + '/' + name;
    return this.http.get<any>(url, { observe: 'response' });
  }
}
