import {Reducer} from "redux";
import * as Types from "types/panel";

export const initialState : Types.IPanelState = {
    node: null,
};

export const LoginForm = {
    loginForm: initialState,
};


const PanelReducer: Reducer<Types.IPanelState> = (
    state: Types.IPanelState = initialState, action: Types.IPanelAsideSelectNodeAction
) => {
    switch (action.type){
        case Types.ASIDE_SELECT_NODE_ACTION:
            return {...state, node: action.node };
    }

    return state;
};

export default PanelReducer;