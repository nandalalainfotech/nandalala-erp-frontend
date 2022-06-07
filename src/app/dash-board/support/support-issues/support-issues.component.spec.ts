import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportIssuesComponent } from './support-issues.component';

describe('SupportIssuesComponent', () => {
  let component: SupportIssuesComponent;
  let fixture: ComponentFixture<SupportIssuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupportIssuesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportIssuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
