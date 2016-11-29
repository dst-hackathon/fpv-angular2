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

    getByteImage(){
        return "data:"+ this.imageContentType+";base64," + this.image;
    }
}
