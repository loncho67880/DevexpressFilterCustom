import { Update } from '@ngrx/entity';
import {createAction, props} from '@ngrx/store';
import { ClientComments } from '../models/ClientComments';

export const requestLoadClientCommentsInfo = createAction('[Client/ClientComments] Request client comment information',
                                                           props<{id: string, page: number}>());
export const loadClientCommentsInfo = createAction('[Client/ClientComments] Load client comment information',
                                                    props<{clientComments: ClientComments[]}>());
export const cleanClientCommentsInfo = createAction('[Client/ClientComments] Clean client comment information',
                                                    props<{clientComments: ClientComments[]}>());
export const requestCreateClientCommentsInfo = createAction('[Client/ClientComments] Request create comment information',
                                                             props<{client: ClientComments}>());
export const loadcreateClientCommentsInfo = createAction('[Client/ClientComments] Load create comment information',
                                                          props<{response: ClientComments}>());
export const requestUpdateClientCommentsInfo = createAction('[Client/ClientComments] Request update comment information',
                                                             props<{client: ClientComments}>());
export const loadupdateClientCommentsInfo = createAction('[Client/ClientComments] Load update comment information',
                                                          props<{response: ClientComments}>());
export const requesDeleteClientCommentsInfo = createAction('[Client/ClientComments] Request delete comment information',
                                                            props<{client: ClientComments}>());
export const loadDeleteClientCommentsInfo = createAction('[Client/ClientComments] Load delete comment information',
                                                          props<{client: ClientComments}>());

export const addClientCommentsInfo = createAction('[Client/ClientComments] Response add Client comment information',
                                                   props<{clientComment: ClientComments}>());
export const updateClientCommentsInfo = createAction('[Client/ClientComments] Response update Client comment information',
                                                   props<{clientComment: ClientComments}>());
export const deleteClientCommentsInfo = createAction('[Client/ClientComments] Response delete Client comment information',
                                                      props<{client: ClientComments}>());


