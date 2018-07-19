import * as Types from "types/panel";

export function asideSelectNode(node: any): Types.IPanelAsideSelectNodeAction {
    return {
       node,
       type: Types.ASIDE_SELECT_NODE_ACTION,
    }
}