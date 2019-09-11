import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DataService } from '../_services/index.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit {
  tracking_number: any;
  delete_info: boolean = false;
  draft: [];

  constructor(private router: Router, public dialog: MatDialog, private dataService: DataService, private snackBar: MatSnackBar) { 
    this.tracking_number = '2019-0805-0340-0001';
  }

  ngOnInit() {
    this.dataService.getAllDoc().subscribe(data => {
      this.snackBar.open('Document fetched successfully.', '', {duration: 3000,});
      console.log(data);
      this.draft = data;
    },err=>{
    });
  }

  closeAlert(){
    this.delete_info = false;
  }

  edit(){
    this.router.navigate(['/home/onadd', this.tracking_number]);
  }
  delete(){
    this.dialog.open(DialogOnDelete, {
      width: '450px'
    }).afterClosed().subscribe(result=> {
      if(result){
        this.delete_info = true;
      }
    });
  }

  track(){
    this.router.navigate(['/home/track', this.tracking_number]);
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
