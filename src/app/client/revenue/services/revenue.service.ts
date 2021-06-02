import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ClientRevenue } from '../models/clientRevenue';
import { ClientFee } from '../models/clientFee';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RevenueService {
  constructor(private http: HttpClient) {}

  loadRevenue(id: string): Observable<ClientRevenue[]> {
    return this.http.get<ClientRevenue[]>(`${environment.URL}DeloitteRevenue/GetAll?relatedId=${id}`).pipe(map(data => {
      if (data) {
        return data['items'] as ClientRevenue[];
      } else {
        return [];
      }
    }));
  }

  loadFee(id: string): Observable<ClientFee[]> {
    return this.http.get<ClientFee[]>(`${environment.URL}DeloitteFee/GetAll?relatedId=${id}`).pipe(map(data => {
      if (data) {
        return data['items'] as ClientFee[];
      } else {
        return [];
      }
    }));
  }
}
