import { Component, OnInit, Input  } from '@angular/core';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../_animations/index';
import { Router } from '@angular/router';
import { AuthService } from '../_services/index.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  code: any;
  ctr: any;
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  tracking_number: any;
  month: any;
  day: any;
  constructor(private router: Router,private authService: AuthService,) { }

  ngOnInit() {
    this.authService.verify().subscribe(data => {
      if(!data){
        this.router.navigate(['/login']);
      }else {
        console.log(data);
        this.code =  data.code;
        this.ctr =  data.ctr;
        var view_ctr="";
        if(this.ctr<10) view_ctr ="000"+(this.ctr+1);
        else if(this.ctr<100) view_ctr ="00"+(this.ctr+1);
        else if(this.ctr<1000) view_ctr ="0"+(this.ctr+1);
        else view_ctr =(this.ctr+1);
        let year = new Date().getFullYear();
        let m = new Date().getMonth();
        let d = new Date().getDate();
        if(m < 10) { this.month = '0' + m } else this.month = m;
        if(d < 10) { this.day = '0' + d } else this.day = d;
        this.tracking_number = year + '-' + this.month + this.day + '-' + this.code+'-'+view_ctr;
      }
    });
  }

  onAdd(){
    this.router.navigate(['/home/onadd', this.tracking_number]);
  }

}
