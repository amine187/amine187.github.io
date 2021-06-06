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
    case actions.RESIDENT_UPDATED:
      const { username, firstname, surname, gender, address, quote } =
        action.payload.body;
      return state.map((resident) =>
        resident.id !== action.payload.id
          ? resident
          : {
              ...resident,
              username,
              firstname,
              surname,
              gender,
              address,
              quote,
            }
      );
    case actions.QUOTE_ASSIGNED:
      return assignQuote(
        state,
        action.payload.assigneeID,
        action.payload.assignToID
      );
    default:
      return state;
  }
}

const assignQuote = (
  state: Resident[],
  assigneeID: number,
  assignToID: number
): Resident[] => {
  const { quote } = state.filter((resident) => resident.id === assigneeID)[0];
  const newState = state.map((resident) =>
    resident.id !== assignToID ? resident : { ...resident, quote }
  );

  return newState.map((resident) =>
    resident.id !== assigneeID ? resident : { ...resident, quote: '' }
  );
};
