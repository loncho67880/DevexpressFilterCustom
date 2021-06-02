import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ClientComments } from '../models/ClientComments';

@Injectable({
  providedIn: 'root'
})
export class ClientCommentsService {
  quantityPerPage = 10;

  constructor(private http: HttpClient) {}

  load(id: string, page: number): Observable<ClientComments[]> {
    return this.http.get<any>(`${environment.URL}DeloitteClientComment/GetAll/${id}?startup=${page}&count=${this.quantityPerPage}`)
    .pipe(map(data => {
      if (data) {
        return data['items'] as ClientComments[];
      } else {
        return [];
      }
    }));
  }

  create(client: ClientComments): Observable<ClientComments> {
    return this.http.post<ClientComments>(`${environment.URL}DeloitteClientComment/Create`, client);
  }

  update(client: ClientComments): Observable<ClientComments> {
    return this.http.post<ClientComments>(`${environment.URL}DeloitteClientComment/Edit`, client);
  }

  delete(client: ClientComments): Observable<any> {
    return this.http.post<any>(`${environment.URL}DeloitteClientComment/Delete/${client.id}`, client);
  }
}
