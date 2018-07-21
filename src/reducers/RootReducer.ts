import Reducers from "reducers";
import * as Redux from 'redux';
import {IApplicationState} from "types";

const reducers: Redux.Reducer<IApplicationState> = Redux.combineReducers({
    AsideReducer: Reducers.AsideReducer,
    MainReducer: Reducers.MainReducer,
    TreeReducer: Reducers.TreeReducer,
});

export default reducers;