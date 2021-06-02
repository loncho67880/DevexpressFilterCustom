import { createReducer, on } from '@ngrx/store';
import { AdvantagedClient } from '../models/advantageclient';
import * as pocFilterActions from './pocFilter.actions';

export const pocFilterFeatureKey = 'pocFilter';

export interface PocFilterState {
  isLoading: boolean;
  error: string | null;
  advantagedClient: AdvantagedClient[] | null;
}

export const initialState: PocFilterState = {
  isLoading: false,
  error: null,
  advantagedClient: []
};

export const reducer = createReducer(
  initialState,
  on(pocFilterActions.requestLoadPocFilterAdvantagedClientInfo, (state, action) => ({ ...state, isLoading: true })),
  on(pocFilterActions.loadAdvantagedClientInfo, (state, action ) =>
    ({ ...state, advantagedClient: [...state.advantagedClient, ...action.advantagedClient], isLoading: false })),
);

export const selectIsLoading = (state: PocFilterState) => state.isLoading;
export const selectError = (state: PocFilterState) => state.error;
export const pocFilterInfoGet = (state: PocFilterState) => state;
export const pocFilterAdvantagedClientGet = (state: PocFilterState) => state?.advantagedClient;
