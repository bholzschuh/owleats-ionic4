import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

export interface Vendor {
  name: string;
  rid: string;
  //description: string;
}

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.page.html',
  styleUrls: ['./restaurants.page.scss'],
})
export class RestaurantsPage implements OnInit {

  vendors: Observable<Vendor[]>;

  constructor(
    private menuservice: MenuService,
    private route: Router,
  ) {
    this.vendors = menuservice.getVendors();
  }

  ngOnInit() {
  }

  getMenu(rid) {
    console.log(rid);
    this.route.navigate(['/members/menu', rid]);
  }

}
