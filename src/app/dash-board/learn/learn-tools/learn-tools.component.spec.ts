import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnToolsComponent } from './learn-tools.component';

describe('LearnToolsComponent', () => {
  let component: LearnToolsComponent;
  let fixture: ComponentFixture<LearnToolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearnToolsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
