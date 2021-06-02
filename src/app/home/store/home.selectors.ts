import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromStore from './home.reducer';
import { homeFiscalYearGet } from './home.reducer';

const homeSelector = createFeatureSelector<fromStore.HomeState>(fromStore.homeFeatureKey);

export const isLoading = createSelector(homeSelector, fromStore.selectIsLoading);
export const error = createSelector(homeSelector, fromStore.selectError);
export const HomeInfo = createSelector(homeSelector, fromStore.homeInfoGet);
export const portfolioInfo = createSelector(homeSelector, fromStore.homePortfolioGet);
export const fiscalyearInfo = createSelector(homeSelector, fromStore.homeFiscalYearGet);
export const indicatorInfo = createSelector(homeSelector, fromStore.homeIndicatorsGet);
export const advantageclientInfo = createSelector(homeSelector, fromStore.homeAdvantagedClientGet);
export const searchColumnsGet = createSelector(homeSelector, fromStore.searchColumnsGet);
export const distinctColumnsGet = createSelector(homeSelector, fromStore.homeDistinctColumnsGet);
