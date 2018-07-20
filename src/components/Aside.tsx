import * as AsideActions from 'actions/aside';
import * as TreeActions from 'actions/tree';
import {File} from "components/aside/File";
import {Folder} from "components/aside/Folder";
import Tree from 'rc-tree';
import 'rc-tree/assets/index.css';
import * as React from "react";
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {TreeService} from "services/TreeService";
import {IApplicationState} from "types";
import * as AsideTypes from 'types/aside';
import * as TreeTypes from 'types/tree';


export class Aside extends React.Component<any, AsideTypes.IAsideStates> {
    public state = {
        File,
        Folder,
        autoExpandParent: true,
        expandedKeys: ['0-0-key', '0-0-0-key', '0-0-0-0-key'],
        selectedNode: null,
    };

    public onDragStart = (info: any) => {
        return info;
    };
    public onDragEnter = (info: any) => {
        this.setState({
            expandedKeys: info.expandedKeys,
        });
    };
    public getNode = (data: any, key: any, callback: any) => {
        return TreeService.getNode(data, key, callback);
    };
    public onDrop = (info: any) => {
        const dropKey = info.node.props.eventKey;
        const dragKey = info.dragNode.props.eventKey;
        const dropPos = info.node.props.pos.split('-');
        const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);
        // const dragNodesKeys = info.dragNodesKeys;
        const data = [...this.props.treeData];
        let dragObj: any;
        let dropObj: any;
        
        this.getNode(data, dropKey, (item: any) => {
            dropObj = item;
        });

        if (dropObj.isFile) {
            return;
        }

        this.getNode(data, dragKey, ((item: any, index: any, arr:any) => {
            arr.splice(index, 1);
            dragObj = item;
        }));
        if (info.dropToGap) {
            let ar: any;
            let i: any;
            this.getNode(data, dropKey, ((item: any, index: any, arr:any) => {
                ar = arr;
                i = index;
            }));
            if (dropPosition === -1) {
                ar.splice(i, 0, dragObj);
            } else {
                ar.splice(i + 1, 0, dragObj);
            }
        } else {
            TreeService.addNode(data, dragObj, dropObj);
        }
        this.props.setTree(data);
    };
    public onExpand = (expandedKeys: any) => {
        this.setState({
            autoExpandParent: false,
            expandedKeys,
        });
    };

    public onSelect = (selectedKeys: any, e:{selected: boolean, selectedNodes: any, node: any, event: any, nativeEvent: any}) => {
        if (e.node) {
            this.setState({selectedNode: e.node});
            this.props.selectNode(e.node);
        }
    };

    public loop(data: any[] = []): any {
        const FolderElement = this.state.Folder;
        const FileElement = this.state.File;

        return data.map((item: any) => {
            if (item.children && item.children.length) {
                return <FolderElement key={item.key} title={item.title}>{this.loop(item.children)}</FolderElement>
            }

            return item.isFile
                ? <FileElement key={item.key} title={item.title}>{this.loop(item.children)}</FileElement>
                : <FolderElement key={item.key} title={item.title}>{this.loop(item.children)}</FolderElement>
        });
    }

    public render() {
        return (<div className={"col-md-3 nopadding"}>
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
                    {this.loop(this.props.treeData)}
                </Tree>
            </div>
        </div>);
    }
}

export function mapStateToProps({ TreeReducer }: IApplicationState) {
    return {
        treeData: TreeReducer.data
    }
}

export function mapDispatchToProps(dispatch: Dispatch<AsideTypes.AsideAction | TreeTypes.TreeAction>) {
  return {
      selectNode: (node: any) => dispatch(AsideActions.asideSelectNode(node)),
      setTree: (treeData: any) => dispatch(TreeActions.setTree(treeData)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Aside);