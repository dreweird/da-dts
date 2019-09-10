import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../_animations';


@Component({
  selector: 'app-document-view',
  templateUrl: './document-view.component.html',
  styleUrls: ['./document-view.component.scss']
})
export class DocumentViewComponent implements OnInit {

  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  @ViewChild('alertinfo', {static: false}) private alertinfo: ElementRef;
  @ViewChild('alertsuccess', {static: false}) private alertsuccess: ElementRef;
  @ViewChild('printSection', {static: false}) private printSection: ElementRef;
  @ViewChild('alertTerminal', {static: false}) private alertTerminal: ElementRef;
  myAngularxQrCode: string;

  constructor() {
    this.myAngularxQrCode = "Sample Code";
   }

  ngOnInit() {
  }

  closeAlert(){
    this.alertsuccess.nativeElement.remove();
  }

  closeAlert2(){
    this.alertinfo.nativeElement.remove();
  }

  closeAlert3(){
    this.alertTerminal.nativeElement.remove();
  }

  onPrint(){
  
      let my_window = window.open('', 'mywindow', 'status=1,width=auto,height=100%');
      my_window.document.write(`
        <html>
        <head>
          <title>Cover Page - DTS</title>
          <style>
          .title { display: none !important; }
            .header {   
              display: block;
              margin-left: auto;
              margin-right: auto;
            }
            .center { text-align: center;}
            .track { font-size: 30px; font-weight: bold; }
            table {
              width: 100%;
              margin-bottom: 15px;
              color: black;
              background-color: white;
              font-size: 20px; 
            }
               
            th,
            td {
              padding: 10px;
              vertical-align: top;
              border-top: 1px solid #dee2e6;
              text-align: left;
              margin-left: 10px;
            }
          
            thead th {
              vertical-align: bottom;
              border-bottom: 4px solid #dee2e6;
            }
          
            tbody + tbody {
              border-top: 4px solid #dee2e6;
            }
            
          </style>
        </head>
        <body onafterprint="self.close()">
          <img class="header" src="../../assets/header.png"> 
          <hr>
          <h1 class="center">Document Tracking System</h1>
          <h2 class="center">Cover Page</h2> `);
      my_window.document.write(this.printSection.nativeElement.innerHTML);
      my_window.document.write('</body></html>'); 
  
  }

}





