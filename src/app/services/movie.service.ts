import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Movie } from '../models/movie.model';

// Injectable significa que la clase puede ser inyectada en otras clases
@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }


  listar(): Observable<Movie[]>{
    return this.http.get<Movie[]>(`${environment.url_ms_cinema}/movies`);
  }

  view(id: number): Observable<Movie>{
    return this.http.get<Movie>(`${environment.url_ms_cinema}/movies/${id}`);
  }

  create(theMovie: Movie): Observable<Movie>{
    // Se elimina el id para que el backend lo genere
    delete theMovie.id;
    return this.http.post<Movie>(`${environment.url_ms_cinema}/movies`, theMovie);
  }

  update(theMovie: Movie): Observable<Movie>{
    return this.http.put<Movie>(`${environment.url_ms_cinema}/movies/${theMovie.id}`, theMovie);
  }

  delete(id: number) {
    return this.http.delete<Movie>(`${environment.url_ms_cinema}/movies/${id}`);
  }
}
