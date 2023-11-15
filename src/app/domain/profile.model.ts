export class Profile {
  private _id?:string;
  private _email:string;
  private _idToken: string;

  constructor(id: string, email: string, idToken : string) {
    this._id = id;
    this._email = email;
    this._idToken=idToken;
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


  get idToken(): string {
    return this._idToken;
  }

  set idToken(value: string) {
    this._idToken = value;
  }
}
