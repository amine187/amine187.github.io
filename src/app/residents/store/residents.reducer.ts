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
    case actions.RESIDENTS_FILTERED:
      return state.filter((resident) =>
        resident.firstname
          .toLowerCase()
          .includes(action.payload.firstname.toLowerCase())
      );
    case actions.QUOTE_ASSIGNED: {
      const { quote } = state.filter(
        (resident) => resident.id === action.payload.assigneeID
      )[0];
      const newState = state.map((resident) =>
        resident.id !== action.payload.assignToID
          ? resident
          : { ...resident, quote }
      );
      console.log(newState);
      return newState.map((resident) =>
        resident.id !== action.payload.assigneeID
          ? resident
          : { ...resident, quote: '' }
      );
    }
    default:
      return state;
  }
}
