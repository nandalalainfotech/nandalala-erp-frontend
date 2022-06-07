import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoJsChartModel1Component } from './go-js-chart-model1.component';

describe('GoJsChartModel1Component', () => {
  let component: GoJsChartModel1Component;
  let fixture: ComponentFixture<GoJsChartModel1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoJsChartModel1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoJsChartModel1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
