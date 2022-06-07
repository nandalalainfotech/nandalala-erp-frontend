import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DotLineChartComponent } from './dot-line-chart.component';

describe('DotLineChartComponent', () => {
  let component: DotLineChartComponent;
  let fixture: ComponentFixture<DotLineChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DotLineChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DotLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
