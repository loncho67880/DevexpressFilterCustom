import { createAction, props } from '@ngrx/store';
import { ClientSnapshot } from '../models/clientSnapshot';
import { Generic } from '../models/generic';
import { CriticalPhase } from '../models/criticalPhase';
import { CriticalPhaseStatus } from '../models/criticalPhaseStatus';
import { VulnerabilityRating } from '../models/vulnerabilityRating';
import { RetentionDetailsOutcome } from '../models/RetentionDetailsOutcome';
import { ReasonsRFP } from '../models/ReasonsRFP';
import { ReasonsRetentionLoss } from '../models/ReasonsRetentionLoss';
import { ClientRetentionDetails } from '../models/ClientRetentionDetails';
import { Priority } from '../models/Priorty';
import { ClientVulnerabilityRating } from '../models/ClientVulnerabilityRating';

export const requestLoadClientSnapshotInfo = createAction('[Client/ClientSnapshot] Request client Client Snapshot information',
                                                          props<{ id: string }>());
export const loadClientSnapshotInfo = createAction('[Client/ClientSnapshot] Load client Client Snapshot information',
                                                     props<{ clientSnapshot: ClientSnapshot }>());

export const requestLoadRelationshipVulnerability = createAction('[Client/ClientSnapshot] Request RelationshipVulnerability information');
export const loadRelationshipVulnerability = createAction('[Client/ClientSnapshot] Load RelationshipVulnerability information',
                                                           props<{ relationshipVulnerability: VulnerabilityRating[] }>());

export const requestLoadCriticalPhase = createAction('[Client/ClientSnapshot] Request CriticalPhase information');
export const loadCriticalPhase = createAction('[Client/ClientSnapshot] Load CriticalPhase information',
                                               props<{ criticalPhase: CriticalPhase[] }>());
export const requestLoadActiveRfp = createAction('[Client/ClientSnapshot] Request ActiveRfp information');
export const loadActiveRfp = createAction('[Client/ClientSnapshot] Load ActiveRfp information',
                                           props<{ activeRfp: CriticalPhaseStatus[] }>());
export const requestLoadRetentionDetailsOutcome = createAction('[Client/ClientSnapshot] Request Retention detail Outcome information');
export const loadRetentionDetailsOutcome = createAction('[Client/ClientSnapshot] Load Retention detail Outcome information',
                                                         props<{ retentionDetailsOutcome: RetentionDetailsOutcome[] }>());

export const requestLoadReasonsRFP = createAction('[Client/ClientSnapshot] Request Retention detail Reason information');
export const loadReasonsRFP = createAction('[Client/ClientSnapshot] Load Retention detail Reason information',
                                            props<{ ReasonsRFP: ReasonsRFP[] }>());

export const requestReasonsRetentionLoss = createAction('[Client/ClientSnapshot] Request Reasons Retention Loss');
export const loadReasonsRetentionLoss = createAction('[Client/ClientSnapshot] Load Reasons Retention Loss',
                                                      props<{ ReasonsRetentionLoss: ReasonsRetentionLoss[] }>());

export const requestPriority = createAction('[Client/ClientSnapshot] Request Priority');
export const loadPriority = createAction('[Client/ClientSnapshot] Load Priority',
                                          props<{ Priority: Priority[] }>());

export const requestLoadClientRetentionDetails = createAction('[Client/ClientSnapshot] Request Client retention detail  information',
                                                               props<{id: string}>());
export const loadClientRetentionDetails = createAction('[Client/ClientSnapshot] Load Client Retention Detail',
                                                        props<{ clientRetentionDetails: ClientRetentionDetails[] }>());
export const requestCreateClientRetentionDetails = createAction('[Client/ClientSnapshot] Request Create Client Retention Details',
                                                                 props<{clientRetentionDetails: ClientRetentionDetails}>());
export const loadCreateClientRetentionDetails = createAction('[Client/ClientSnapshot] Load Create Client Retention Details',
                                                              props<{ clientRetentionDetails: ClientRetentionDetails }>());

export const requestEditClientRetentionDetails = createAction('[Client/ClientSnapshot] Request Edit Client Retention Details',
                                                               props<{clientRetentionDetails: ClientRetentionDetails}>());
export const loadEditClientRetentionDetails = createAction('[Client/ClientSnapshot] Load Edit Client Retention Details',
                                                            props<{ clientRetentionDetails: ClientRetentionDetails }>());

export const requestDeleteClientRetentionDetails = createAction('[Client/ClientSnapshot] Request Delete Client Retention Details',
                                                                 props<{id: string}>());
export const loadDeleteClientRetentionDetails = createAction('[Client/ClientSnapshot] Load Delete Client Retention Details',
                                                              props<{ id: string }>());

export const requestLoadClientVulnerabilityRating = createAction('[Client/ClientSnapshot] Request Client Vulnerability Rating  information',
                                                                  props<{id: string}>());
export const loadClientVulnerabilityRating = createAction('[Client/ClientSnapshot] Load Client Vulnerability Rating',
                                                           props<{ clientVulnerabilityRating: ClientVulnerabilityRating }>());

export const requestCreateClientVulnerabilityRating = createAction('[Client/ClientSnapshot] Request Create Client Vulnerability Rating',
                                                                    props<{ clientVulnerabilityRating: ClientVulnerabilityRating }>());
export const loadCreateClientVulnerabilityRating = createAction('[Client/ClientSnapshot] Load Create Client Vulnerability Rating',
                                                                 props<{ clientVulnerabilityRating: ClientVulnerabilityRating }>());

export const requestEditClientVulnerabilityRating = createAction('[Client/ClientSnapshot] Request Edit Client Vulnerability Rating',
                                                                  props<{ clientVulnerabilityRating: ClientVulnerabilityRating }>());
export const loadEditClientVulnerabilityRating = createAction('[Client/ClientSnapshot] Load Edit Client Vulnerability Rating',
                                                               props<{ clientVulnerabilityRating: ClientVulnerabilityRating }>());
