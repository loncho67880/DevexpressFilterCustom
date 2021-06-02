import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromStore from './clientSnapshot.reducer';

const ClientSnapshotSelector = createFeatureSelector<fromStore.ClientSnapshotState>(fromStore.ClientSnapshotFeatureKey);

export const isLoading = createSelector(ClientSnapshotSelector, fromStore.selectIsLoading);
export const error = createSelector(ClientSnapshotSelector, fromStore.selectError);
export const ClientSnapshotInfo = createSelector(ClientSnapshotSelector, fromStore.ClientSnapshotInfoGet);
export const relationshipVulnerabilityInfo = createSelector(ClientSnapshotSelector, fromStore.relationshipVulnerabilityInfoGet);
export const criticalPhaseInfo = createSelector(ClientSnapshotSelector, fromStore.criticalPhaseInfoGet);
export const activeRfpInfo = createSelector(ClientSnapshotSelector, fromStore.activeRfpInfoGet);
export const retentionOutcomeInfo = createSelector(ClientSnapshotSelector, fromStore.retentionOutcomeInfoGet);
export const retentionReasonInfo = createSelector(ClientSnapshotSelector, fromStore.retentionReasonInfoGet);
export const ReasonsRetentionLossListInfo = createSelector(ClientSnapshotSelector, fromStore.ReasonsRetentionLossListInfoGet);
export const clientRetentionDetailsInfo = createSelector(ClientSnapshotSelector, fromStore.clientRetentionDetailsInfoGet);
export const clientVulnerabilityRatingInfo = createSelector(ClientSnapshotSelector, fromStore.clientVulnerabilityRatingInfoGet);
export const priorityInfo = createSelector(ClientSnapshotSelector, fromStore.priorityInfoGet);

