import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardChart2Component } from './card-chart2.component';

describe('CardChart2Component', () => {
  let component: CardChart2Component;
  let fixture: ComponentFixture<CardChart2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardChart2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardChart2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
