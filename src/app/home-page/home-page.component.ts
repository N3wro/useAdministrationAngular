import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../authentication.service";
import {UserModel} from "../domain/user.model";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit{

  userData: UserModel;
  constructor(private authService: AuthenticationService) { }
  ngOnInit()
  {
    this.authService.getUserData().subscribe( (data:UserModel) =>
      this.userData=data
    )
  }


}
