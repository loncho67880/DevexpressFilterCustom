import { createReducer, on } from '@ngrx/store';
import { ClientRevenue } from '../models/clientRevenue';
import { ClientFee } from '../models/clientFee';
import * as revenueActions from './revenue.actions';

export const revenueFeatureKey = 'clientrevenue';

export interface RevenueState {
  isLoading: boolean;
  error: string | null;
  clientRevenue: ClientRevenue;
  clientFee: ClientFee[];
}

export const initialState: RevenueState = {
  clientRevenue: new ClientRevenue(),
  clientFee: [],
  isLoading: false,
  error: null
};

export const reducer = createReducer(
  initialState,
  on(revenueActions.requestLoadClientRevenueInfo, (state) => ({ ...state, isLoading: true })),
  on(revenueActions.loadClientRevenueInfo, (state, action) => ({ ...state, clientRevenue: action.clientRevenue, isLoading: false })),

  on(revenueActions.requestLoadClientFeeInfo, (state) => ({ ...state, isLoading: true })),
  on(revenueActions.loadClientFeeInfo, (state, action) => ({ ...state, clientFee: action.clientFee, isLoading: false })),
);

export const selectIsLoading = (state: RevenueState) => state.isLoading;
export const selectError = (state: RevenueState) => state.error;
export const revenueInfoGet = (state: RevenueState) => state;
export const clientRevenueInfoGet = (state: RevenueState) => state.clientRevenue;
export const clientFeeInfoGet = (state: RevenueState) => state.clientFee;
