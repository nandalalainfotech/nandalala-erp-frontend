import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HumanSetupComponent } from './human-setup.component';

describe('HumanSetupComponent', () => {
  let component: HumanSetupComponent;
  let fixture: ComponentFixture<HumanSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HumanSetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HumanSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
