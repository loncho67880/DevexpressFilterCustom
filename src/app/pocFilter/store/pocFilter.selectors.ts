import { createFeatureSelector, createSelector } from "@ngrx/store";

import * as fromStore from './pocFilter.reducer';

const pocFilterSelector = createFeatureSelector<fromStore.PocFilterState>(fromStore.pocFilterFeatureKey);

export const isLoading = createSelector(pocFilterSelector, fromStore.selectIsLoading);
export const error = createSelector(pocFilterSelector, fromStore.selectError);
export const PocFilterInfo = createSelector(pocFilterSelector, fromStore.pocFilterInfoGet);
export const advantageclientInfo = createSelector(pocFilterSelector, fromStore.pocFilterAdvantagedClientGet);

