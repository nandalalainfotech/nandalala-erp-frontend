import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsDetailsComponent } from './tools-details.component';

describe('ToolsDetailsComponent', () => {
  let component: ToolsDetailsComponent;
  let fixture: ComponentFixture<ToolsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolsDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
