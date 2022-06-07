import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmHelpComponent } from './crm-help.component';

describe('CrmHelpComponent', () => {
  let component: CrmHelpComponent;
  let fixture: ComponentFixture<CrmHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrmHelpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
