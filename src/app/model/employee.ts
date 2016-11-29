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

  getByteImage() {
    if (this.image && this.imageContentType) {
      return "data:" + this.imageContentType + ";base64," + this.image;
    }

    return null;
  }
}
