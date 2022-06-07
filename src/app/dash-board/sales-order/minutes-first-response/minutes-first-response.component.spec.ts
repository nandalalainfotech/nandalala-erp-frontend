import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinutesFirstResponseComponent } from './minutes-first-response.component';

describe('MinutesFirstResponseComponent', () => {
  let component: MinutesFirstResponseComponent;
  let fixture: ComponentFixture<MinutesFirstResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinutesFirstResponseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MinutesFirstResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
