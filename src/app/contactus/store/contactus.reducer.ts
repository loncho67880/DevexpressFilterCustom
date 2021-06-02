import { createReducer, on } from '@ngrx/store';
import { ContactUs } from '../models/contactus';
import * as contactusActions from './contactus.actions';

export const contactusFeatureKey = 'clientcontactus';

export interface ContactusState extends ContactUs {
  title: string;
  questions: string;
  defendTeam: string;
  forSupport: string;
  technicalSupportQuestions: string;
  usCallCenter: string;
  forOtherQuestions: string;
  contentQuestion: string;
  questionsHeaderList: [];
  contentQuestionList: [];
  technicalList: [];
  defendLeadershipList: [];
  regionalDefendList: [];
  region: string;
  link: string;
  isLoading: boolean;
  error: string | null;
}

export const initialState: ContactusState = {
  title: '',
  questions: '',
  defendTeam: '',
  forSupport: '',
  technicalSupportQuestions: '',
  usCallCenter: '',
  forOtherQuestions: '',
  contentQuestion: '',
  questionsHeaderList: [],
  contentQuestionList: [],
  technicalList: [],
  defendLeadershipList: [],
  regionalDefendList: [],
  region: '',
  link: '',
  name: '',
  id: null,
  isLoading: false,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(contactusActions.requestLoadcontactusInfo, (state) => {
    return { ...state, isLoading: true };
  }),
  on(contactusActions.loadcontactusInfo, (state, action) => {
    return { ...state, ...action.contactus, isLoading: false };
  })
);

export const selectIsLoading = (state: ContactusState) => state.isLoading;
export const selectError = (state: ContactusState) => state.error;
export const contactusInfoGet = (state: ContactusState) => state;
