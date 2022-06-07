import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnSupportComponent } from './learn-support.component';

describe('LearnSupportComponent', () => {
  let component: LearnSupportComponent;
  let fixture: ComponentFixture<LearnSupportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearnSupportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
