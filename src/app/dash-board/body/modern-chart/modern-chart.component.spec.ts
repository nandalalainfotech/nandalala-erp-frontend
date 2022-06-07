import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModernChartComponent } from './modern-chart.component';

describe('ModernChartComponent', () => {
  let component: ModernChartComponent;
  let fixture: ComponentFixture<ModernChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModernChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModernChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
