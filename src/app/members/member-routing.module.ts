import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardPageModule' },
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' },
  { path: 'restaurants', loadChildren: './restaurants/restaurants.module#RestaurantsPageModule' },
  { path: 'menu/:rid', loadChildren: './menu/menu.module#MenuPageModule' },
  { path: 'itemview/:rid/:iid', loadChildren: './itemview/itemview.module#ItemviewPageModule' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberRoutingModule { }
