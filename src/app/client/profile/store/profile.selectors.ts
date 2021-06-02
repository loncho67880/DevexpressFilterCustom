import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromStore from './profile.reducer';

const headerSelector = createFeatureSelector<fromStore.ProfileState>(fromStore.profileFeatureKey);

export const isLoading = createSelector(headerSelector, fromStore.selectIsLoading);
export const error = createSelector(headerSelector, fromStore.selectError);
export const profileInfo = createSelector(headerSelector, fromStore.profileInfoGet);
