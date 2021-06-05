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
    case actions.QUOTE_ASSIGNED:
      const { quote } = state.filter(
        (resident) => resident.id === action.payload.assigneeID
      )[0];

      return state.map((resident) => {
        if (resident.id === action.payload.assigneeID)
          return { ...resident, quote: '' };
        else if (resident.id === action.payload.assignToID)
          return { ...resident, quote };
        else return resident;
      });
    default:
      return state;
  }
}
