import {IRequestAction} from "store/shared/IRequestAction";

export interface ILoadRequestAction extends IRequestAction {
    currentPage: number
    meta: {
        previousAction: {
            currentPage: number,
            pageSize: number,
        }
    }
    pageSize: number
    payload: {
        data?: any | {
            total_count: number
        },
        error?: any,
        request?: any,
    }
    types?: any[]
}