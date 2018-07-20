import classNames from "classnames";
import {TreeNode} from "rc-tree";
import * as React from "react";

const Icon = ({ selected }:{ selected: any }) => (
    <span
        className={classNames(
            'glyphicon glyphicon-folder-close',
            selected && 'glyphicon glyphicon-folder-open',
        )}
    />
);

export class Folder extends TreeNode {
    public static defaultProps = {
        icon: Icon,
    };
}