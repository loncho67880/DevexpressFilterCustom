import { createReducer, on } from '@ngrx/store';
import { Profile } from '../models/profile';
import * as profileActions from './profile.actions';

export const profileFeatureKey = 'clientProfile';

export interface ProfileState extends Profile {
  isLoading: boolean;
  error: string | null;
}

export const initialState: ProfileState = {
  id: null,
  client: null,
  program: null,
  fees: 0,
  auditorSince: null,
  filesSEC: 0,
  companyType: null,
  fiscalYearEnd: 0,
  region: null,
  office: null,
  industrySector: null,
  lcsp: null,
  lcspYearsInRole: null,
  ap: null,
  apYearsInRole: null,
  rating: 0,
  changed: null,
  dateUpdated: null,
  isLoading: false,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(profileActions.requestLoadProfileInfo, (state) => ({ ...state, isLoading: true })),
  on(profileActions.loadProfileInfo, (state, action) => ({ ...state, ...action.profile, isLoading: false })),
);

export const selectIsLoading = (state: ProfileState) => state.isLoading;
export const selectError = (state: ProfileState) => state.error;
export const profileInfoGet = (state: ProfileState) => state;
