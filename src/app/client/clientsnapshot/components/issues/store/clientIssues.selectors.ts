import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromStore from './ClientIssues.reducer';

const ClientIssuesSelector = createFeatureSelector<fromStore.ClientIssuesState>(fromStore.ClientIssuesFeatureKey);

export const isLoading = createSelector(ClientIssuesSelector, fromStore.selectIsLoading);
export const error = createSelector(ClientIssuesSelector, fromStore.selectError);
export const ClientIssuesInfo = createSelector(ClientIssuesSelector, fromStore.ClientIssuesInfoGet);
export const ActionInfo = createSelector(ClientIssuesSelector, fromStore.ActionInfoGet);
export const SeverityInfo = createSelector(ClientIssuesSelector, fromStore.SeverityInfoGet);
export const IssueInfo = createSelector(ClientIssuesSelector, fromStore.IssueInfoGet);
export const responseCreate = createSelector(ClientIssuesSelector, fromStore.responseCreate);
export const responseUpdate = createSelector(ClientIssuesSelector, fromStore.responseUpdate);
export const responseDelete = createSelector(ClientIssuesSelector, fromStore.responseDelete);
export const userLastupdate = createSelector(ClientIssuesSelector, fromStore.userLastupdate);
