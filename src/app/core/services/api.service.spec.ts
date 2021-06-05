import { TestBed } from '@angular/core/testing';

import { ResidentsActions, residentsStore } from 'src/app/residents/store';
import { residents } from '../mocks';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let residentsActions: ResidentsActions;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: 'ResidentsStore', useValue: residentsStore },
        ResidentsActions,
      ],
    });
    service = TestBed.inject(ApiService);
    residentsActions = TestBed.inject(ResidentsActions);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the mocked data', () => {
    service.fetchAll().subscribe((res) => expect(res).toEqual(residents));
  });

  it('should dispatch the residentsLoaded action when receiving data API', () => {
    const storeSpy = spyOn(
      (<any>service).residentsStore,
      'dispatch'
    ).and.callThrough();

    service
      .fetchAll()
      .subscribe((res) =>
        expect(storeSpy).toHaveBeenCalledWith(
          residentsActions.residentsLoaded(res)
        )
      );
  });
});
