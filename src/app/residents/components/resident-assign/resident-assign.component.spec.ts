import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidentsActions, residentsStore } from '../../store';
import { ResidentAssignComponent } from './resident-assign.component';

describe('ResidentAssignComponent', () => {
  let component: ResidentAssignComponent;
  let fixture: ComponentFixture<ResidentAssignComponent>;
  let residentsActions: ResidentsActions;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResidentAssignComponent],
      providers: [
        { provide: 'ResidentsStore', useValue: residentsStore },
        ResidentsActions,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResidentAssignComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    residentsActions = TestBed.inject(ResidentsActions);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load all the residents except the assignee', () => {
    const selectBox =
      debugElement.nativeElement.querySelector('#assignQuoteSelect');
    const spyLoadResidents = spyOn(
      component,
      'loadResidents'
    ).and.callThrough();
    const storeSpy = spyOn(
      (<any>component).residentsStore,
      'dispatch'
    ).and.callThrough();
    const dataAPI = [
      { id: 1, username: 'johnathan.doe', firstname: 'johnathan' },
      { id: 2, username: 'sebastian.müller', firstname: 'sebastian' },
      { id: 3, username: 'sara.dom', firstname: 'sara' },
    ];
    const expectedResult = [
      { id: 2, username: 'sebastian.müller', firstname: 'sebastian' },
      { id: 3, username: 'sara.dom', firstname: 'sara' },
    ];

    component.assigneeID = 1;
    (<any>component).residentsStore.dispatch(
      residentsActions.residentsLoaded(dataAPI)
    );
    selectBox.dispatchEvent(new Event('focus'));
    fixture.detectChanges();

    expect(storeSpy).toHaveBeenCalledWith({ type: null });
    expect(spyLoadResidents).toHaveBeenCalled();
    expect(component.residents).toEqual(expectedResult);
  });

});
