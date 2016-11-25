export class Employee{
    id: number

    businessUnit: string
    code: string
    email: string
    firstname: string
    lastname: string

    image
    imageContentType: string
    
    mobile: string
    nickname: string
    position: string
    work: string

    static fromJson(jsonObject) : Employee{
        let emp = new Employee()
        emp.id = jsonObject.id
        emp.businessUnit = jsonObject.businessUnit
        emp.code = jsonObject.code
        emp.email = jsonObject.email
        emp.firstname = jsonObject.firstname
        emp.lastname = jsonObject.lastname

        emp.image = jsonObject.image
        emp.imageContentType = jsonObject.imageContentType

        emp.mobile = jsonObject.mobile
        emp.nickname = jsonObject.nickname
        emp.position = jsonObject.position
        emp.work = jsonObject.work

        return emp;
    }

    getByteImage(){
        return "data:"+ this.imageContentType+";base64," + this.image;
    }
}