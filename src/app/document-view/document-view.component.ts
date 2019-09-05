import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../_animations';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-document-view',
  templateUrl: './document-view.component.html',
  styleUrls: ['./document-view.component.scss']
})
export class DocumentViewComponent implements OnInit {

  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  @ViewChild('alertinfo', {static: false}) private alertinfo: ElementRef;
  @ViewChild('alertsuccess', {static: false}) private alertsuccess: ElementRef;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  closeAlert(){
    this.alertsuccess.nativeElement.remove();
  }

  closeAlert2(){
    this.alertinfo.nativeElement.remove();
  }

  onPrint(){
    this.dialog.open(DialogOnPrint, {
      width: '450px'
    }).afterClosed().subscribe(result=> {
      if(result){
       // this.router.navigate(['/home/doc', this.tracking_number]);
      }
    });
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

