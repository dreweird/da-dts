import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../_animations';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DataService } from '../_services/index.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-document-view',
  templateUrl: './document-view.component.html',
  styleUrls: ['./document-view.component.scss']
})
export class DocumentViewComponent implements OnInit {

  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  tracking_number:any;
  title: any;
  type: any;
  remarks: any;
  office: any;
  date: any;
  email: any;
  file: any;
  mos = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

  @ViewChild('alertinfo', {static: false}) private alertinfo: ElementRef;
  @ViewChild('alertsuccess', {static: false}) private alertsuccess: ElementRef;
  @ViewChild('printSection', {static: false}) private printSection: ElementRef;
  myAngularxQrCode: string;

  constructor(public dialog: MatDialog, private dataService: DataService,private route: ActivatedRoute, private snackBar: MatSnackBar) { 
    this.myAngularxQrCode = "Sample Code";
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.tracking_number = params['id']; 
    });
    this.dataService.getDoc(this.tracking_number).subscribe(data => {
      this.snackBar.open('Document fetched successfully.', '', {duration: 3000,});
      console.log(data);
      this.title = data[0].title;
      this.type = data[0].doc_type;
      this.remarks = data[0].remarks;
      this.office = data[0].name;
      var d = new Date(data[0].date_created);
      this.date = this.mos[d.getMonth()]+" "+d.getDate()+", "+d.getFullYear()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
      this.email = data[0].email;
      this.file = data[0].file;
    },err=>{
    });
  }

  closeAlert(){
    this.alertsuccess.nativeElement.remove();
  }

  closeAlert2(){
    this.alertinfo.nativeElement.remove();
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

@Component({
  selector: 'dialog-onprint',
  styleUrls: ['./document-view.component.scss'],
  templateUrl: './document-print.component.html',
})
export class DialogOnPrint {
  data = true;
  constructor(
    public dialogRef: MatDialogRef<DialogOnPrint>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}




