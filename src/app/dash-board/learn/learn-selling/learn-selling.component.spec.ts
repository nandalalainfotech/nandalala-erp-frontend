import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnSellingComponent } from './learn-selling.component';

describe('LearnSellingComponent', () => {
  let component: LearnSellingComponent;
  let fixture: ComponentFixture<LearnSellingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearnSellingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnSellingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
