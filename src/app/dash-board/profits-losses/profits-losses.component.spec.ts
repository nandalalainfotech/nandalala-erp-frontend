import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfitsLossesComponent } from './profits-losses.component';

describe('ProfitsLossesComponent', () => {
  let component: ProfitsLossesComponent;
  let fixture: ComponentFixture<ProfitsLossesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfitsLossesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfitsLossesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
