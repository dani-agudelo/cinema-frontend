import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Theater } from '../models/theater.model';

// El decorador @Injectable() se utiliza para marcar una clase como disponible para ser inyectada como 
//dependencia en otras clases.
@Injectable({
  providedIn: 'root'
})

export class TheaterService {

  constructor(private http: HttpClient) { }

  //Un Observable es una función que puede enviar múltiples valores a lo largo del tiempo. 
  //Se puede suscribir a un Observable para recibir estos valores a medida que se emiten
  listar(): Observable<Theater[]> {
    return this.http.get<Theater[]>(`${environment.url_ms_cinema}/theaters`);
  }

  //View es para ver un solo registro de theater
  view(id: number): Observable<Theater>{
    return this.http.get<Theater>(`${environment.url_ms_cinema}/theaters/${id}`);
  }

  //create es para crear un nuevo registro de theater, le pasamos el objeto theTheater y retorna un observable de tipo
  // Theater con el nuevo registro
  create(theTheater: Theater): Observable<Theater>{
    return this.http.post<Theater>(`${environment.url_ms_cinema}/theaters`, theTheater);
  }

  update(theTheater: Theater): Observable<Theater>{
    return this.http.put<Theater>(`${environment.url_ms_cinema}/theaters/${theTheater.id}`, theTheater);
  }

  delete(id: number) {
    return this.http.delete<Theater>(`${environment.url_ms_cinema}/theaters/${id}`,
    );
  }
}

