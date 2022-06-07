import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnStockComponent } from './learn-stock.component';

describe('LearnStockComponent', () => {
  let component: LearnStockComponent;
  let fixture: ComponentFixture<LearnStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearnStockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
