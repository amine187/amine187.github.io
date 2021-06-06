import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  inject,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ResidentsStore } from 'src/app/core/models';
import { ApiService } from 'src/app/core/services';
import { ResidentsActions, residentsStore } from '../../store';

import { ResidentFilterComponent } from './resident-filter.component';

describe('ResidentFilterComponent', () => {
  let component: ResidentFilterComponent;
  let fixture: ComponentFixture<ResidentFilterComponent>;
  let apiService: ApiService;
  let residentsActions: ResidentsActions;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ResidentFilterComponent],
      providers: [
        { provide: 'ResidentsStore', useValue: residentsStore },
        ResidentsActions,
        ApiService,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResidentFilterComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    apiService = TestBed.inject(ApiService);
    residentsActions = TestBed.inject(ResidentsActions);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch the residentsLoaded action when the user enter a value', fakeAsync(() => {
    const storeSpy = spyOn(
      (<any>component).residentsStore,
      'dispatch'
    ).and.callThrough();

    component.ngOnInit();
    fixture.detectChanges();

    component.filterCtrl.setValue('test');
    fixture.detectChanges();
    tick(400);

    fixture.detectChanges();
    expect(storeSpy).toHaveBeenCalledWith(
      residentsActions.residentsFiltered('test')
    );
  }));

  it('should debounce for 400 milliseconds when typing in the search field', fakeAsync(() => {
    const storeSpy = spyOn(
      (<any>component).residentsStore,
      'dispatch'
    ).and.callThrough();

    component.ngOnInit();
    fixture.detectChanges();

    component.filterCtrl.setValue('test');
    fixture.detectChanges();
    tick(398);

    expect(storeSpy).not.toHaveBeenCalled();
    tick(2);
    expect(storeSpy).toHaveBeenCalled();
  }));

  it('should call the fetchAll service when filter field is empty again', fakeAsync(() => {
    const serviceSpy = spyOn(apiService, 'fetchAll').and.callThrough();

    component.ngOnInit();
    fixture.detectChanges();

    component.filterCtrl.setValue('test');
    fixture.detectChanges();
    tick(400);

    fixture.detectChanges();
    component.filterCtrl.setValue('');
    fixture.detectChanges();
    tick(400);

    expect(serviceSpy).toHaveBeenCalled();
  }));
});
