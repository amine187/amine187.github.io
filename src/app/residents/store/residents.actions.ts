import { Resident } from 'src/app/core/models';

import * as actions from './residents.actions.type';

export class ResidentsActions {
  residentsLoaded(data: Resident[]) {
    return {
      type: actions.RESIDENTS_LOADED,
      payload: data,
    };
  }
}
