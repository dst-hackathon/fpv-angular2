import {Plan} from './plan';

export class Changeset {
    effectiveDate: Date;
    id: number;
    plan: Plan;
    status: String;
}
