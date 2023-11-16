export class UserModel {
  private _id: string;
  private _email: string;
  private _isAdmin: boolean;
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

 constructor(id: string, email: string, isAdmin: boolean, refreshToken: string, expiresIn: number) {
    this._id = id;
    this._email = email;
    this._isAdmin = isAdmin;
    this._refreshToken = refreshToken;
    this._expiresIn = expiresIn;
  }


  get expiresIn(): number {
    return this._expiresIn;
  }

  set expiresIn(value: number) {
    this._expiresIn = value;
  }

  public token() {

    if (!this._expiresIn ) {
      return null;
    }
    return this._refreshToken;
  }
}
