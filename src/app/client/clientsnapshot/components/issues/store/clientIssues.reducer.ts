import { createReducer, on } from '@ngrx/store';
import { ClientIssues } from '../models/ClientIssues';
import * as ClientIssuesActions from './ClientIssues.actions';
import { Severity } from '../models/severity';
import { Action } from '../models/action';
import { Issue } from '../models/issue';

export const ClientIssuesFeatureKey = 'clientClientIssues';

export interface ClientIssuesState {
  isLoading: boolean;
  error: string | null;
  clientIssues: ClientIssues[] | null;
  actions: Action[] | null;
  severitys: Severity[] | null;
  issues: Issue[] | null;
  respCreate: ClientIssues;
  respUpdate: ClientIssues;
  respDelete: ClientIssues;
  userLastupdate: string;
}

export const initialState: ClientIssuesState = {
  isLoading: false,
  error: null,
  clientIssues: [],
  actions: [],
  severitys: [],
  issues: [],
  respCreate: null,
  respUpdate: null,
  respDelete: null,
  userLastupdate: null
};

export const reducer = createReducer(
  initialState,
  // Get information
  on(ClientIssuesActions.requestLoadClientIssuesInfo, (state) => ({ ...state, isLoading: true })),
  on(ClientIssuesActions.loadClientIssuesInfo, (state, action) =>
    ({ ...state, clientIssues: [...action.clientIssues], userLastupdate: action.clientIssues.length > 0 ? action.clientIssues[0].modifyBy : '', isLoading: false })),
  on(ClientIssuesActions.requestLoadActionInfo, (state) => ({ ...state, isLoading: true })),
  on(ClientIssuesActions.loadActionInfo, (state, action) => {
    return { ...state, actions: [...action.actions] };
  }),
  on(ClientIssuesActions.requestLoadSeverityInfo, (state) => ({ ...state, isLoading: true })),
  on(ClientIssuesActions.loadSeverityInfo, (state, action) => {
    return { ...state, severitys: [...action.severitys] };
  }),
  on(ClientIssuesActions.requestLoadIssueInfo, (state) => ({ ...state, isLoading: true })),
  on(ClientIssuesActions.loadIssueInfo, (state, action) => {
    return { ...state, issues: [...action.issues] };
  }),
  // Update information
  on(ClientIssuesActions.requestCreateClientIssuesInfo, (state) => ({ ...state, isLoading: true })),
  on(ClientIssuesActions.loadcreateClientIssuesInfo, (state, action) =>
    ({ ...state, clientIssues: [action.response, ...state.clientIssues], respCreate: action.response, isLoading: false })),
  on(ClientIssuesActions.requestUpdateClientIssuesInfo, (state) => ({ ...state, isLoading: true })),
  on(ClientIssuesActions.loadupdateClientIssuesInfo, (state, action) =>
    ({ ...state,
      clientIssues: [action.response, ...state.clientIssues.filter(x => x.id !== action.response.id)],
      respUpdate: action.response, isLoading: false })),
  on(ClientIssuesActions.requesDeleteClientIssuesInfo, (state) => ({ ...state, isLoading: true })),
  on(ClientIssuesActions.loadDeleteClientIssuesInfo, (state, action) =>
    ({ ...state,
      clientIssues: [...state.clientIssues.filter(x => x.id !== action.client.id)],
      respDelete: action.client, isLoading: false })),
);

export const selectIsLoading = (state: ClientIssuesState) => state.isLoading;
export const selectError = (state: ClientIssuesState) => state.error;
export const ClientIssuesInfoGet = (state: ClientIssuesState) => state.clientIssues;
export const ActionInfoGet = (state: ClientIssuesState) => state.actions;
export const SeverityInfoGet = (state: ClientIssuesState) => state.severitys;
export const IssueInfoGet = (state: ClientIssuesState) => state.issues;
export const responseCreate = (state: ClientIssuesState) => state.respCreate;
export const responseUpdate = (state: ClientIssuesState) => state.respUpdate;
export const responseDelete = (state: ClientIssuesState) => state.respDelete;
export const userLastupdate = (state: ClientIssuesState) => state.userLastupdate;
