import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuService } from '../../services/menu.service';
import { ActivatedRoute } from '@angular/router';

export interface Item {
  name: string;
  cost: string;
  description: string;
  url: string;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  items: Observable<Item[]>;

  constructor(
    private menuservice: MenuService,
    private router: ActivatedRoute,
  ) {
    this.items = menuservice.getItems(router.snapshot.paramMap.get('rid'));
  }

  ngOnInit() {
  }

}
