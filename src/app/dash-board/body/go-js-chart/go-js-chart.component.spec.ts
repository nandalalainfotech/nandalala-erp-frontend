import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoJsChartComponent } from './go-js-chart.component';

describe('GoJsChartComponent', () => {
  let component: GoJsChartComponent;
  let fixture: ComponentFixture<GoJsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoJsChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoJsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
