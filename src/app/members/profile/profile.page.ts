import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user = {} as User;

  constructor(
    private userservice: UserService,
  ) { }

  ngOnInit() {
    this.userservice.getUserInfo().subscribe(res => {
      this.user = res;
    });
  }

}
