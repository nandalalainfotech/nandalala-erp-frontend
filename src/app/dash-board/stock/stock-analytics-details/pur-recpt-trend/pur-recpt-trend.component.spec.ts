import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PurRecptTrendComponent } from './pur-recpt-trend.component';

describe('PurRecptTrendComponent', () => {
  let component: PurRecptTrendComponent;
  let fixture: ComponentFixture<PurRecptTrendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PurRecptTrendComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurRecptTrendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});