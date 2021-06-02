import { createReducer, on } from '@ngrx/store';
import { AdvantagedClient } from '../models/advantageclient';
import { DistinctColumns } from '../models/distinctColumns';
import { FilterHome } from '../models/filterHome';
import { FiscalYear } from '../models/fiscalyear';
import { Home } from '../models/Home';
import { Indicators } from '../models/indicators';
import { OrderColumns } from '../models/orderColumns';
import { Portfolio } from '../models/portfolio';
import { SearchColumns } from '../models/searchColumns';
import * as homeActions from './home.actions';

export const homeFeatureKey = 'home';

export interface HomeState extends Home {
  isLoading: boolean;
  error: string | null;
  portfolio: Portfolio[] | null;
  fiscalYear: FiscalYear[] | null;
  indicators: Indicators | null;
  advantagedClient: AdvantagedClient[] | null;
  searchColumns: SearchColumns[] | null;
  distinctColumns: DistinctColumns[] | null;
  filter: FilterHome[];
  order: OrderColumns;
}

export const initialState: HomeState = {
  isLoading: false,
  error: null,
  portfolio: [],
  fiscalYear: [],
  indicators: null,
  advantagedClient: [],
  searchColumns: [],
  distinctColumns: [],
  filter: [],
  order: new OrderColumns('client', true, 'ASC')
};

export const reducer = createReducer(
  initialState,
  on(homeActions.requestLoadHomeInfo, (state) => ({ ...state, isLoading: true })),
  on(homeActions.loadPortfolioInfo, (state, action ) => ({ ...state, portfolio: [...action.portfolio], isLoading: false })),
  on(homeActions.requestLoadHomeFilterInfo, (state, action) => ({ ...state, filter: action.filter, order: action.order, isLoading: true })),
  on(homeActions.loadFilterInfo, (state, action ) =>
    ({ ...state, advantagedClient: [...state.advantagedClient, ...action.advantagedClient], isLoading: false })),
  on(homeActions.requestLoadHomeDeleteFilterInfo, (state) => ({ ...state, isLoading: true, advantagedClient: [] })),
  on(homeActions.loadFiscalYearInfo, (state, action ) => ({ ...state, fiscalYear: [...action.fiscalyear], isLoading: false })),
  on(homeActions.loadIndicatorsInfo, (state, action ) => ({ ...state, indicators: action.indicators, isLoading: false })),
  on(homeActions.requestLoadHomeAdvantagedClientInfo, (state, action) => ({ ...state, order: action.order, isLoading: true })),
  on(homeActions.loadAdvantagedClientInfo, (state, action ) =>
    ({ ...state, advantagedClient: [...state.advantagedClient, ...action.advantagedClient], isLoading: false })),
  on(homeActions.loadHomeInfo, (state, action) => ({ ...state, ...action.home, isLoading: false })),
  on(homeActions.requestLoadHomeColumnsFilter, (state) => ({ ...state, isLoading: true })),
  on(homeActions.loadColumnsHomeFilter, (state, action ) => ({ ...state, searchColumns: [...action.columns], isLoading: false })),
  on(homeActions.requestChangeColumnsOrder, (state, action) => ({ ...state, order: action.order })),
  on(homeActions.requestLoadDistinctColumns, (state) => ({ ...state, isLoading: true })),
  on(homeActions.loadDistinctColumnsInfo, (state, action ) => ({ ...state, distinctColumns: [...action.columns], isLoading: false }))
);

export const selectIsLoading = (state: HomeState) => state.isLoading;
export const selectError = (state: HomeState) => state.error;
export const homeInfoGet = (state: HomeState) => state;
export const homePortfolioGet = (state: HomeState) => state?.portfolio;
export const homeFiscalYearGet = (state: HomeState) => state?.fiscalYear;
export const homeIndicatorsGet = (state: HomeState) => state?.indicators;
export const homeAdvantagedClientGet = (state: HomeState) => state?.advantagedClient;
export const searchColumnsGet = (state: HomeState) => state?.searchColumns;
export const homeDistinctColumnsGet = (state: HomeState) => state?.distinctColumns;
