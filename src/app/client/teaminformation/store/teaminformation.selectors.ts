import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromStore from './teaminformation.reducer';

const TeamInfomrationSelector = createFeatureSelector<fromStore.TeamInformationState>(fromStore.teamInformationFeatureKey);

export const isLoading = createSelector(TeamInfomrationSelector, fromStore.selectIsLoading);
export const error = createSelector(TeamInfomrationSelector, fromStore.selectError);
export const engagementTeamRolesInfo = createSelector(TeamInfomrationSelector, fromStore.engagementTeamRolesInfoGet);
export const clientExecutiveInfo = createSelector(TeamInfomrationSelector, fromStore.clientExecutiveInfoGet);
export const committeeCategoryInfo = createSelector(TeamInfomrationSelector, fromStore.committeeCategoryInfoGet);
export const auditFirmCategoryInfo = createSelector(TeamInfomrationSelector, fromStore.auditFirmInfoGet);
export const relationshipStrengthInfo = createSelector(TeamInfomrationSelector, fromStore.relationshipStrengthInfoGet);
export const responseDelete = createSelector(TeamInfomrationSelector, fromStore.responseDelete);
export const responseUpdate = createSelector(TeamInfomrationSelector, fromStore.responseUpdate);
export const clientExecutiveEditInfo = createSelector(TeamInfomrationSelector, fromStore.clientExecutiveEditInfo);
