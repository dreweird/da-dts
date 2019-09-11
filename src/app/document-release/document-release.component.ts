import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-document-release',
  templateUrl: './document-release.component.html',
  styleUrls: ['./document-release.component.scss']
})
export class DocumentReleaseComponent implements OnInit {

  actions = [
    {value: 'Approved'},
    {value: 'Disapproved'},
    {value: 'Endorse'},
    {value: 'No Action'},
    {value: 'Received'},
    {value: 'Return to Sender'},
  ];


  constructor() { }

  ngOnInit() {
  }

}
