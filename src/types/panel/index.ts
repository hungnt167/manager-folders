import {IRequestState} from "store/shared/IRequestState";

export const LOGIN_ACTION = 'LOGIN_ACTION';
export type LOGIN_ACTION = typeof LOGIN_ACTION;

export const LOGIN_ACTION_START = 'LOGIN_ACTION_START';
export type LOGIN_ACTION_START = typeof LOGIN_ACTION_START;

export const LOGIN_ACTION_SUCCESS = 'LOGIN_ACTION_SUCCESS';
export type LOGIN_ACTION_SUCCESS = typeof LOGIN_ACTION_SUCCESS;

export const LOGIN_ACTION_ERROR = 'LOGIN_ACTION_ERROR';
export type LOGIN_ACTION_ERROR = typeof LOGIN_ACTION_ERROR;

export const TOKEN_KEY = 'TOKEN_KEY';

export interface IPanelState extends IRequestState{
    password: string
    username: string,
}
