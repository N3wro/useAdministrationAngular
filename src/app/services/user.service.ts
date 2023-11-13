import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PostUserInfoModel} from "../domain/postUserInfo.model";
import {map, Subject, tap} from "rxjs";
import {Profile} from "../domain/profile.model";
import {user} from "@angular/fire/auth";
import {UserModel} from "../domain/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) {
  }

  private _users: Profile[] = [];
  profileChanged = new Subject<Profile[]>();


  get users(): Profile[] {
    return this._users;
  }


  set users(value: Profile[]) {
    this._users = value;
    this.profileChanged.next(this.users);
  }

  public onCreateUser(postData: Profile) {

    return this._http
      .put(
        'https://httppracticeyeah-default-rtdb.europe-west1.firebasedatabase.app/profile/' + postData.id + '.json',
        {
            email: postData.email

        }
      ).subscribe()
  }

  addProfile(profile: Profile) {
    this._users.push(profile);
    this.profileChanged.next(
      this._users.slice()
    )
  }

  fetchUser() {

    return this._http
      .get<any>(
        'https://httppracticeyeah-default-rtdb.europe-west1.firebasedatabase.app/profile/' + '.json'
      )
      .pipe(
        map(responseData => {

          const profiles: Profile[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              this.addProfile(
                new Profile(
                  key,
                  responseData[key].email
                ))
              profiles.push(new Profile(key, responseData[key].email))
            }
          }

          return profiles
        }),
        tap(responseData => {

          }
        ),
      )
  }

}
