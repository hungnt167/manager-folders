import * as Types from "types/main";

export function selectNode(node: any): Types.IMainSelectNodeAction {
    return {
       node,
       type: Types.MAIN_SELECT_NODE_ACTION,
    }
}