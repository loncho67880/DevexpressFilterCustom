import { createReducer, on } from '@ngrx/store';
import { TeamInformation } from '../models/teamInformation';
import { EngagementTeamRoles } from '../models/engagementTeamRoles';
import { ClientExecutive } from '../models/clientExecutive';
import { AuditFirm } from '../models/auditFirm';
import { RelationshipStrength } from '../models/relationshipStrength';
import { CommitteeCategory } from './../models/committeeCategory';
import * as teamInformationActions from './teamInformation.actions';

export const teamInformationFeatureKey = 'clientTeamInformation';

export interface TeamInformationState extends TeamInformation {
  isLoading: boolean;
  auditFirm: AuditFirm[];
  relationshipStrength: RelationshipStrength[];
  engagementTeamRoles: EngagementTeamRoles;
  clientExecutive: ClientExecutive[];
  clientExecutiveEdit: ClientExecutive;
  committeeCategory: CommitteeCategory[];
  error: string | null;
  respUpdate: ClientExecutive;
  respDelete: ClientExecutive;
}

export const initialState: TeamInformationState = {
  relationshipStrength: [] as RelationshipStrength[],
  engagementTeamRoles: new EngagementTeamRoles(),
  clientExecutiveEdit: new ClientExecutive(),
  clientExecutive: [] as ClientExecutive[],
  committeeCategory: [] as CommitteeCategory[],
  auditFirm: [] as AuditFirm[],
  isLoading: false,
  error: null,
  respUpdate: null,
  respDelete: null,
};


export const reducer = createReducer(
  initialState,
  on(teamInformationActions.requestLoadEngagementTeamRolesInfo, (state) => {
    return { ...state, isLoading: true };
  }),
  on(teamInformationActions.loadEngagementTeamRolesInfo, (state, action) => {
    return { ...state, engagementTeamRoles: action.engagementTeamRoles, isLoading: false };
  }),


  on(teamInformationActions.requestLoadClientExecutiveInfo, (state) => {
    return { ...state, isLoading: true };
  }),
  on(teamInformationActions.loadClientExecutiveInfo, (state, action) => {
    return { ...state, clientExecutive: action.clientExecutive, isLoading: false };
  }),


  on(teamInformationActions.requestLoadRelationshipStrengthInfo, (state) => {
    return { ...state, isLoading: true };
  }),
  on(teamInformationActions.loadRelationshipStrengthInfo, (state, action) => {
    return { ...state, relationshipStrength: action.relationshipStrength, isLoading: false };
  }),

  on(teamInformationActions.requestLoadCommitteeCategoryInfo, (state) => {
    return { ...state, isLoading: true };
  }),
  on(teamInformationActions.loadCommitteeCategoryInfo, (state, action) => {
    return { ...state, committeeCategory: action.committeeCategory, isLoading: false };
  }),

  //
  on(teamInformationActions.requestLoadAuditFirmInfo, (state) => {
    return { ...state, isLoading: true };
  }),
  on(teamInformationActions.loadAuditFirmInfo, (state, action) => {
    return { ...state, auditFirm: action.auditFirm, isLoading: false };
  }),
  //


  on(teamInformationActions.requestUpdateClientExecutiveRelationshipInfo, (state) => ({ ...state, isLoading: true })),
  on(teamInformationActions.loadUpdateClientExecutiveRelationshipInfo, (state, action) =>
    ({ ...state, respUpdate: action.executive,
       clientExecutive: [action.executive, ...state.clientExecutive.filter(x => x.id !== action.executive.id)], isLoading: false })),

  on(teamInformationActions.requesDeleteClientExecutiveInfo, (state) => ({ ...state, isLoading: true })),
  on(teamInformationActions.loadDeleteClientExecutiveInfo, (state, action) =>
    ({ ...state, respDelete: action.executive,
       clientExecutive: [...state.clientExecutive.filter(x => x.id !== action.executive.id)], isLoading: false })),

  on(teamInformationActions.requestAddClientExecutiveInfo, (state) => ({ ...state, isLoading: true })),
  on(teamInformationActions.loadAddClientExecutiveInfo, (state, action) =>
    ({ ...state, clientExecutive: [action.executive, ...state.clientExecutive], isLoading: false })),
  on(teamInformationActions.loadEditExecutiveInfo, (state, action) => ({ ...state, clientExecutiveEdit: action.executive })),

);

export const selectIsLoading = (state: TeamInformationState) => state.isLoading;
export const selectError = (state: TeamInformationState) => state.error;
export const engagementTeamRolesInfoGet = (state: TeamInformationState) => state.engagementTeamRoles;
export const clientExecutiveInfoGet = (state: TeamInformationState) => state.clientExecutive;
export const relationshipStrengthInfoGet = (state: TeamInformationState) => state.relationshipStrength;
export const committeeCategoryInfoGet = (state: TeamInformationState) => state.committeeCategory;
export const auditFirmInfoGet = (state: TeamInformationState) => state.auditFirm;
export const responseDelete = (state: TeamInformationState) => state.respDelete;
export const responseUpdate = (state: TeamInformationState) => state.respUpdate;
export const clientExecutiveEditInfo = (state: TeamInformationState) => state.clientExecutiveEdit;
