import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusOfSiteComponent } from './status-of-site.component';

describe('StatusOfSiteComponent', () => {
  let component: StatusOfSiteComponent;
  let fixture: ComponentFixture<StatusOfSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusOfSiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusOfSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
