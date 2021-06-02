import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Profile } from '../models/profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  load(id: string): Observable<Profile> {
    return this.http.get<Profile>(`${environment.URL}DeloitteClient/Get/${id}`);
  }
}
