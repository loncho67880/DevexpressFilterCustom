import { CrossBoardPosition } from './crossBoardPosition';

export class ClientExecutive {
    id: string;
    companyGuid: string;
    companyId: number;
    name: string;
    personId: string;
    boardId: number;
    isLeadershipTeam: boolean;
    isBoardPosition: boolean;
    isSeniorManagerTeam: boolean;
    isOther: boolean;
    age: number;
    gender: string;
    currentRole: string;
    roleStartDate: Date;
    roleEndDate: Date;
    currentRoleTenure: number;
    hasBoardExProfile: boolean;
    auditFirmAlumni: string;
    relationshipStrengthId: string;
    modifyBy: string;
    modifyDate: Date;
    committeesListJSON: string;
    crossBoardPosition: CrossBoardPosition[];
  }
