import {Plan} from './plan';

export class Changeset {
    effectiveDate: Date;
    id: number;
    plan: Plan;
    status: String;

    static fromJson(jsonObject): Changeset{
        let changeset = new Changeset();
        changeset.effectiveDate = jsonObject.effectiveDate
        changeset.id = jsonObject.id
        changeset.plan = Plan.fromJson(jsonObject.plan);
        changeset.status = jsonObject.status

        return changeset;
    }


}
    