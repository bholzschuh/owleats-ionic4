import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuService } from '../../services/menu.service';
import { ActivatedRoute } from '@angular/router';
import { Item } from '../../models/item';


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
  ) { }

  ngOnInit() {
    this.items = this.menuservice.getItems(this.router.snapshot.paramMap.get('rid'));
  }

}
