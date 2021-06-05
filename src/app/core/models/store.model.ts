import { Action, Store } from 'redux';
import { Resident } from './resident.model';

export type ResidentsStore = Store<Resident[], Action>;
