import { ReasonsRetentionLoss } from './ReasonsRetentionLoss';
import { ReasonsRFP } from './ReasonsRFP';

export class ClientRetentionDetails {
    id: string;
    companyId: string;
    outcomeId: string;
    date: Date;
    reasonsRetentionLoss: ReasonsRetentionLoss[];
    reasonsRFP: ReasonsRFP[];
    modifyBy: string;
    modifyDate: Date;

    constructor(id: string, companyId: string, outcomeId: string, date: Date
      , reasonsRetentionLoss: ReasonsRetentionLoss[], reasonsRFP: ReasonsRFP[], modifyBy: string, modifyDate: Date) {
        this.id = id;
        this.companyId = companyId;
        this.outcomeId = outcomeId;
        this.date = date;
        this.reasonsRetentionLoss = reasonsRetentionLoss;
        this.reasonsRFP = reasonsRFP;
        this.modifyBy = modifyBy;
        this.modifyDate = modifyDate;
    }
  }
