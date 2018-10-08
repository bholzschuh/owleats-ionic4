import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemviewService } from '../../services/itemview.service';
import { Item } from '../../models/item';

@Component({
  selector: 'app-itemview',
  templateUrl: './itemview.page.html',
  styleUrls: ['./itemview.page.scss'],
})
export class ItemviewPage implements OnInit {

  rid: string;
  iid: string;
  item = {} as Item;

  constructor(
    private routerAct: ActivatedRoute,
    private itemservice: ItemviewService,
  ) { }

  ngOnInit() {
    this.rid = this.routerAct.snapshot.paramMap.get('rid');
    this.iid = this.routerAct.snapshot.paramMap.get('iid');
    //console.log('rid: ' + this.rid + ' iid: ' + this.iid);
    this.itemservice.getItemInfo(this.rid, this.iid).subscribe(res => {
      this.item = res;
      //console.log(this.item);
    })
  }

}
