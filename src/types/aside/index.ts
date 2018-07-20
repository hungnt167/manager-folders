import {Action} from "redux";

export const ASIDE_SELECT_NODE_ACTION = 'ASIDE_SELECT_NODE_ACTION';
export type ASIDE_SELECT_NODE_ACTION = typeof ASIDE_SELECT_NODE_ACTION;


export interface IAsideState {
    node: any
}

export interface IPanelAsideSelectNodeAction extends Action{
    node: any
}

export type AsideAction = IPanelAsideSelectNodeAction;

export interface IAsideStates {
    Folder: any,
    File: any,
    autoExpandParent: boolean,
    expandedKeys: string[],
    selectedNode: any
    treeData?: object[],
}