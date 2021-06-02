import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromStore from './revenue.reducer';

const revenueSelector = createFeatureSelector<fromStore.RevenueState>(fromStore.revenueFeatureKey);

export const isLoading = createSelector(revenueSelector, fromStore.selectIsLoading);
export const error = createSelector(revenueSelector, fromStore.selectError);
export const revenueInfo = createSelector(revenueSelector, fromStore.revenueInfoGet);
export const clientRevenueInfo = createSelector(revenueSelector, fromStore.clientRevenueInfoGet);
export const clientFeeInfo = createSelector(revenueSelector, fromStore.clientFeeInfoGet);
