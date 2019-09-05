import { Component, OnInit } from '@angular/core';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../_animations';
import { ActivatedRoute } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html',
  styleUrls: ['./add-document.component.scss']
})
export class AddDocumentComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  types = [
    {value: 'Purchase Request'},
    {value: 'Inventory and Inspection Report'},
    {value: 'Letter'},
    {value: 'Memorandum'},
    {value: 'Memorandum of Agreement'},
    {value: 'Unclassified'},
  ];
  for = [
    {value: 'appropriate action'},
    {value: 'comment/reaction/response'},
    {value: 'compliance/implementation'},
    {value: 'dissemination/recommendation'},
    {value: 'follow-up'},
    {value: 'draft of reply'},
    {value: 'investigation/verification and report'},
    {value: 'notification/reply to party'},
    {value: 'your information'},
  ];

  constructor(private route: ActivatedRoute, public dialog: MatDialog, private router: Router) { }
  tracking_number: any;
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.tracking_number = params['id']; 
    });
  }

  onFinalize(){
    this.dialog.open(DialogOnFinalize, {
      width: '450px'
    }).afterClosed().subscribe(result=> {
      if(result){
        this.router.navigate(['/home/doc', this.tracking_number]);
      }
    });
  }

}

@Component({
  selector: 'dialog-onfinalize',
  styleUrls: ['./add-document.component.scss'],
  template: `
  <div mat-dialog-title class="accent">
  <mat-icon>file_copy</mat-icon>
  <span>Finalize Document</span>
  </div>
  <div mat-dialog-content>
  You CANNOT make any changes to this document once it has been finalized. Are you sure you want to proceed?
  </div>
  <div mat-dialog-actions>
  <button mat-button (click)="onNoClick()">Cancel</button>
  <button mat-button [mat-dialog-close]="data" cdkFocusInitial>Ok</button>
</div>
  `,
})
export class DialogOnFinalize {
  data = true;
  constructor(
    public dialogRef: MatDialogRef<DialogOnFinalize>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
