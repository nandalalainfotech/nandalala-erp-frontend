import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyingHelpComponent } from './buying-help.component';

describe('BuyingHelpComponent', () => {
  let component: BuyingHelpComponent;
  let fixture: ComponentFixture<BuyingHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyingHelpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyingHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
