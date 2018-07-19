import {Action} from "redux";

export interface IRequestAction extends Action {
    currentPage?: number
    pageSize?: number
    payload: {request?: any, data?: any, error?: any}
    types?: any[]
}