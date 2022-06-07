import { ComponentFixture, TestBed } from '@angular/core/testing';

import { APiechartComponent } from './a-piechart.component';

describe('APiechartComponent', () => {
  let component: APiechartComponent;
  let fixture: ComponentFixture<APiechartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ APiechartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(APiechartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
