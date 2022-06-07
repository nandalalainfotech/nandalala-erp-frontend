import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockHelpComponent } from './stock-help.component';

describe('StockHelpComponent', () => {
  let component: StockHelpComponent;
  let fixture: ComponentFixture<StockHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockHelpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
