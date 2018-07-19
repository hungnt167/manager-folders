import {IRequestAction} from "store/shared/IRequestAction";
import * as Types from "types/panel";

export function login(user: object): IRequestAction {
    return {
        payload: {
            request:{
                data: {...user},
                method: 'POST',
                url:'integration/customer/token'
            }
        },
        type: Types.LOGIN_ACTION,
        types: [Types.LOGIN_ACTION_START, Types.LOGIN_ACTION_SUCCESS, Types.LOGIN_ACTION_ERROR]
    }
}