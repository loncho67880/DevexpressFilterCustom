import { createReducer, on } from '@ngrx/store';
import { ClientSnapshot } from '../models/clientSnapshot';
import { Generic } from '../models/generic';
import { CriticalPhase } from '../models/criticalPhase';
import { CriticalPhaseStatus } from '../models/criticalPhaseStatus';
import { VulnerabilityRating  } from '../models/vulnerabilityRating';
import { RetentionDetailsOutcome } from '../models/RetentionDetailsOutcome';
import { ReasonsRFP } from '../models/ReasonsRFP';
import * as ClientSnapshotActions from './clientSnapshot.actions';
import { ReasonsRetentionLoss } from '../models/ReasonsRetentionLoss';
import { ClientRetentionDetails } from '../models/ClientRetentionDetails';
import { Priority } from '../models/Priorty';
import { ClientVulnerabilityRating } from '../models/ClientVulnerabilityRating';

export const ClientSnapshotFeatureKey = 'clientClientSnapshot';

export interface ClientSnapshotState extends ClientSnapshot {
  relationshipVulnerability: VulnerabilityRating[];
  criticalPhase: CriticalPhase[];
  activeRfp: CriticalPhaseStatus[];
  retentionOutcome: RetentionDetailsOutcome[];
  retentionReason: ReasonsRFP[];
  ReasonsRetentionLossList: ReasonsRetentionLoss[];
  clientRetentionDetails: ClientRetentionDetails[];
  clientVulnerabilityRating: ClientVulnerabilityRating;
  priority: Priority[];
  isLoading: boolean;
  error: string | null;
}

export const initialState: ClientSnapshotState = {
  rating: null,
  lastModifyDate: null,
  companyId: 0,
  relationshipVulnerability: [] as VulnerabilityRating[],
  criticalPhase: [] as CriticalPhase[],
  activeRfp: [] as CriticalPhaseStatus[],
  retentionOutcome: [] as RetentionDetailsOutcome[],
  retentionReason: []as ReasonsRFP[],
  ReasonsRetentionLossList: [] as ReasonsRetentionLoss[],
  clientRetentionDetails: [] as ClientRetentionDetails[],
  clientVulnerabilityRating: null,
  priority: [] as Priority[],
  isLoading: false,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(ClientSnapshotActions.requestLoadClientSnapshotInfo, (state) => ({ ...state, isLoading: true })),
  on(ClientSnapshotActions.loadClientSnapshotInfo, (state, action) => ({ ...state, ...action.clientSnapshot, isLoading: false })),
  on(ClientSnapshotActions.requestLoadRelationshipVulnerability, (state) => ({ ...state, isLoading: true })),
  on(ClientSnapshotActions.loadRelationshipVulnerability, (state, action) =>
    ({ ...state, relationshipVulnerability: [...action.relationshipVulnerability], isLoading: false })),
  on(ClientSnapshotActions.requestLoadCriticalPhase, (state) => ({ ...state, isLoading: true })),
  on(ClientSnapshotActions.loadCriticalPhase, (state, action) =>
    ({ ...state, criticalPhase: [...action.criticalPhase], isLoading: false })),
  on(ClientSnapshotActions.requestLoadActiveRfp, (state) => ({ ...state, isLoading: true })),
  on(ClientSnapshotActions.loadActiveRfp, (state, action) => ({ ...state, activeRfp: [...action.activeRfp], isLoading: false })),

  on(ClientSnapshotActions.requestLoadRetentionDetailsOutcome, (state) => ({ ...state, isLoading: true })),
  on(ClientSnapshotActions.loadRetentionDetailsOutcome, (state, action) =>
    ({ ...state, retentionOutcome: [...action.retentionDetailsOutcome], isLoading: false })),

  on(ClientSnapshotActions.requestLoadReasonsRFP, (state) => ({ ...state, isLoading: true })),
  on(ClientSnapshotActions.loadReasonsRFP, (state, action) => ({ ...state, retentionReason: [...action.ReasonsRFP], isLoading: false })),

  on(ClientSnapshotActions.requestReasonsRetentionLoss, (state) => ({ ...state, isLoading: true })),
  on(ClientSnapshotActions.loadReasonsRetentionLoss, (state, action) =>
    ({ ...state, ReasonsRetentionLossList: [...action.ReasonsRetentionLoss], isLoading: false })),

  on(ClientSnapshotActions.requestPriority, (state) => ({ ...state, isLoading: true })),
  on(ClientSnapshotActions.loadPriority, (state, action) => ({ ...state, priority: [...action.Priority], isLoading: false })),

  on(ClientSnapshotActions.requestLoadClientRetentionDetails, (state) => ({ ...state, isLoading: true })),
  on(ClientSnapshotActions.loadClientRetentionDetails, (state, action) =>
    ({ ...state, clientRetentionDetails: [...action.clientRetentionDetails], isLoading: false })),

  on(ClientSnapshotActions.requestCreateClientRetentionDetails, (state) => ({ ...state, isLoading: true })),
  on(ClientSnapshotActions.loadCreateClientRetentionDetails, (state, action) =>
    ({ ...state, clientRetentionDetails: [action.clientRetentionDetails, ...state.clientRetentionDetails], isLoading: false })),

  on(ClientSnapshotActions.requestEditClientRetentionDetails, (state) => ({ ...state, isLoading: true })),
  on(ClientSnapshotActions.loadEditClientRetentionDetails, (state, action) =>
    ({ ...state,
      clientRetentionDetails: [action.clientRetentionDetails,
                              ...state.clientRetentionDetails.filter(x => x.id !== action.clientRetentionDetails.id)],
      isLoading: false })),

  on(ClientSnapshotActions.requestDeleteClientRetentionDetails, (state) => ({ ...state, isLoading: true })),
  on(ClientSnapshotActions.loadDeleteClientRetentionDetails, (state, action) =>
    ({ ...state, clientRetentionDetails: [...state.clientRetentionDetails.filter(x => x.id !== action.id)], isLoading: false })),

  on(ClientSnapshotActions.requestLoadClientVulnerabilityRating, (state) => ({ ...state, isLoading: true })),
  on(ClientSnapshotActions.loadClientVulnerabilityRating, (state, action) =>
    ({ ...state, clientVulnerabilityRating: action.clientVulnerabilityRating, isLoading: false })),

  on(ClientSnapshotActions.requestCreateClientVulnerabilityRating, (state) => ({ ...state, isLoading: true })),
  on(ClientSnapshotActions.loadCreateClientVulnerabilityRating, (state, action) =>
    ({ ...state, clientVulnerabilityRating: action.clientVulnerabilityRating, isLoading: false })),

  on(ClientSnapshotActions.requestEditClientVulnerabilityRating, (state) => ({ ...state, isLoading: true })),
  on(ClientSnapshotActions.loadEditClientVulnerabilityRating, (state, action) =>
    ({ ...state, clientVulnerabilityRating: action.clientVulnerabilityRating, isLoading: false })),
);

export const selectIsLoading = (state: ClientSnapshotState) => state.isLoading;
export const selectError = (state: ClientSnapshotState) => state.error;
export const ClientSnapshotInfoGet = (state: ClientSnapshotState) => state;
export const relationshipVulnerabilityInfoGet = (state: ClientSnapshotState) => state.relationshipVulnerability;
export const criticalPhaseInfoGet = (state: ClientSnapshotState) => state.criticalPhase;
export const activeRfpInfoGet = (state: ClientSnapshotState) => state.activeRfp;
export const retentionOutcomeInfoGet = (state: ClientSnapshotState) => state.retentionOutcome;
export const retentionReasonInfoGet = (state: ClientSnapshotState) => state.retentionReason;
export const ReasonsRetentionLossListInfoGet = (state: ClientSnapshotState) => state.ReasonsRetentionLossList;
export const clientRetentionDetailsInfoGet = (state: ClientSnapshotState) => state.clientRetentionDetails;
export const priorityInfoGet = (state: ClientSnapshotState) => state.priority;
export const clientVulnerabilityRatingInfoGet = (state: ClientSnapshotState) => state.clientVulnerabilityRating;
