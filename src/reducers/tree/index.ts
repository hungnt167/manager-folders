import {Reducer} from "redux";
import * as Types from "types/tree";
import {ITreeState} from "types/tree";

export const initialState : ITreeState = {
    data: [{
        "children": [
            {
                "children": [
                    {
                        "isFile": true,
                        "key": "0-0-1-0-key",
                        "title": "File 1"
                    },
                    {
                        "isFile": true,
                        "key": "0-0-1-1-key",
                        "title": "File 2"
                    },
                    {
                        "isFile": true,
                        "key": "0-0-1-2-key",
                        "title": "File 3"
                    }
                ],
                "key": "0-0-1-key",
                "title": "Folder 3"
            },
            {
                "key": "0-0-2-key",
                "title": "Folder 2"
            }
        ],
        "key": "0-0-key",
        "title": "Folder 1"
    }],
};

const TreeReducer: Reducer<ITreeState> = (
    state: ITreeState = initialState, action: Types.TreeAction
) => {
    switch (action.type){
        case Types.SET_TREE_ACTION:
            return {...state, data: [...action.treeData] };
        case Types.TREE_ADD_NODE_ACTION:
            return {...state, data: [...state.data, action.node] };
        case Types.TREE_DELETE_NODE_ACTION:
            return {...state, data: state.data.filter((node: any) => {
                    return node !== action.node;
                }) };
    }

    return state;
};

export default TreeReducer;