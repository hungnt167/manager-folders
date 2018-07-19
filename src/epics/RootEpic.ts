import * as ReduxObservable from 'redux-observable';
import panelEpic from './panel';

const epics = ReduxObservable.combineEpics(
    panelEpic
);

export default epics;