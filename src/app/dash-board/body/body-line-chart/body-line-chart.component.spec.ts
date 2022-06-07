import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyLineChartComponent } from './body-line-chart.component';

describe('BodyLineChartComponent', () => {
  let component: BodyLineChartComponent;
  let fixture: ComponentFixture<BodyLineChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BodyLineChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
