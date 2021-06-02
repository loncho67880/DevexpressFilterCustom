import {createAction, props} from '@ngrx/store';
import { AdvantagedClient } from '../models/advantageclient';

export const requestLoadPocFilterAdvantagedClientInfo =
                createAction('[PocFilter] Request Advantaged Client information', props<{page: number}>());
export const loadAdvantagedClientInfo =
                createAction('[PocFilter] Load Advantaged Client information', props<{advantagedClient: AdvantagedClient[]}>());
