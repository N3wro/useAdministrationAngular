export class Profile {
  private _id?:string;
  private _email:string;


  constructor(id: string, email: string) {
    this._id = id;
    this._email = email;
  }


  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }
}
