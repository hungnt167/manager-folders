import {Action} from "redux";

export const TREE_ADD_NODE_ACTION = 'TREE_ADD_NODE_ACTION';
export type TREE_ADD_NODE_ACTION = typeof TREE_ADD_NODE_ACTION;
export const TREE_DELETE_NODE_ACTION = 'TREE_DELETE_NODE_ACTION';
export type TREE_DELETE_NODE_ACTION = typeof TREE_DELETE_NODE_ACTION;
export const SET_TREE_ACTION = 'SET_TREE_ACTION';
export type SET_TREE_ACTION = typeof SET_TREE_ACTION;

export interface ITreeState {
    data: any[]
}

export interface ITreeAction extends Action{
    node?: any
    treeData?: any
}

export interface ITreeAddNodeAction extends ITreeAction{
    node: any
}

export interface ITreeDeleteNodeAction extends ITreeAction{
    node: any
}

export interface ISetTreeAction extends ITreeAction{
    treeData: any[]
}

export type TreeAction = ITreeAddNodeAction | ITreeDeleteNodeAction | ISetTreeAction;
