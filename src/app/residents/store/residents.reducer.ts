import { Resident, Action } from 'src/app/core/models';

const initState: Resident[] = [];

export function residentsReducer(
  state: Resident[] = initState,
  action: Action
) {
  switch (action.type) {
    default:
      return state;
  }
}
