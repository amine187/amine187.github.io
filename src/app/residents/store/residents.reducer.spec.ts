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

  it('should return the a new state with loaded residents when RESIDENTS_LOADED action was dispatched', inject(
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

  it('should return the a new state with filtered residents when RESIDENTS_FILTERED action was dispatched', inject(
    [ResidentsActions],
    (residentsActions: ResidentsActions) => {
      const dataAPI = [
        { id: 1, username: 'johnathan.doe', firstname: 'johnathan' },
        { id: 2, username: 'sebastian.müller', firstname: 'sebastian' },
        { id: 3, username: 'sara.dom', firstname: 'sara' },
      ];
      const expectedResult = [
        { id: 1, username: 'johnathan.doe', firstname: 'johnathan' },
      ];
      const store = createStore(residentsReducer);

      const loadAction = residentsActions.residentsLoaded(dataAPI);
      store.dispatch(loadAction);

      expect(store.getState()).toEqual(dataAPI);

      const filterAction = residentsActions.residentsFiltered('johnathan');
      store.dispatch(filterAction);

      expect(store.getState()).toEqual(expectedResult);
    }
  ));

  it('should return the a new state filtered by partial firstname when RESIDENTS_FILTERED action was dispatched', inject(
    [ResidentsActions],
    (residentsActions: ResidentsActions) => {
      const dataAPI = [
        { id: 1, username: 'johnathan.doe', firstname: 'johnathan' },
        { id: 2, username: 'sebastian.müller', firstname: 'sebastian' },
        { id: 3, username: 'sara.dom', firstname: 'sara' },
      ];
      const expectedResult = [
        { id: 2, username: 'sebastian.müller', firstname: 'sebastian' },
        { id: 3, username: 'sara.dom', firstname: 'sara' },
      ];
      const store = createStore(residentsReducer);

      const loadAction = residentsActions.residentsLoaded(dataAPI);
      store.dispatch(loadAction);

      expect(store.getState()).toEqual(dataAPI);

      const filterAction = residentsActions.residentsFiltered('s');
      store.dispatch(filterAction);

      expect(store.getState()).toEqual(expectedResult);
    }
  ));

  it('should return the a new state filtered by uppercase firstname when RESIDENTS_FILTERED action was dispatched', inject(
    [ResidentsActions],
    (residentsActions: ResidentsActions) => {
      const dataAPI = [
        { id: 1, username: 'johnathan.doe', firstname: 'johnathan' },
        { id: 2, username: 'sebastian.müller', firstname: 'sebastian' },
        { id: 3, username: 'sara.dom', firstname: 'sara' },
      ];
      const expectedResult = [
        { id: 3, username: 'sara.dom', firstname: 'sara' },
      ];
      const store = createStore(residentsReducer);

      const loadAction = residentsActions.residentsLoaded(dataAPI);
      store.dispatch(loadAction);

      expect(store.getState()).toEqual(dataAPI);

      const filterAction = residentsActions.residentsFiltered('SAR');
      store.dispatch(filterAction);

      expect(store.getState()).toEqual(expectedResult);
    }
  ));

  it('should return the a new state when QUOTE_ASSIGNED action was dispatched', inject(
    [ResidentsActions],
    (residentsActions: ResidentsActions) => {
      const dataAPI = [
        {
          id: 1,
          username: 'johnathan.doe',
          firstname: 'johnathan',
          quote: 'my quote',
        },
        {
          id: 2,
          username: 'sebastian.müller',
          firstname: 'sebastian',
          quote: 'his quote',
        },
      ];
      const expectedResult = [
        {
          id: 1,
          username: 'johnathan.doe',
          firstname: 'johnathan',
          quote: 'his quote',
        },
        {
          id: 2,
          username: 'sebastian.müller',
          firstname: 'sebastian',
          quote: '',
        },
      ];
      const store = createStore(residentsReducer);

      const loadAction = residentsActions.residentsLoaded(dataAPI);
      store.dispatch(loadAction);

      expect(store.getState()).toEqual(dataAPI);

      let quoteAction = residentsActions.quoteAssigned(2, 1);
      store.dispatch(quoteAction);

      expect(store.getState()).toEqual(expectedResult);

      quoteAction = residentsActions.quoteAssigned(1, 2);
      store.dispatch(quoteAction);

      expect(store.getState()).toEqual([
        {
          id: 1,
          username: 'johnathan.doe',
          firstname: 'johnathan',
          quote: '',
        },
        {
          id: 2,
          username: 'sebastian.müller',
          firstname: 'sebastian',
          quote: 'his quote',
        },
      ]);
    }
  ));

  it('should return the a new state when RESIDENT_UPDATED action was dispatched', inject(
    [ResidentsActions],
    (residentsActions: ResidentsActions) => {
      const dataAPI = [
        {
          id: 1,
          username: 'johnathan.doe',
          firstname: 'johnathan',
          surname: 'doe',
          gender: 'male',
          address: 'seeßtr',
          quote: 'my quote',
        },
      ];
      const expectedResult = [
        {
          id: 1,
          username: 'jessica.do',
          firstname: 'jessica',
          surname: 'do',
          gender: 'female',
          address: 'grünau',
          quote: '',
        },
      ];
      const store = createStore(residentsReducer);

      const loadAction = residentsActions.residentsLoaded(dataAPI);
      store.dispatch(loadAction);

      expect(store.getState()).toEqual(dataAPI);

      const updateAction = residentsActions.residentUpdated(1, {
        username: 'jessica.do',
        firstname: 'jessica',
        surname: 'do',
        gender: 'female',
        address: 'grünau',
        quote: '',
      });
      store.dispatch(updateAction);

      expect(store.getState()).toEqual(expectedResult);
    }
  ));
});
