import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuService } from '../../services/menu.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../../models/item';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  items: Observable<Item[]>;
  rid: string;

  constructor(
    private menuservice: MenuService,
    private routerAct: ActivatedRoute,
    private route: Router,
  ) { }

  ngOnInit() {
    this.rid = this.routerAct.snapshot.paramMap.get('rid')
    this.items = this.menuservice.getItems(this.rid);
  }

  getItem(iid) {
    console.log(iid);
    this.route.navigate(['/members/itemview', this.rid, iid]);
  }

}
