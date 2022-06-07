import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SChartPieComponent } from './s-chart-pie.component';

describe('SChartPieComponent', () => {
  let component: SChartPieComponent;
  let fixture: ComponentFixture<SChartPieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SChartPieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SChartPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
