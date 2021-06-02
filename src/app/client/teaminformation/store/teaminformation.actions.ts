import {createAction, props} from '@ngrx/store';
import { CommitteeCategory} from './../models/committeeCategory';
import { EngagementTeamRoles } from '../models/engagementTeamRoles';
import { ClientExecutive } from './../models/clientExecutive';
import { RelationshipStrength} from './../models/relationshipStrength';
import { AuditFirm } from '../models/auditFirm';

export const requestLoadEngagementTeamRolesInfo =
                createAction('[Client/Teaminformation] Request client team Roles   ', props<{id: string}>());
export const loadEngagementTeamRolesInfo =
                createAction('[Client/Teaminformation] Load client Team Roles ', props<{ engagementTeamRoles: EngagementTeamRoles}>());

export const requestLoadClientExecutiveInfo =
                createAction('[Client/Teaminformation] Request client Executive information   ', props<{id: string}>());
export const loadClientExecutiveInfo =
                createAction('[Client/Teaminformation] Load client Executive information ', props<{ clientExecutive: ClientExecutive[]}>());

export const requestLoadRelationshipStrengthInfo =
                createAction('[Client/Teaminformation] Request client Realionship Strenght information');
export const loadRelationshipStrengthInfo =
                createAction('[Client/Teaminformation] Load client Relationship Strenght information ',
                              props<{ relationshipStrength: RelationshipStrength[]}>());

// delete client executive
export const requesDeleteClientExecutiveInfo =
                createAction('[Client/ClientExecutive] Request delete executive information', props<{executive: ClientExecutive}>());
export const loadDeleteClientExecutiveInfo =
                createAction('[Client/ClientExecutive] Load delete executive information', props<{executive: ClientExecutive}>());

// update relationship type
export const requestUpdateClientExecutiveRelationshipInfo =
                createAction('[Client/ClientExecutive] Request update Client Executive', props<{executive: ClientExecutive}>());
export const loadUpdateClientExecutiveRelationshipInfo =
                createAction('[Client/ClientExecutive] Load update  Client Executive ', props<{executive: ClientExecutive}>());

// add relationship type
export const requestAddClientExecutiveInfo =
                createAction('[Client/ClientExecutive] Request add Client Executive', props<{executive: ClientExecutive}>());
export const loadAddClientExecutiveInfo =
                createAction('[Client/ClientExecutive] Load add Client Executive ', props<{executive: ClientExecutive}>());

export const loadEditExecutiveInfo =
                createAction('[Client/Teaminformation] Load Edit Client Executive information ', props<{ executive: ClientExecutive}>());

// commitee Category
export const requestLoadCommitteeCategoryInfo = createAction('[Client/Teaminformation] Request client Executive  Committe Category information');
export const loadCommitteeCategoryInfo =
                createAction('[Client/Teaminformation] Load client Executive Commitee Caregory',
                              props<{ committeeCategory: CommitteeCategory[]}>());

export const requestLoadAuditFirmInfo = createAction('[Client/Teaminformation] Request Audir Firm information');
export const loadAuditFirmInfo = createAction('[Client/Teaminformation] Load Audit firm', props<{ auditFirm: AuditFirm[]}>());

export const requestClientExecutiveReport = createAction('[Client/TeamInformation] Cleint executive Teble Report', props<{id: string}>());
