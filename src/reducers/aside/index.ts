import {Reducer} from "redux";
import * as Types from "types/aside";

export const initialState : Types.IAsideState = {
    node: null,
};

const AsideReducer: Reducer<Types.IAsideState> = (
    state: Types.IAsideState = initialState, action: Types.IPanelAsideSelectNodeAction
) => {
    switch (action.type){
        case Types.ASIDE_SELECT_NODE_ACTION:
            return {...state, node: action.node };
    }

    return state;
};

export default AsideReducer;