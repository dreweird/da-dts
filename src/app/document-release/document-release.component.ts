import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-document-release',
  templateUrl: './document-release.component.html',
  styleUrls: ['./document-release.component.scss']
})
export class DocumentReleaseComponent implements OnInit {

  uploader:FileUploader = new FileUploader({url:'http://172.16.130.10:4001/upload', allowedFileType: ['image', 'pdf']});
  uploader2:FileUploader = new FileUploader({url:'http://172.16.130.10:4001/upload', allowedFileType: ['image', 'pdf']});

  actions = [
    {value: 'Approved'},
    {value: 'Disapproved'},
    {value: 'Endorse'},
    {value: 'No Action'},
    {value: 'Received'},
    {value: 'Return to Sender'},
  ];


  constructor() {
    this.uploader.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
    };
    this.uploader2.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
    }
   }

  ngOnInit() {
  }

}
