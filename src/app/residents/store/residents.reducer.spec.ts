import { getTestBed, inject } from '@angular/core/testing';
import { createStore } from 'redux';

import { ResidentsModule } from '../residents.module';
import { ResidentsActions } from './residents.actions';
import { residentsReducer } from './residents.reducer';
import { Resident } from 'src/app/core/models';

describe('ResidentsReducer', () => {
  beforeEach(() => {
    getTestBed().configureTestingModule({
      imports: [ResidentsModule],
    });
  });

  it('should return the default state', () => {
    const expectedState: Resident[] = [];
    const store = createStore(residentsReducer);

    expect(store.getState()).toEqual(expectedState);
  });

  it('should return the a new state with added todo when RESIDENTS_LOADED action was dispatched', inject(
    [ResidentsActions],
    (residentsActions: ResidentsActions) => {
      const dataAPI = [
        { id: 1, username: 'foo.bar', firstname: 'foo' },
        { id: 2, username: 'foo2.bar2', firstname: 'foo2' },
      ];
      const store = createStore(residentsReducer);
      const action = residentsActions.residentsLoaded(dataAPI);

      expect(store.getState()).toEqual([]);

      store.dispatch(action);

      expect(store.getState()).toEqual(dataAPI);
    }
  ));
});
