import { Update } from '@ngrx/entity';
import {createAction, props} from '@ngrx/store';
import { ClientIssues } from '../models/clientIssues';
import { Action } from '../models/action';
import { Severity } from '../models/severity';
import { Issue } from '../models/issue';

// Get infomation
export const requestLoadClientIssuesInfo = createAction('[Client/ClientIssues] Request Client Issue information', props<{id: string}>());
export const loadClientIssuesInfo = createAction('[Client/ClientIssues] Load Client Issue information',
                                                 props<{clientIssues: ClientIssues[]}>());
export const requestLoadActionInfo = createAction('[Client/ClientIssues] Request Action information');
export const loadActionInfo = createAction('[Client/ClientIssues] Load Action information', props<{actions: Action[]}>());
export const requestLoadSeverityInfo = createAction('[Client/ClientIssues] Request Severity information');
export const loadSeverityInfo = createAction('[Client/ClientIssues] Load Severity information', props<{severitys: Severity[]}>());
export const requestLoadIssueInfo = createAction('[Client/ClientIssues] Request Issue information');
export const loadIssueInfo = createAction('[Client/ClientIssues] Load Issue information', props<{issues: Issue[]}>());

// Update information
export const requestCreateClientIssuesInfo = createAction('[Client/ClientIssues] Request create issue information',
                                                           props<{client: ClientIssues}>());
export const loadcreateClientIssuesInfo = createAction('[Client/ClientIssues] Load create issue information',
                                                        props<{response: ClientIssues}>());
export const requestUpdateClientIssuesInfo = createAction('[Client/ClientIssues] Request update issue information',
                                                           props<{client: ClientIssues}>());
export const loadupdateClientIssuesInfo = createAction('[Client/ClientIssues] Load update issue information',
                                                        props<{response: ClientIssues}>());
export const requesDeleteClientIssuesInfo = createAction('[Client/ClientIssues] Request delete issue information',
                                                          props<{client: ClientIssues}>());
export const loadDeleteClientIssuesInfo = createAction('[Client/ClientIssues] Load delete issue information',
                                                        props<{client: ClientIssues}>());
