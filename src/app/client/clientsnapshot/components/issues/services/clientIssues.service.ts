import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Action } from '../models/action';

import { ClientIssues } from '../models/ClientIssues';
import { Issue } from '../models/issue';
import { Severity } from '../models/severity';

@Injectable({
  providedIn: 'root'
})
export class ClientIssuesService {
  constructor(private http: HttpClient) {}

  load(id: string): Observable<ClientIssues[]> {
    return this.http.get<ClientIssues[]>(`${environment.URL}DeloitteClientIssue/GetAll/${id}?startup=0&count=10`).pipe(map(data => {
      if (data) {
        return data['items'] as ClientIssues[];
      } else {
        return [];
      }
    }));
  }

  create(client: ClientIssues): Observable<ClientIssues> {
    return this.http.post<ClientIssues>(`${environment.URL}DeloitteClientIssue/Create`, client);
  }

  update(client: ClientIssues): Observable<ClientIssues> {
    return this.http.post<ClientIssues>(`${environment.URL}DeloitteClientIssue/Edit`, client);
  }

  delete(client: ClientIssues): Observable<any> {
    return this.http.post<any>(`${environment.URL}DeloitteClientIssue/Delete/${client.id}`, client);
  }

  loadAction(): Observable<Action[]> {
    return this.http.get<Action[]>(`${environment.URL}Action/GetAll?startup=0&count=1000`).pipe(map(data => {
      if (data) {
        return data['items'] as Action[];
      } else {
        return [];
      }
    }));
  }

  loadSeverity(): Observable<Severity[]> {
    return this.http.get<Severity[]>(`${environment.URL}Severity/GetAll?startup=0&count=1000`).pipe(map(data => {
      if (data) {
        return data['items'] as Severity[];
      } else {
        return [];
      }
    }));
  }

  loadIssue(): Observable<Issue[]> {
    return this.http.get<Issue[]>(`${environment.URL}Issue/GetAll?startup=0&count=1000`).pipe(map(data => {
      if (data) {
        return data['items'] as Issue[];
      } else {
        return [];
      }
    }));
  }
}
