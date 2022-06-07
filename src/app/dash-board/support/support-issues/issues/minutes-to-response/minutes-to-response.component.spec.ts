import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinutesToResponseComponent } from './minutes-to-response.component';

describe('MinutesToResponseComponent', () => {
  let component: MinutesToResponseComponent;
  let fixture: ComponentFixture<MinutesToResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinutesToResponseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MinutesToResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
