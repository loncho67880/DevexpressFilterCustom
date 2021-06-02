import {createAction, props} from '@ngrx/store';
import { Home } from '../models/Home';
import { Portfolio } from '../models/portfolio';
import { FiscalYear } from '../models/fiscalyear';
import { Indicators } from '../models/indicators';
import { AdvantagedClient } from '../models/advantageclient';
import { FilterHome } from '../models/filterHome';
import { SearchColumns } from '../models/searchColumns';
import { OrderColumns } from '../models/orderColumns';
import { DistinctColumns } from '../models/distinctColumns';

export const requestLoadHomeInfo = createAction('[Home] Request Home information');
export const loadHomeInfo = createAction('[Home] Load Home information', props<{home: Home}>());

export const requestLoadHomePortfolioInfo = createAction('[Home] Request portfolio information');
export const loadPortfolioInfo = createAction('[Home] Load portfolio information', props<{portfolio: Portfolio[]}>());

export const requestLoadHomeFiscalYearInfo = createAction('[Home] Request fiscal Year information');
export const loadFiscalYearInfo = createAction('[Home] Load fiscal Year information', props<{fiscalyear: FiscalYear[]}>());

export const requestLoadHomeIndicatorsInfo = createAction('[Home] Request Indicators information');
export const loadIndicatorsInfo = createAction('[Home] Load Indicators information', props<{indicators: Indicators}>());

export const requestLoadHomeAdvantagedClientInfo =
                createAction('[Home] Request Advantaged Client information', props<{page: number, order: OrderColumns}>());
export const loadAdvantagedClientInfo =
                createAction('[Home] Load Advantaged Client information', props<{advantagedClient: AdvantagedClient[]}>());

export const requestLoadHomeFilterInfo =
                createAction('[Home] Request Filter Advantaged Client information',
                              props<{page: number, filter: FilterHome[], order: OrderColumns}>());
export const loadFilterInfo =
                createAction('[Home] Load Filter Advantaged Client information', props<{advantagedClient: AdvantagedClient[]}>());

export const requestLoadHomeDeleteFilterInfo = createAction('[Home] Request Delete Filter Advantaged Client information');

export const requestLoadHomeColumnsFilter = createAction('[Home] Request Filter Columns information');
export const loadColumnsHomeFilter = createAction('[Home] Load Filter Columns information', props<{columns: SearchColumns[]}>());

export const requestChangeColumnsOrder = createAction('[Home] Request Change Order Column information', props<{order: OrderColumns}>());

export const requestLoadDistinctColumns = createAction('[Home] Request Distinct Columns information');
export const loadDistinctColumnsInfo = createAction('[Home] Load Distinct Columns information', props<{columns: DistinctColumns[]}>());
