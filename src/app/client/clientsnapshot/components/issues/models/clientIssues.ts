export class ClientIssues {
  id: string;
  companyId: string;
  issueId: string;
  severityId: string;
  actionId: string;
  additionalDetails: string;
  actionSeverityId: string;
  actionAdditionalDetails: string;
  modifyBy: string;
  modifyDate: Date;

  constructor(id: string,
              companyId: string,
              issueId: string,
              severityId: string,
              actionId: string,
              additionalDetails: string,
              actionSeverityId: string,
              actionAdditionalDetails: string,
              modifyBy: string,
              modifyDate: Date) {
    this.id = id;
    this.companyId = companyId;
    this.issueId = issueId;
    this.severityId = severityId;
    this.actionId = actionId;
    this.additionalDetails = additionalDetails;
    this.actionSeverityId = actionSeverityId;
    this.actionAdditionalDetails = actionAdditionalDetails;
    this.modifyBy = modifyBy;
    this.modifyDate = modifyDate;
  }

  public static create(): ClientIssues {
    return new ClientIssues('', '', '', '', '', '', '', '', '', null);
  }
}
