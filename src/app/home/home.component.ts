import { Component, OnInit } from '@angular/core';
import { routeAnimations, AnimationsService } from '../_animations/index';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [routeAnimations]
})
export class HomeComponent implements OnInit {

  menu: any[] = [
    {
      title: 'Office Document',
      route: 'doc',
      icon: 'folder_shared',
      notif: false
    },
    {
      title: 'Pending for Release',
      route: 'pending',
      icon: 'table_chart',
      notif: true
    }         
  ];

  navigationSideMenu = [
    ...this.menu,
    { title: 'Log-out', route: 'logout'}

  ];
  constructor(private animationService: AnimationsService) {
    this.animationService.updateRouteAnimationType(true, true)
   }

  ngOnInit() {
  }

}
