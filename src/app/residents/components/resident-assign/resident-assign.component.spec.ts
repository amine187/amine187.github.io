import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidentAssignComponent } from './resident-assign.component';

describe('ResidentAssignComponent', () => {
  let component: ResidentAssignComponent;
  let fixture: ComponentFixture<ResidentAssignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResidentAssignComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResidentAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
