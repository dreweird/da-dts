import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-document-pending',
  templateUrl: './document-pending.component.html',
  styleUrls: ['./document-pending.component.scss']
})
export class DocumentPendingComponent implements OnInit {
  tracking_number: any;
  constructor(private router: Router) { 
    this.tracking_number = '2019-0805-0340-0001';
  }

  ngOnInit() {
  }

  open(){
    this.router.navigate(['/home/track', this.tracking_number]);
  }

}
