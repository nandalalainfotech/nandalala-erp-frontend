import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManuHelpComponent } from './manu-help.component';

describe('ManuHelpComponent', () => {
  let component: ManuHelpComponent;
  let fixture: ComponentFixture<ManuHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManuHelpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManuHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
