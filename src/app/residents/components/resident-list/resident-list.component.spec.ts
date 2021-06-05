import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Resident } from 'src/app/core/models';

import { ApiService } from 'src/app/core/services';
import { ResidentsActions, residentsStore } from '../../store';
import { ResidentListComponent } from './resident-list.component';

describe('ResidentListComponent', () => {
  let component: ResidentListComponent;
  let fixture: ComponentFixture<ResidentListComponent>;
  let apiService: ApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResidentListComponent],
      providers: [
        { provide: 'ResidentsStore', useValue: residentsStore },
        ResidentsActions,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResidentListComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch all the residents from the API when initialize the component', () => {
    const APIData = [
      {
        id: 1,
        username: 'foo.bar',
        firstname: 'foo',
      },
    ];
    const fetchAllSpy = spyOn(apiService, 'fetchAll').and.returnValue(
      of(APIData)
    );

    component.ngOnInit();

    expect(fetchAllSpy).toHaveBeenCalled();
    expect(component.residents$).toEqual(APIData);
  });
});
