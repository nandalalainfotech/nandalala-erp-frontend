import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmCommDetailsComponent } from './crm-comm-details.component';

describe('CrmCommDetailsComponent', () => {
  let component: CrmCommDetailsComponent;
  let fixture: ComponentFixture<CrmCommDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrmCommDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmCommDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
