import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromStore from './contactus.reducer';

const headerSelector = createFeatureSelector<fromStore.ContactusState>(
  fromStore.contactusFeatureKey
);

export const isLoading = createSelector(
  headerSelector,
  fromStore.selectIsLoading
);
export const error = createSelector(headerSelector, fromStore.selectError);
export const contactusInfo = createSelector(
  headerSelector,
  fromStore.contactusInfoGet
);
