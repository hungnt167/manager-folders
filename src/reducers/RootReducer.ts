import * as Redux from 'redux';
import {IPanelState} from "types/panel";
import PanelReducer  from "./panel";

export interface IApplicationState {
    PanelReducer: IPanelState,
}

const reducers: Redux.Reducer<IApplicationState> = Redux.combineReducers({
    PanelReducer,
});

export default reducers;