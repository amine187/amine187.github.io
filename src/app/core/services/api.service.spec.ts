import { TestBed } from '@angular/core/testing';
import { residents } from '../mocks';

import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the mocked data', () => {
    service.fetchAll().subscribe((res) => expect(res).toEqual(residents));
  });
});
