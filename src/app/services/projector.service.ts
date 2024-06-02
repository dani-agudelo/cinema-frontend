import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Projector } from '../models/projector.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectorService {

  constructor(private http: HttpClient) { }

  
  listar(): Observable<Projector[]> {
    return this.http.get<Projector[]>(`${environment.url_ms_cinema}/projectors`);
  }
}
