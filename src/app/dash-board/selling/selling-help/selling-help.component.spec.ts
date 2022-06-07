import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellingHelpComponent } from './selling-help.component';

describe('SellingHelpComponent', () => {
  let component: SellingHelpComponent;
  let fixture: ComponentFixture<SellingHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellingHelpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellingHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
