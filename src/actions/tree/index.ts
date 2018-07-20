import * as Types from "types/tree";

export function treeAddNode(node: any): Types.ITreeAddNodeAction {
    return {
       node,
       type: Types.TREE_ADD_NODE_ACTION,
    }
}

export function treeDeleteNode(node: any): Types.ITreeDeleteNodeAction {
    return {
        node,
        type: Types.TREE_DELETE_NODE_ACTION,
    }
}

export function setTree(treeData: any[]): Types.ISetTreeAction {
    return {
        treeData,
        type: Types.SET_TREE_ACTION,
    }
}