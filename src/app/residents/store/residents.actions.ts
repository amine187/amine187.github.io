import { Resident } from 'src/app/core/models';

import * as actions from './residents.actions.type';

export class ResidentsActions {
  residentsLoaded(data: Resident[]) {
    return {
      type: actions.RESIDENTS_LOADED,
      payload: data,
    };
  }

  residentsFiltered(firstname: string) {
    return {
      type: actions.RESIDENTS_FILTERED,
      payload: {
        firstname,
      },
    };
  }

  quoteAssigned(assigneeID: number, assignToID: number) {
    return {
      type: actions.QUOTE_ASSIGNED,
      payload: {
        assigneeID,
        assignToID,
      },
    };
  }
}
