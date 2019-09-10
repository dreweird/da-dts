import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';
@Component({
  selector: 'app-document-track',
  templateUrl: './document-track.component.html',
  styleUrls: ['./document-track.component.scss']
})
export class DocumentTrackComponent implements OnInit {
  tracking_number: any;
  constructor(public dialog: MatDialog, private router: Router) { 
    this.tracking_number = '2019-0805-0340-0001';
  }

  ngOnInit() {
  }

  terminal(){
    this.dialog.open(DialogOnTrack, {
      width: '450px'
    }).afterClosed().subscribe(result=> {
      if(result){
        this.router.navigate(['/home/doc', this.tracking_number]);
      }
    });
  }

  release(){
    this.router.navigate(['/home/onrelease', this.tracking_number]);
  }

}

@Component({
  selector: 'dialog-ontrack',
  styleUrls: ['./document-track.component.scss'],
  template: `
  <div mat-dialog-title class="accent">
  <mat-icon>label</mat-icon>
  <span>Tag as Terminal</span>
  </div>
  <div mat-dialog-content>
  Are you sure you want to tag this document as terminal? Doing so indicates 
  that your office is the END of its papertrail.
  </div>
  <div mat-dialog-actions>
  <button mat-button (click)="onNoClick()">Cancel</button>
  <button mat-button [mat-dialog-close]="data" cdkFocusInitial>Ok</button>
</div>
  `,
})
export class DialogOnTrack {
  data = true;
  constructor(
    public dialogRef: MatDialogRef<DialogOnTrack>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

