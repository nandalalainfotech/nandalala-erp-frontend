import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DelNoteTrendComponent } from './del-note-trend.component';

describe('DelNoteTrendComponent', () => {
  let component: DelNoteTrendComponent;
  let fixture: ComponentFixture<DelNoteTrendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DelNoteTrendComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DelNoteTrendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});