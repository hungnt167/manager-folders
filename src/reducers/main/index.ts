import {Reducer} from "redux";
import * as Types from "types/main";

export const initialState : Types.IMainState = {
    node: null,
};

const MainReducer: Reducer<Types.IMainState> = (
    state: Types.IMainState = initialState, action: Types.IMainSelectNodeAction
) => {
    switch (action.type){
        case Types.MAIN_SELECT_NODE_ACTION:
            return {...state, node: action.node };
    }

    return state;
};

export default MainReducer;