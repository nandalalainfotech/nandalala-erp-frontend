import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StockAnalyticsDetailsComponent } from './stock-analytics-details.component';

describe('StockAnalyticsDetailsComponent', () => {
  let component: StockAnalyticsDetailsComponent;
  let fixture: ComponentFixture<StockAnalyticsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StockAnalyticsDetailsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockAnalyticsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});