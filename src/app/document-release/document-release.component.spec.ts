import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentReleaseComponent } from './document-release.component';

describe('DocumentReleaseComponent', () => {
  let component: DocumentReleaseComponent;
  let fixture: ComponentFixture<DocumentReleaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentReleaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentReleaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
