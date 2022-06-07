import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyPiechartComponent } from './body-piechart.component';

describe('BodyPiechartComponent', () => {
  let component: BodyPiechartComponent;
  let fixture: ComponentFixture<BodyPiechartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BodyPiechartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyPiechartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
