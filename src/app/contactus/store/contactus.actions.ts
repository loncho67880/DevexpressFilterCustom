import { createAction, props } from '@ngrx/store';

import { ContactUs } from '../models/contactus';

export const requestLoadcontactusInfo = createAction(
  '[Contactus/contactus] Request contactus information'
);
export const loadcontactusInfo = createAction(
  '[Contactus/contactus] Load  contactus information',
  props<{ contactus: ContactUs }>()
);
