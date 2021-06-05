import { createStore } from 'redux';

import { residentsReducer } from './residents.reducer';

export const residentsStore = createStore(residentsReducer);
