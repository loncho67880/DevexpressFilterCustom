import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { ClientSnapshot } from '../models/clientSnapshot';
import { Generic } from '../models/generic';
import { CriticalPhase } from '../models/criticalPhase';
import { CriticalPhaseStatus } from '../models/criticalPhaseStatus';
import { VulnerabilityRating } from '../models/vulnerabilityRating';
import { RetentionDetailsOutcome } from '../models/RetentionDetailsOutcome';
import { ReasonsRFP } from '../models/ReasonsRFP';
import { ClientRetentionDetails } from '../models/ClientRetentionDetails';
import { map } from 'rxjs/operators';
import { ReasonsRetentionLoss } from '../models/ReasonsRetentionLoss';
import { Priority } from '../models/Priorty';
import { ClientVulnerabilityRating } from '../models/ClientVulnerabilityRating';

@Injectable({
  providedIn: 'root'
})
export class ClientSnapshotService {
  constructor(private http: HttpClient) { }

  load(id: string): Observable<ClientSnapshot> {
    return this.http.get<ClientSnapshot>(`${environment.URL}DeloitteClient/Get/${id}`);
  }

  loadRelationShipVulnerability(): Observable<VulnerabilityRating[]> {
    return this.http.get<VulnerabilityRating[]>(`${environment.URL}VulnerabilityRating/GetAll`)
      .pipe(map(data => {
        if (data) {
          return data['items'] as VulnerabilityRating[];
        } else {
          return [];
        }
      }));
  }

  loadCriticalPhase(): Observable<CriticalPhase[]> {
    return this.http.get<CriticalPhase[]>(`${environment.URL}CriticalPhase/GetAll`)
      .pipe(map(data => {
        if (data) {
          return data['items'] as CriticalPhase[];
        } else {
          return [];
        }
      }));
  }

  loadActiveRfp(): Observable<CriticalPhaseStatus[]> {
    return this.http.get<CriticalPhaseStatus[]>(`${environment.URL}CriticalPhaseStatus/GetAll`)
      .pipe(map(data => {
        if (data) {
          return data['items'] as CriticalPhaseStatus[];
        } else {
          return [];
        }
      }));
  }

  loadRetentionDetailsOutcome(): Observable<RetentionDetailsOutcome[]> {
    return this.http.get<RetentionDetailsOutcome[]>(`${environment.URL}RetentionDetailsOutcome/GetAll`)
      .pipe(map(data => {
        if (data) {
          return data['items'] as RetentionDetailsOutcome[];
        } else {
          return [];
        }
      }));
  }

  loadReasonsRFP(): Observable<ReasonsRFP[]> {
    return this.http.get<ReasonsRFP[]>(`${environment.URL}RetentionDetailsReason/GetAll`)
      .pipe(map(data => {
        if (data) {

          return data['items'] as ReasonsRFP[];
        } else {
          return [];
        }
      }));
  }

  loadReasonsRetentionLoss(): Observable<ReasonsRetentionLoss[]> {
    return this.http.get<ReasonsRetentionLoss[]>(`${environment.URL}RetentionDetailsReason/GetAll`)
      .pipe(map(data => {
        if (data) {
          return data['items'] as ReasonsRetentionLoss[];
        } else {
          return [];
        }
      }));
  }

  loadPriority(): Observable<Priority[]> {
    return this.http.get<Priority[]>(`${environment.URL}RetentionDetailsPriority/GetAll`)
      .pipe(map(data => {
        if (data) {
          return data['items'] as any[];
        } else {
          return [];
        }
      }));
  }

  loadClientRetentionDetails(id: string): Observable<ClientRetentionDetails[]> {
    return this.http.get<ClientRetentionDetails[]>(`${environment.URL}ClientRetentionDetails/GetAll?relatedId=${id}`)
      .pipe(map(data => {
        if (data) {
          return data['items'] as any[];
        } else {
          return [];
        }
      }));
  }

  updateClientRetentionDetails(client: ClientRetentionDetails): Observable<ClientRetentionDetails> {
    return this.http.post<ClientRetentionDetails>(`${environment.URL}ClientRetentionDetails/Edit`, client);
  }

  deleteClientRetentionDetails(id: string): Observable<any> {
    return this.http.post<any>(`${environment.URL}ClientRetentionDetails/Delete/${id}`, {});
  }

  createClientRetentionDetails(client: ClientRetentionDetails): Observable<ClientRetentionDetails> {
    return this.http.post<ClientRetentionDetails>(`${environment.URL}ClientRetentionDetails/Create`, client);
  }

  loadClientVulnerabilityRating(id: string): Observable<ClientVulnerabilityRating> {
    return this.http.get<ClientVulnerabilityRating>(`${environment.URL}ClientVulnerabilityRating/GetAll?relatedId=${id}`)
      .pipe(map(data => {
        if (data) {
          const arrayData = data['items'] as ClientVulnerabilityRating[];
          return arrayData[0] as ClientVulnerabilityRating;
        } else {
          return null;
        }
      }));
  }

  updateClientVulnerabilityRating(client: ClientVulnerabilityRating): Observable<ClientVulnerabilityRating> {
    return this.http.post<ClientVulnerabilityRating>(`${environment.URL}ClientVulnerabilityRating/Edit`, client);
  }

  deleteClientVulnerabilityRating(id: string): Observable<any> {
    return this.http.post<any>(`${environment.URL}ClientVulnerabilityRating/Delete/${id}`, {});
  }

  createClientVulnerabilityRating(client: ClientVulnerabilityRating): Observable<ClientVulnerabilityRating> {
    return this.http.post<ClientVulnerabilityRating>(`${environment.URL}ClientVulnerabilityRating/Create`, client);
  }
}
