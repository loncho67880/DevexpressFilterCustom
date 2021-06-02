import { CommitteeCategory } from './../models/committeeCategory';
import { AuditFirm } from './../models/auditFirm';
import { EngagementTeamRoles } from './../models/engagementTeamRoles';
import { ClientExecutive } from './../models/clientExecutive';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RelationshipStrength } from '../models/relationshipStrength';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TeamInformationService {
  constructor(private http: HttpClient) { }

  loadTeamRoles(id: string): Observable<EngagementTeamRoles> {
    return this.http.get<EngagementTeamRoles>(`${environment.URL}ClientAccountTeam/GetAll?relatedId=${id}`);
  }

  loadClientExecutive(id: string): Observable<ClientExecutive[]> {
    return this.http.get<ClientExecutive[]>(`${environment.URL}ClientExecutive/GetAll?relatedId=${id}`).pipe(map(data => {
      if (data) {
        return data['items'] as ClientExecutive[];
      } else {
        return [];
      }
    }));
  }

  loadRelationshipStrength(): Observable<RelationshipStrength[]> {
    return this.http.get<RelationshipStrength[]>(`${environment.URL}RelationshipStrength/GetAll?startup=0&count=100`).pipe(map(data => {
      if (data) {
        return data['items'] as RelationshipStrength[];
      } else {
        return [];
      }
    }));
  }

  loadAuditFirm(): Observable<AuditFirm[]> {
    return this.http.get<AuditFirm[]>(`${environment.URL}AuditFirm/GetAll`).pipe(map(data => {
      if (data) {
        return data['items'] as AuditFirm[];
      } else {
        return [];
      }
    }));
  }

  loadCommitteeCategory(): Observable<CommitteeCategory[]> {
    return this.http.get<CommitteeCategory[]>(`${environment.URL}CommitteeCategory/GetAll`).pipe(map(data => {
      if (data) {
        return data['items'] as CommitteeCategory[];
      } else {
        return [];
      }
    }));
  }

  deleteClientExecutive(clientExecutive: ClientExecutive): Observable<any> {
    return this.http.post<any>(`${environment.URL}ClientExecutive/Delete/${clientExecutive.id}`, clientExecutive);
  }

  updateRelationshipStrength(relationshipStrengt: RelationshipStrength): Observable<RelationshipStrength> {
    return this.http.post<RelationshipStrength>(`${environment.URL}RelationshipStrength/Edit`, relationshipStrengt);
  }

  updateClientExecutive(clientExecutive: ClientExecutive): Observable<ClientExecutive> {
    return this.http.post<ClientExecutive>(`${environment.URL}ClientExecutive/Edit`, clientExecutive);
  }

  create(client: ClientExecutive): Observable<ClientExecutive> {
    return this.http.post<ClientExecutive>(`${environment.URL}ClientExecutive/Create`, client);
  }


  getClientExecutiveReport(id: string): any {
    return this.http.get(`${environment.URL}ClientExecutive/Export?relatedId=${id}`, { responseType: 'blob' });
  }
}
