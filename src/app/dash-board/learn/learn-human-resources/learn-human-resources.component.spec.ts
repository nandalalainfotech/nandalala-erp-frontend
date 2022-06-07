import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnHumanResourcesComponent } from './learn-human-resources.component';

describe('LearnHumanResourcesComponent', () => {
  let component: LearnHumanResourcesComponent;
  let fixture: ComponentFixture<LearnHumanResourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearnHumanResourcesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnHumanResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
