import {Reducer} from "redux";
import {TreeService} from "services/TreeService";
import * as Types from "types/tree";
import {ITreeState} from "types/tree";

export const initialState : ITreeState = {
    data: [{
        "children": [],
        "key": "0-0-key",
        "title": "Root"
    }],
};

const TreeReducer: Reducer<ITreeState> = (
    state: ITreeState = initialState, action: Types.TreeAction
) => {
    switch (action.type){
        case Types.SET_TREE_ACTION:
            return {...state, data: [...action.treeData] };
        case Types.TREE_ADD_NODE_ACTION:
            return {...state, data: [...TreeService.addNode(state.data, action.node, action.parentNode)]};
        case Types.TREE_DELETE_NODE_ACTION:
            return {...state, data: state.data.filter((node: any) => {
                    return node !== action.node;
                }) };
    }

    return state;
};

export default TreeReducer;