import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { ResidentsActions, residentsStore } from '../../store';
import { ResidentEditComponent } from './resident-edit.component';
import { ApiService } from 'src/app/core/services';

describe('ResidentEditComponent', () => {
  let component: ResidentEditComponent;
  let fixture: ComponentFixture<ResidentEditComponent>;
  let residentsActions: ResidentsActions;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, ReactiveFormsModule],
      declarations: [ResidentEditComponent],
      providers: [
        { provide: 'ResidentsStore', useValue: residentsStore },
        ResidentsActions,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResidentEditComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    residentsActions = TestBed.inject(ResidentsActions);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the right resident according to the id in the active router link', inject(
    [ApiService, ActivatedRoute],
    (apiService: ApiService, route: ActivatedRoute) => {
      const dataAPI = {
        id: 2,
        username: 'sebastian.müller',
        firstname: 'sebastian',
        surname: 'müller',
      };
      const expectedResult = 'Change information of resident Sebastian Müller';
      const APISpy = spyOn(apiService, 'getById').and.returnValue(of(dataAPI));
      const cardTitle = debugElement.nativeElement.querySelector('.card-title');

      spyOn(route.snapshot.paramMap, 'get').and.returnValue('2');
      component.ngOnInit();
      fixture.detectChanges();

      expect(APISpy).toHaveBeenCalledWith(2);
      expect(component.resident).toEqual(dataAPI);
      expect(cardTitle.innerText).toEqual(expectedResult);
    }
  ));

  it('should display an error message when the resident not found', inject(
    [ApiService],
    (apiService: ApiService) => {
      const expectedResult =
        'Resident not found! Back to the list of residents?';
      const errorMessage = debugElement.nativeElement.querySelector('.alert');
      const cardTitle = debugElement.nativeElement.querySelector('.card-title');

      spyOn(apiService, 'getById').and.throwError(
        new Error('Resident not found!')
      );

      component.ngOnInit();
      fixture.detectChanges();

      expect(cardTitle.style.display).toBe('');
      expect(component.resident).toBeUndefined();
      expect(errorMessage.innerText).toEqual(expectedResult);
    }
  ));

  it('should fill the form controls with the API data of the selected resident', inject(
    [ApiService, ActivatedRoute],
    (apiService: ApiService, route: ActivatedRoute) => {
      const dataAPI = {
        id: 2,
        username: 'sebastian.müller',
        firstname: 'sebastian',
        surname: 'müller',
        gender: 'male',
        address: 'seeßstrasse 15,10567',
        quote: 'hello world',
      };
      spyOn(route.snapshot.paramMap, 'get').and.returnValue('2');
      spyOn(apiService, 'getById').and.returnValue(of(dataAPI));

      component.ngOnInit();
      fixture.detectChanges();

      const formControls = component.editForm.controls;
      expect(component.resident).toBeDefined();
      expect(formControls.username.value).toEqual('sebastian.müller');
      expect(formControls.firstname.value).toEqual('sebastian');
      expect(formControls.surname.value).toEqual('müller');
      expect(formControls.gender.value).toEqual('male');
      expect(formControls.address.value).toEqual('seeßstrasse 15,10567');
      expect(formControls.quote.value).toEqual('hello world');
    }
  ));

  it('should enable "save changes" button when form is valid', inject(
    [ApiService, ActivatedRoute],
    (apiService: ApiService, route: ActivatedRoute) => {
      const saveChangesBtn =
        debugElement.nativeElement.querySelector('#save-btn');
      const dataAPI = {
        id: 2,
        username: 'sebastian.müller',
        firstname: 'sebastian',
        surname: 'müller',
        gender: 'male',
        address: 'seeßstrasse 15,10567',
        quote: 'hello world',
      };
      spyOn(route.snapshot.paramMap, 'get').and.returnValue('2');
      spyOn(apiService, 'getById').and.returnValue(of(dataAPI));

      component.ngOnInit();
      fixture.detectChanges();

      expect(saveChangesBtn.disabled).toBeFalsy();
    }
  ));

  it('should disable "save changes" button when form is invalid', inject(
    [ApiService, ActivatedRoute],
    (apiService: ApiService, route: ActivatedRoute) => {
      const saveChangesBtn =
        debugElement.nativeElement.querySelector('#save-btn');
      const dataAPI = {
        id: 2,
        username: '',
        firstname: '',
      };
      spyOn(route.snapshot.paramMap, 'get').and.returnValue('2');
      spyOn(apiService, 'getById').and.returnValue(of(dataAPI));

      component.ngOnInit();
      fixture.detectChanges();

      expect(saveChangesBtn.disabled).toBeTruthy();
    }
  ));

  it('should display an error message when the username and the firstname fields are empty', inject(
    [ApiService, ActivatedRoute],
    (apiService: ApiService, route: ActivatedRoute) => {
      const usernameInput =
        debugElement.nativeElement.querySelector('#inputUsername');
      const usernameError =
        debugElement.nativeElement.querySelector('#username-error');

      const firstnameInput =
        debugElement.nativeElement.querySelector('#inputFirstname');
      const firstnameError =
        debugElement.nativeElement.querySelector('#firstname-error');

      const dataAPI = {
        id: 2,
        username: 'sebastian.müller',
        firstname: 'sebastian',
        surname: 'müller',
        gender: 'male',
        address: 'seeßstrasse 15,10567',
        quote: 'hello world',
      };
      spyOn(route.snapshot.paramMap, 'get').and.returnValue('2');
      spyOn(apiService, 'getById').and.returnValue(of(dataAPI));

      component.ngOnInit();
      fixture.detectChanges();

      expect(firstnameInput.classList.contains('is-invalid')).toBeFalsy();
      expect(usernameInput.classList.contains('is-invalid')).toBeFalsy();

      firstnameInput.value = '';
      firstnameInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(firstnameInput.classList.contains('is-invalid')).toBeTruthy();
      expect(firstnameError.innerText.trim()).toEqual(
        'First name is required.'
      );

      usernameInput.value = '';
      usernameInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(usernameInput.classList.contains('is-invalid')).toBeTruthy();
      expect(usernameError.innerText).toEqual('Username is required.');
    }
  ));

  it('should dispatch the update resident action when click on the button "save changes"', inject(
});
