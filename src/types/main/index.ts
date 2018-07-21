import {IAsideState, IPanelAsideSelectNodeAction} from "types/aside";

export const MAIN_SELECT_NODE_ACTION = 'MAIN_SELECT_NODE_ACTION';
export type MAIN_SELECT_NODE_ACTION = typeof MAIN_SELECT_NODE_ACTION;


export interface IMainState extends IAsideState {
	parent?: any
}

export interface IMainSelectNodeAction extends IPanelAsideSelectNodeAction {
	parent?: any
}

export type MainAction = IMainSelectNodeAction;
