import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromStore from './ClientComments.reducer';

const ClientCommentsSelector = createFeatureSelector<fromStore.ClientCommentsState>(fromStore.ClientCommentsFeatureKey);

export const isLoading = createSelector(ClientCommentsSelector, fromStore.selectIsLoading);
export const error = createSelector(ClientCommentsSelector, fromStore.selectError);
export const ClientCommentsInfo = createSelector(ClientCommentsSelector, fromStore.ClientCommentsInfoGet);
export const responseCreate = createSelector(ClientCommentsSelector, fromStore.responseCreate);
export const responseUpdate = createSelector(ClientCommentsSelector, fromStore.responseUpdate);
export const responseDelete = createSelector(ClientCommentsSelector, fromStore.responseDelete);

