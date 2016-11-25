export class Plan {
    id: number;
    name: string;

    static fromJson(jsonObject) : Plan{
        let plan = new Plan();
        plan.id = jsonObject.id;
        plan.name = jsonObject.name;
        return plan;
    }
}

