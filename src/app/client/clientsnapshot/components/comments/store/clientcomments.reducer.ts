import { createReducer, on } from '@ngrx/store';
import { ClientComments } from '../models/ClientComments';
import * as ClientCommentsActions from './ClientComments.actions';

export const ClientCommentsFeatureKey = 'clientComments';

export interface ClientCommentsState {
  isLoading: boolean;
  error: string | null;
  clientComments: ClientComments[] | null;
  respCreate: ClientComments;
  respUpdate: ClientComments;
  respDelete: ClientComments;
}

export const initialState: ClientCommentsState = {
  isLoading: false,
  error: null,
  clientComments: [],
  respCreate: null,
  respUpdate: null,
  respDelete: null
};

export const reducer = createReducer(
  initialState,
  on(ClientCommentsActions.requestLoadClientCommentsInfo, (state) => ({ ...state, isLoading: true })),
  on(ClientCommentsActions.loadClientCommentsInfo, (state, action ) =>
    ({ ...state, clientComments: action.clientComments === undefined ? [...state.clientComments]
                                                                    : [...state.clientComments, ...action.clientComments],
                                                                    isLoading: false })),
  on(ClientCommentsActions.cleanClientCommentsInfo, (state, action ) =>
    ({ ...state, clientComments: action.clientComments, isLoading: false })),
  on(ClientCommentsActions.requestCreateClientCommentsInfo, (state) => ({ ...state, isLoading: true })),
  on(ClientCommentsActions.loadcreateClientCommentsInfo, (state, action ) => ({ ...state, respCreate: action.response, isLoading: false })),
  on(ClientCommentsActions.requestUpdateClientCommentsInfo, (state) => ({ ...state, isLoading: true })),
  on(ClientCommentsActions.loadupdateClientCommentsInfo, (state, action ) => ({ ...state, respUpdate: action.response, isLoading: false })),
  on(ClientCommentsActions.requesDeleteClientCommentsInfo, (state) => ({ ...state, isLoading: true })),
  on(ClientCommentsActions.loadDeleteClientCommentsInfo, (state, action ) => ({ ...state, respDelete: action.client, isLoading: false })),
  on(ClientCommentsActions.addClientCommentsInfo, (state, action ) =>
    ({ ...state, clientComments: [action.clientComment, ...state.clientComments], isLoading: false })),
  on(ClientCommentsActions.updateClientCommentsInfo, (state, action) =>
    ({ ...state, clientComments: [action.clientComment, ...state.clientComments.filter(x => x.id !== action.clientComment.id)]
    , isLoading: false })),
  on(ClientCommentsActions.deleteClientCommentsInfo, (state, action) =>
    ({ ...state, clientComments: [...state.clientComments.filter(x => x.id !== action.client.id)], isLoading: false }))
);

export const selectIsLoading = (state: ClientCommentsState) => state.isLoading;
export const selectError = (state: ClientCommentsState) => state.error;
export const ClientCommentsInfoGet = (state: ClientCommentsState) => state.clientComments;
export const responseCreate = (state: ClientCommentsState) => state.respCreate;
export const responseUpdate = (state: ClientCommentsState) => state.respUpdate;
export const responseDelete = (state: ClientCommentsState) => state.respDelete;
