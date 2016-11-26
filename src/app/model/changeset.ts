export class Changeset {
    id: number;
    effectivedate: string;
    status : string;


    static fromJson(jsonObject) : Changeset{
        let changeset = new Changeset()
        changeset.id = jsonObject.id
        changeset.effectivedate = jsonObject.effectivedate
        changeset.status = jsonObject.effectivedate
        return changeset;
    }
}