import {Plan} from './plan';

export class Building {
    id: number;
    name: string;

    plan: Plan

    static fromJson(jsonObject) : Building{
        let building = new Building()
        building.id = jsonObject.id;
        building.name = jsonObject.name;
        building.plan = Plan.fromJson(jsonObject.plan);

        return building;
    }
}