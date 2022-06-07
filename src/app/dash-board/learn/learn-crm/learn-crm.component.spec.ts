import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnCrmComponent } from './learn-crm.component';

describe('LearnCrmComponent', () => {
  let component: LearnCrmComponent;
  let fixture: ComponentFixture<LearnCrmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearnCrmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnCrmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
