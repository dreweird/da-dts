import { Component, OnInit } from '@angular/core';
import { routeAnimations, AnimationsService } from '../_animations/index';
import { Router } from '@angular/router';
import { AuthService } from '../_services/index.service';
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
  constructor(private router: Router,private animationService: AnimationsService,private authService: AuthService,) {
    this.animationService.updateRouteAnimationType(true, true)
   }

  ngOnInit() {
    // this.authService.verify().subscribe(data => {
    //   if(!data){
    //     this.router.navigate(['/login']);
    //   }
    // });
    
  }

  onLogoutClick() {
    this.router.navigate(['login']);
    localStorage.clear();
  }
}
