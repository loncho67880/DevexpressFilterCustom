import { createReducer, on } from '@ngrx/store';
import { Note } from '../models/note';
import * as notesActions from './notes.actions';


export const clientNotesFeatureKey = 'clientNotes';
export interface NotesState {
  isLoading: boolean;
  clientNotes: Note[];
  error: string | null;
}

export const initialState: NotesState = {
    isLoading: false,
    clientNotes: [] as Note[],
    error: null,
};

export const reducer = createReducer(
    initialState,

    on(notesActions.requestLoadNotes, (state) => ({ ...state, isLoading: true })),
    on(notesActions.loadNotes, (state, action) => ({ ...state, clientNotes: [...action.notes], isLoading: false })),
);


export const selectIsLoading = (state: NotesState) => state.isLoading;
export const selectError = (state: NotesState) => state.error;
export const clientNotesInfoGet = (state: NotesState) => state.clientNotes;
