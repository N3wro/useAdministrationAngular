export class UserModel {
  private _id: string;
  private _email: string;
  private _registered: boolean;
  private _refreshToken: string;
  private _expiresIn: number;

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

 constructor(id: string, email: string, registered: boolean, refreshToken: string, expiresIn: number) {
    this._id = id;
    this._email = email;

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

  get token() {
    if (!this._expiresIn ||   new Date(this.expiresIn).getTime() < new Date().getTime()) {
      return null;
    }
    return this._expiresIn;
  }
}
