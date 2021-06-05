import { Resident, Action } from 'src/app/core/models';
import * as actions from './residents.actions.type';

const initState: Resident[] = [];

export function residentsReducer(
  state: Resident[] = initState,
  action: Action
) {
  switch (action.type) {
    case actions.RESIDENTS_LOADED:
      return action.payload;
    default:
      return state;
  }
}
