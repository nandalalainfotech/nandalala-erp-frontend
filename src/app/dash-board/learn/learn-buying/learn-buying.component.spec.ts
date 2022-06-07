import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnBuyingComponent } from './learn-buying.component';

describe('LearnBuyingComponent', () => {
  let component: LearnBuyingComponent;
  let fixture: ComponentFixture<LearnBuyingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearnBuyingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnBuyingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
