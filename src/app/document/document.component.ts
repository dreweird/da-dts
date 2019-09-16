import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DataService } from '../_services/index.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';


@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit {
  tracking_number: any;
  delete_info: boolean = false;
  delete_id_name: any;
  draft: [];

  constructor(private router: Router, public dialog: MatDialog, private dataService: DataService, private snackBar: MatSnackBar) { 
    this.tracking_number = '2019-0805-0340-0001';
  }

  ngOnInit() {
    console.log(moment().format('MMM D YYYY h:mm a')); // en
    this.dataService.getDraftDoc().subscribe(data => {
      this.snackBar.open('Document fetched successfully.', '', {duration: 3000,});
      console.log(data);
      this.draft = data;
    },err=>{
    });
  }

  dateFormat(date){
    var d = new Date(date);
    return moment(d).format('MMM D YYYY h:mm a');
  }

  closeAlert(){
    this.delete_info = false;
  }

  edit(doc){
    console.log(doc.doc_id);
    this.dataService.saveTempDoc(doc);
    this.router.navigate(['/home/onadd', doc.doc_id]);
  }

  delete(i,doc){
    console.log(i);
    this.dialog.open(DialogOnDelete, {
      width: '450px'
    }).afterClosed().subscribe(result=> {
      if(result){
        this.dataService.deleteDoc(doc.doc_id).subscribe(data => {
          this.delete_info = true;
          this.delete_id_name = doc.title+" ("+doc.doc_id+")";
          this.draft.splice(i,1);
        },err=>{
        });
      }
    });
  }

  track(){
    this.router.navigate(['/home/track', this.tracking_number]);
  }

  print(){
    this.router.navigate(['/home/doc', this.tracking_number]);
  }
}

@Component({
  selector: 'dialog-onfinalize',
  styleUrls: ['./document.component.scss'],
  template: `
  <div mat-dialog-title class="accent">
  <mat-icon>delete</mat-icon>
  <span>Delete Document</span>
  </div>
  <div mat-dialog-content>
  Are you sure you want to delete this document? This action is irreversible.
  </div>
  <div mat-dialog-actions>
  <button mat-button (click)="onNoClick()">Cancel</button>
  <button mat-button [mat-dialog-close]="data" cdkFocusInitial>Ok</button>
</div>
  `,
})
export class DialogOnDelete {
  data = true;
  constructor(
    public dialogRef: MatDialogRef<DialogOnDelete>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
