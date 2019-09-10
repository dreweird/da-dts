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

  constructor(public dialog: MatDialog, private dataService: DataService,private route: ActivatedRoute, private snackBar: MatSnackBar) { }

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

