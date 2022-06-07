import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SChartComponent } from './s-chart.component';

describe('SChartComponent', () => {
  let component: SChartComponent;
  let fixture: ComponentFixture<SChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
