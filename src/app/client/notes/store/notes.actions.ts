import {createAction, props} from '@ngrx/store';
import {Note} from '../models/note';




export const requestLoadNotes = createAction('[Client/Notes] Request client Notes   ', props<{id: string}>());
export const loadNotes = createAction('[Client/Notes] Load client Notes ', props<{ notes: Note[] }>());
