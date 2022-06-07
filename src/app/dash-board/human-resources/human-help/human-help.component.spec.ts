import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HumanHelpComponent } from './human-help.component';

describe('HumanHelpComponent', () => {
  let component: HumanHelpComponent;
  let fixture: ComponentFixture<HumanHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HumanHelpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HumanHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
