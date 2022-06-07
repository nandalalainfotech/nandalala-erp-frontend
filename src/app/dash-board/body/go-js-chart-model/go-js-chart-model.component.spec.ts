import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoJsChartModelComponent } from './go-js-chart-model.component';

describe('GoJsChartModelComponent', () => {
  let component: GoJsChartModelComponent;
  let fixture: ComponentFixture<GoJsChartModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoJsChartModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoJsChartModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
