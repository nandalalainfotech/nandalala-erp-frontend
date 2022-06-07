import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BBarchartComponent } from './b-barchart.component';

describe('BBarchartComponent', () => {
  let component: BBarchartComponent;
  let fixture: ComponentFixture<BBarchartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BBarchartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BBarchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
