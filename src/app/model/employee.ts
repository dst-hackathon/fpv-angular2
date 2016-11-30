export class Employee {
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

  getImage() {
    return `/api/employees/${this.id}/image`;
  }
}
