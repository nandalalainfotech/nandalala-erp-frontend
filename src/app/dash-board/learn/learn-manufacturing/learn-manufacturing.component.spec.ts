import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnManufacturingComponent } from './learn-manufacturing.component';

describe('LearnManufacturingComponent', () => {
  let component: LearnManufacturingComponent;
  let fixture: ComponentFixture<LearnManufacturingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearnManufacturingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnManufacturingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
