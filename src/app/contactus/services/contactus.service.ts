import { ContactUs } from './../models/contactus';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactusService {
  constructor(private http: HttpClient) {}

  load(): Observable<ContactUs> {
    return this.http.get<ContactUs>('assets/data/contactus.json');
  }
}
