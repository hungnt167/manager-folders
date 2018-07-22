import * as AsideActions from 'actions/aside';
import * as TreeActions from 'actions/tree';
import {File} from "components/aside/File";
import {Folder} from "components/aside/Folder";
import {EditModal} from "components/EditModal";
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
    public editModal: EditModal;
    public listenAreas: string[] = ['aside'];

    public state = {
        File,
        Folder,
        autoExpandParent: true,
        expandedKeys: ['0-0-key'],
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
            this.props.selectNode(e.node);
        }
    };

    public onNodeDoubleClick = async (e: any, node: any) => {
        
        if (node) {
            await this.editModal.setState({
                isAddMode: false,
                isFileMode : (node instanceof this.state.File),
                name: node.props.title,
            })
            this.editModal.toggleModal()(e);
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

    public onKeyUp = (selectedNode: any) => async (e: any) => {
        if (!selectedNode) {
            return;
        }

        if (this.listenAreas.indexOf(e.target.id) === -1) {
            return;
        }

        if (['Backspace'].indexOf(e.key) !== -1) {
            return this.setState({ buffer: null })
        };


        if (['Delete'].indexOf(e.key) !== -1) {
            const newTree = this.props.treeData;
            TreeService.removeNode(newTree, selectedNode);
            await this.props.selectNode(null);
            return this.props.setTree(newTree);
        };        
         
        if (['Enter'].indexOf(e.key) !== -1) {
            if (selectedNode instanceof this.state.File) {
                return this.setState({ buffer: JSON.stringify(selectedNode.props) })
            }

            let realNode: any;
            const nodeKey = selectedNode.props ? selectedNode.props.eventKey: selectedNode.key;

            TreeService.getNode(this.props.treeData, nodeKey, ((item: any, index: any, arr:any) => {
                realNode = item;
            }));

            if (this.props.asideSelectNode) {
                /*const expandedKeys = [...this.state.expandedKeys, realNode.key]
                this.setState({expandedKeys});*/
                this.props.asideSelectNode(realNode);
            }
        };
    }

    public render() {
        return (<div className={"col-md-3 nopadding"} id="aside" onKeyUp={this.onKeyUp(this.props.selectedNode)} tabIndex={2}>
            <div className="draggable-container">
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
                    {this.loop(this.props.treeData)}
                </Tree>
                <EditModal ref={this.setEditModal} onConfirm={this.confirmSave}/>
            </div>
        </div>);
    }

    public setEditModal = (editModal: any) => (this.editModal = editModal);

    public confirmSave = (nodeData: any) => {
        const newTree = this.props.treeData;
        TreeService.updateNode(newTree, this.props.selectedNode, nodeData, false);
        this.props.setTree(newTree);
    };
}

export function mapStateToProps({ AsideReducer, TreeReducer }: IApplicationState) {
    return {
        selectedNode: AsideReducer.node, 
        treeData: TreeReducer.data
    }
}

export function mapDispatchToProps(dispatch: Dispatch<AsideTypes.AsideAction | TreeTypes.TreeAction>) {
  return {
      selectNode: (node: any) => dispatch(AsideActions.selectNode(node)),
      setTree: (treeData: any) => dispatch(TreeActions.setTree(treeData)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Aside);