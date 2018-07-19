import RootEpic from 'epics/RootEpic';
import RootReducer from 'reducers/RootReducer';
import * as Redux from 'redux';
import * as ReduxObservable from 'redux-observable';

/**  config redux-observable */
const epicMiddleware = ReduxObservable.createEpicMiddleware();
epicMiddleware.run(RootEpic);
const store = Redux.createStore(RootReducer, Redux.applyMiddleware(
    epicMiddleware
));


export default store;