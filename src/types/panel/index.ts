import {Action} from "redux";

export const ASIDE_SELECT_NODE_ACTION = 'ASIDE_SELECT_NODE_ACTION';
export type ASIDE_SELECT_NODE_ACTION = typeof ASIDE_SELECT_NODE_ACTION;


export interface IPanelState {
    node: any
}

export interface IPanelAsideSelectNodeAction extends Action{
    node: any
}

export type PanelAction = IPanelAsideSelectNodeAction;