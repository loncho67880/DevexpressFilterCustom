import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Note } from '../models/note';
import { VulnerabilityRating } from '../models/VulnerabilityRating';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private http: HttpClient) { }

  loadNotes(id: string): Observable<Note[]> {
    return this.http.get<Note[]>('assets/data/notes.json')
      .pipe(map(data => {
        return data ? data['items'] as Note[] : [];
    }));
  }

  loadVulnerabilityRating(): Observable<VulnerabilityRating[]> {
    return this.http.get<VulnerabilityRating[]>(`${environment.URL}VulnerabilityRating/GetAll`)
      .pipe(map(data => {
        return data ? data['items'] as VulnerabilityRating[] : [];
    }));
  }

  updateNote(note: Note): Observable<any> {
    return  this.http.post<any>(`${environment.URL}ClientNotes/Edit`, note);
  }

  createNote(note: Note): Observable<any> {
    return  this.http.post<any>(`${environment.URL}ClientNotes/Create`, note);
  }

  deteleNote(note: Note): Observable<any> {
    return  this.http.post<any>(`${environment.URL}CLientNotes/Delete/${note.id}`, note);
        /*if (data) {
          console.log(data);
          return data['items'] as Note[];
        } else {
          return [];
        }
      }));*/
  }
}
