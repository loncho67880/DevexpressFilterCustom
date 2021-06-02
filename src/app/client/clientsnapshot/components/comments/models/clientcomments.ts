export class ClientComments {
  id: string;
  companyId: string;
  value: string;
  modifyBy: string;
  modifyDate: Date;
  isDeleted: boolean;

  constructor(id: string, companyId: string, value: string, modifyBy: string,
    modifyDate: Date, isDeleted: boolean) {
    this.id = id;
    this.companyId = companyId;
    this.value = value;
    this.modifyBy = modifyBy;
    this.modifyDate = modifyDate;
    this.isDeleted = isDeleted;
  }

}
