import classNames from "classnames";
import {TreeNode} from "rc-tree";
import * as React from "react";

const Icon = ({ selected }:{ selected: any }) => (
    <span
        className={classNames(
            'glyphicon glyphicon-file',
            selected && 'glyphicon glyphicon-eye-open',
        )}
    />
);

export class File extends TreeNode {
    public static defaultProps = {
        icon: Icon,
    };
}