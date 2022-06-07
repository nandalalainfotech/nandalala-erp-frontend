import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardChart3Component } from './card-chart3.component';

describe('CardChart3Component', () => {
  let component: CardChart3Component;
  let fixture: ComponentFixture<CardChart3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardChart3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardChart3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
