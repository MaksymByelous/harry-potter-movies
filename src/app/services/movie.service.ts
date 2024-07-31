import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MovieDetails, Movies } from '../models/movie';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private moviesApiUrl = '/movies';
  private httpClient = inject(HttpClient);

  getMovies(): Observable<Movies> {
    return this.httpClient.get<Movies>(this.moviesApiUrl);
  }

  getMovieDetails(id: string): Observable<MovieDetails> {
    return this.httpClient.get<MovieDetails>(`${this.moviesApiUrl}/${id}`);
  }
}
