import { Component, OnInit } from '@angular/core';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../_animations/index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  tracking_number: any;
  month: any;
  day: any;
  constructor(private router: Router) { }

  ngOnInit() {
    let year = new Date().getFullYear();
    let m = new Date().getMonth();
    let d = new Date().getDate();
    if(m < 10) { this.month = '0' + m }
    if(d < 10) { this.day = '0' + d }
    this.tracking_number = year + '-' + this.month + this.day + '-' + '0340-0001';
  }

  onAdd(){
    this.router.navigate(['/home/onadd', this.tracking_number]);
  }

}
