import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnProjectsComponent } from './learn-projects.component';

describe('LearnProjectsComponent', () => {
  let component: LearnProjectsComponent;
  let fixture: ComponentFixture<LearnProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearnProjectsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
