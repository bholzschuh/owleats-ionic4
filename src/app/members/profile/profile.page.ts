import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user = {} as User;
  loaded: boolean = false;

  constructor(
    private userservice: UserService,
    private loadingController: LoadingController,
  ) { }

  ngOnInit() {
    this.presentLoading();
    this.userservice.getUserInfo().subscribe(res => {
      this.user = res;
      this.loaded = true;
      //this.loadingController.dismiss();
    });
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: "Loading",
      duration: 500,
    });
    return await loading.present();
  }

}
