import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { residents } from '../mocks';
import { Resident } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  fetchAll(): Observable<Resident[]> {
    return of(residents);
  }
}
