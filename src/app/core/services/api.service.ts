import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResidentsActions } from 'src/app/residents/store';

import { residents } from '../mocks';
import { Resident, ResidentsStore } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    @Inject('ResidentsStore') private residentsStore: ResidentsStore,
    private residentsActions: ResidentsActions
  ) {}

  fetchAll(): Observable<Resident[]> {
    return of(residents).pipe(
      map((data) => {
        this.residentsStore.dispatch(
          this.residentsActions.residentsLoaded(data)
        );
        return data;
      })
    );
  }
}
