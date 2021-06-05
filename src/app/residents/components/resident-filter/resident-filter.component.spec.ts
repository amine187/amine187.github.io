import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidentFilterComponent } from './resident-filter.component';

describe('ResidentFilterComponent', () => {
  let component: ResidentFilterComponent;
  let fixture: ComponentFixture<ResidentFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResidentFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResidentFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
