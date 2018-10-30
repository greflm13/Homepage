import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubFolderComponent } from './sub-folder.component';

describe('SubFolderComponent', () => {
  let component: SubFolderComponent;
  let fixture: ComponentFixture<SubFolderComponent>;

  beforeEach(async(() => {
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
