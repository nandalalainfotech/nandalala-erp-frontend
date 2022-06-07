import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnAccountsComponent } from './learn-accounts.component';

describe('LearnAccountsComponent', () => {
  let component: LearnAccountsComponent;
  let fixture: ComponentFixture<LearnAccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearnAccountsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
