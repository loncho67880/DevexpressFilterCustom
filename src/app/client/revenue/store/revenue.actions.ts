import {createAction, props} from '@ngrx/store';
import { ClientRevenue } from '../models/clientRevenue';
import { ClientFee } from '../models/clientFee';

export const requestLoadClientRevenueInfo = createAction('[Client/revenue] Request Client Revenue data information', props<{id: string}>());
export const loadClientRevenueInfo = createAction('[Client/revenue] Load Client revenue data information',
                                                   props<{ clientRevenue: ClientRevenue}>());

export const requestLoadClientFeeInfo = createAction('[Client/revenue] Request Client Fee data information', props<{id: string}>());
export const loadClientFeeInfo = createAction('[Client/revenue] Load Client Fee data information', props<{ clientFee: ClientFee[]}>());
