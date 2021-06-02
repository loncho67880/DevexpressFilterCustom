import {createAction, props} from '@ngrx/store';

import { Profile } from '../models/profile';

export const requestLoadProfileInfo = createAction('[Client/Profile] Request client profile information', props<{id: string}>());
export const loadProfileInfo = createAction('[Client/Profile] Load client profile information', props<{profile: Profile}>());
