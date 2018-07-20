import * as AsideActions from "actions/aside";
import * as TreeActions from "actions/tree";
import {Aside} from "components/Aside";
import {File} from "components/main/File";
import {Folder} from "components/main/Folder";
import Tree from "rc-tree";
import 'rc-tree/assets/index.css';
import * as React from "react";
import { connect } from 'react-redux';
import {Dispatch} from "redux";
import * as Types from 'types';
import * as AsideTypes from "types/aside";
import * as TreeTypes from "types/tree";

export class Main extends Aside {
    public state = {
        File,
        Folder,
        autoExpandParent: true,
        expandedKeys: ['0-0-key', '0-0-0-key', '0-0-0-0-key'],
        selectedNode: null,
        treeData: []
    };


    public componentWillReceiveProps(nextProps: Readonly<any>, nextContext: any): void {
        if (nextProps.node) {
            this.getNode(this.props.tree, nextProps.node.props.eventKey, (item: any) => {
                if (item.isFile) {
                    return this.setState({
                        selectedNode: item,
                        treeData: [],
                    })
                }
                this.setState({
                    selectedNode: null,
                    treeData: item.children
                })
            });

        }
    }

    public render() {
        const {selectedNode} = this.state;

        if (selectedNode) {
            return <h5>Reading {JSON.stringify(selectedNode)}</h5>
        }

        return (<div className={"col-md-9 nopadding"}>
            <div className="draggable-container">
                <Tree
                    expandedKeys={this.state.expandedKeys}
                    onExpand={this.onExpand} autoExpandParent={this.state.autoExpandParent}
                    draggable={true}
                    onDragStart={this.onDragStart}
                    onDragEnter={this.onDragEnter}
                    onDrop={this.onDrop}
                    onSelect={this.onSelect}
                >
                    {this.loop(this.state.treeData)}
                </Tree>
            </div>
        </div>);
    }
}

export function mapStateToProps({ AsideReducer, TreeReducer }: Types.IApplicationState) {
  return {
    node: AsideReducer.node,
    tree: TreeReducer.data
  }
}

export function mapDispatchToProps(dispatch: Dispatch<AsideTypes.AsideAction | TreeTypes.TreeAction>) {
    return {
        selectNode: (node: any) => dispatch(AsideActions.asideSelectNode(node)),
        setTree: (treeData: any) => dispatch(TreeActions.setTree(treeData)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);