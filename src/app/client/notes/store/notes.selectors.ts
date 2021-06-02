import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromStore from './notes.reducer';

const NotesSelector = createFeatureSelector<fromStore.NotesState>(fromStore.clientNotesFeatureKey);

export const isLoading = createSelector(NotesSelector, fromStore.selectIsLoading);
export const error = createSelector(NotesSelector, fromStore.selectError);
export const clientNotesInfo = createSelector(NotesSelector, fromStore.clientNotesInfoGet);
