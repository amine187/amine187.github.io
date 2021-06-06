import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { residentsReducer } from './residents.reducer';

const composeEnhancers = composeWithDevTools({
  trace: true,
  traceLimit: 25,
});

export const residentsStore = createStore(residentsReducer, composeEnhancers());
