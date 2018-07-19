import {Reducer} from "redux";
import {IRequestAction} from "store/shared/IRequestAction";
import * as Types from "types/panel";

export const initialState : Types.IPanelState = {
    isRequesting: false,
    password: 'roni_cost3@example.com',
    username: 'roni_cost@example.com',
};

export const LoginForm = {
    loginForm: initialState,
};


const LoginReducer: Reducer<Types.IPanelState> = (
    state: Types.IPanelState = initialState, action: IRequestAction
) => {
    switch (action.type){
        case Types.LOGIN_ACTION:
            return {...state, isRequesting: true };
        case Types.LOGIN_ACTION_SUCCESS:
            return {...state, data: action.payload.data, isRequesting: false };
        case Types.LOGIN_ACTION_ERROR:
            return {...state, error: action.payload.error, isRequesting: false };
    }

    return state;
};

export default LoginReducer;