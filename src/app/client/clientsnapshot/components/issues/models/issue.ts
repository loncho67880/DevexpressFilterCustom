export class Issue {
    id: string;
    value: string;
    sortOrder: number;
    createdBy: string;
    createdDate: string;
    modifyBy: string;
    modifyDate: string;
    isDeleted: boolean;

    constructor(value: string) {
      this.value = value;
    }
}

