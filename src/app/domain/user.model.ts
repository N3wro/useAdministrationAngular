export class UserModel {
  private _id: number;
  private _email: string;
  private _password:string;
  private _registered: boolean;
  private _refreshToken: string;
  private _expiresIn: number;

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

 constructor(id: number, email: string, password: string, registered: boolean, refreshToken: string, expiresIn: number) {
    this._id = id;
    this._email = email;
    this._password = password;
    this._registered = registered;
    this._refreshToken = refreshToken;
    this._expiresIn = expiresIn;
  }

  get registered(): boolean {
    return this._registered;
  }

  set registered(value: true) {
    this._registered = value;
  }

  get refreshToken(): string {
    return this._refreshToken;
  }

  set refreshToken(value: string) {
    this._refreshToken = value;
  }

  get expiresIn(): number {
    return this._expiresIn;
  }

  set expiresIn(value: number) {
    this._expiresIn = value;
  }
}
