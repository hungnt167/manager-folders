import * as MainActions from "actions/main";
import * as TreeActions from "actions/tree";
import {Aside} from "components/Aside";
import {EditModal} from "components/EditModal";
import {File} from "components/main/File";
import {Folder} from "components/main/Folder";
import Tree from "rc-tree";
import 'rc-tree/assets/index.css';
import * as React from "react";
import { connect } from 'react-redux';
import {Dispatch} from "redux";
import * as Types from 'types';
import * as MainTypes from "types/main";
import * as TreeTypes from "types/tree";

export class Main extends Aside {
    public listenAreas: string[] = ['main'];

    public state = {
        File,
        Folder,
        autoExpandParent: true,
        buffer: false,
        expandedKeys: ['0-0-key', '0-0-0-key', '0-0-0-0-key'],
        treeData: []
    };


    public componentWillReceiveProps(nextProps: Readonly<any>, nextContext: any): void {
        if (nextProps.parent) {
            this.getNode(this.props.treeData, nextProps.parent.props.eventKey, (item: any) => {
                if (item.isFile) {
                    return this.setState({
                        treeData: [],
                    })
                }
                this.setState({
                    treeData: item.children
                })
            });

        }
    }

    public render() {
        const {buffer} = this.state;

        return (<div className={"col-md-9 nopadding"} id="main" onKeyUp={this.onKeyUp(this.props.selectedNode)} tabIndex={1}>
            <div className="draggable-container">
                {
                    buffer ? <h5>Reading {buffer}</h5> : (    
                        <React.Fragment>
                            <Tree
                            expandedKeys={this.state.expandedKeys}
                            onExpand={this.onExpand} autoExpandParent={this.state.autoExpandParent}
                            draggable={true}
                            onDragStart={this.onDragStart}
                            onDragEnter={this.onDragEnter}
                            onDrop={this.onDrop}
                            onSelect={this.onSelect}
                            onDoubleClick={this.onNodeDoubleClick}
                            >
                                {this.loop(this.state.treeData)}
                            </Tree>
                            <EditModal ref={this.setEditModal} onConfirm={this.confirmSave}/>
                        </React.Fragment>
                    )
                }
            </div>
        </div>);
    }
}

export function mapStateToProps({ AsideReducer, MainReducer, TreeReducer }: Types.IApplicationState) {
  return {
    parent: AsideReducer.node,
    selectedNode: MainReducer.node,
    treeData: TreeReducer.data
  }
}

export function mapDispatchToProps(dispatch: Dispatch<MainTypes.MainAction | TreeTypes.TreeAction>) {
    return {
        selectNode: (node: any) => dispatch(MainActions.selectNode(node)),
        setTree: (treeData: any) => dispatch(TreeActions.setTree(treeData)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);