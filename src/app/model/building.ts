export class Building {
    id: number;
    name: string;


    building: number

    static fromJson(jsonObject) : Building{
        let building = new Building()
        building.id = jsonObject.id
        building.name = jsonObject.name

        return building;
    }
}