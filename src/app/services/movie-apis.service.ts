import { Injectable } from '@angular/core';
import { Observable, switchMap, tap } from 'rxjs';
import { API_KEY, TMDB_BASE_URL } from '../utils/constants';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieApisService {

  constructor(private http: HttpClient) { }
  
  //API to get movie data
  getMovies(year: number, page: number = 1, genreId?: number): Observable<any> {
    const params = {
      api_key: API_KEY,
      sort_by: 'popularity.desc',
      primary_release_year: year.toString(),
      page: page.toString(),
      'vote_count.gte': '100'
    };

    return this.http.get<any>(TMDB_BASE_URL, { params });
  }

  //API to get movie geners
  getGenres(): Observable<any> {
    const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`;
    return this.http.get<any>(url);
  }

}
