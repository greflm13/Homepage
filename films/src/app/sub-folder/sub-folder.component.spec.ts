import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SubFolderComponent } from './sub-folder.component';

describe('SubFolderComponent', () => {
  let component: SubFolderComponent;
  let fixture: ComponentFixture<SubFolderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SubFolderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubFolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
