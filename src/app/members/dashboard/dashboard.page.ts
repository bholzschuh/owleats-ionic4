import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { auth } from 'firebase';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(private authservice: AuthService) { }

  ngOnInit() {
  }

  logout() {
    this.authservice.logout();
  }

}
