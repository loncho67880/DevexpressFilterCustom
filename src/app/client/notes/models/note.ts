import {Topic} from './topic';

export interface Note {
    id: string;
    clientId: string;
    value: string;
    sortOrder: number;
    modifyBy: string;
    modifyDate: string;
    topics: Topic[];
}
