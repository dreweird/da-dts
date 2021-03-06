import { Component, OnInit } from '@angular/core';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../_animations';
import { ActivatedRoute } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';
import {FormControl, FormGroup, Validators, FormArray, FormBuilder} from '@angular/forms';
import { DataService } from '../_services/index.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html',
  styleUrls: ['./add-document.component.scss']
})
export class AddDocumentComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  uploader:FileUploader = new FileUploader({url:'http://172.16.130.10:4001/upload', allowedFileType: ['image', 'pdf']});
  
  fileName:any;
  temp_fileName:any;
  documentForm: FormGroup;
  tracking_number: any;
  for_: [any];
  temp_for_: [any];
  types = [
    {value: 'Purchase Request'},
    {value: 'Inventory and Inspection Report'},
    {value: 'Letter'},
    {value: 'Memorandum'},
    {value: 'Memorandum of Agreement'},
    {value: 'Unclassified'},
  ];
  for = [
    {index: 0,value: 'appropriate action'},
    {index: 1,value: 'comment/reaction/response'},
    {index: 2,value: 'compliance/implementation'},
    {index: 3,value: 'dissemination/recommendation'},
    {index: 4,value: 'follow-up'},
    {index: 5,value: 'draft of reply'},
    {index: 6,value: 'investigation/verification and report'},
    {index: 7,value: 'notification/reply to party'},
    {index: 8,value: 'your information'},
  ];

  constructor(private route: ActivatedRoute, public dialog: MatDialog, private router: Router, private dataService: DataService, private snackBar: MatSnackBar) { 
    this.uploader.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
    }
  }

  ngOnInit() {
    
    var temp = this.dataService.getTempDoc();
    
    // create checkbox group
    let checkboxGroup = new FormArray(this.for.map(item => new FormGroup({
      id: new FormControl(item.index),
      text: new FormControl(item.value),
      checkbox: new FormControl(false)
    })));

    // create a hidden reuired formControl to keep status of checkbox group
    let hiddenControl = new FormControl(this.mapItems(checkboxGroup.value), Validators.required);
    // update checkbox group's value to hidden formcontrol
    checkboxGroup.valueChanges.subscribe((v) => {
      hiddenControl.setValue(this.mapItems(v));
    });

    this.documentForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      remarks: new FormControl('', [Validators.required]),
      file: new FormControl('', []),
      items: checkboxGroup,
      selectedItems: hiddenControl
    });

    this.route.params.subscribe(params => {
      this.tracking_number = params['id']; 
      if(temp!=undefined){
        console.log(temp.doc_id+" = "+this.tracking_number);
        if(temp.doc_id==this.tracking_number){
          console.log(temp);
          this.temp_fileName = temp.file;
          this.temp_for_ = temp.for_;
          this.documentForm = new FormGroup({
            title: new FormControl(temp.title, [Validators.required]),
            type: new FormControl(temp.type, [Validators.required]),
            remarks: new FormControl(temp.remarks, [Validators.required]),
            file: new FormControl('', []),
            items: checkboxGroup,
            selectedItems: hiddenControl
          });
        }
      }
    });
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log(response);
      this.fileName=(JSON.parse(response).filename);
      this.dataService.addDoc(this.documentForm.value,this.tracking_number,0,this.fileName)
      .subscribe(data => {
        this.snackBar.open('Document saved as draft.', '', {duration: 3000,});
        this.router.navigate(['/home/doc']);
      },err=>{
        this.snackBar.open('Error: Please see console.', '', {duration: 3000,});
      });
    };
  }
  
  check(val){
    var bool = false;
    //console.log(this.temp_for_);
    //console.log(val);
    if(this.temp_for_!=undefined){
      this.temp_for_.forEach(element => {
        if(val == element.desc){ bool = true; console.log(element); 
          return true;}
      });
    }
    console.log()
  }

  mapItems(items) {
    let selectedItems = items.filter((item) => item.checkbox).map((item) => item.id);
    return selectedItems.length ? selectedItems : null;
  }

  onDraft(){
    this.uploader.uploadAll();
    
  }
  onFinalize(){

    this.dialog.open(DialogOnFinalize, {
      width: '450px'
    }).afterClosed().subscribe(result=> {
      if(result){
        this.dataService.addDoc(this.documentForm.value,this.tracking_number,1,this.fileName)
        .subscribe(data => {
          this.snackBar.open('Document saved as final.', '', {duration: 3000,});
          this.router.navigate(['/home/doc', this.tracking_number]);
        },err=>{
          this.snackBar.open('Error: Please see console.', '', {duration: 3000,});
        });

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
