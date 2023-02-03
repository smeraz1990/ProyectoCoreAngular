export class User {
  constructor(
    public id: number,
    public email: string,
    public first_name: string,
    public last_name: string,
    public password: string,
    public token : string,
    public bitadmin : string,
    
  ) {}

  get fullName() {
    return this.first_name + ' ' + this.last_name
  }
}
