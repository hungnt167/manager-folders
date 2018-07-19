import classNames from "classnames";
import Tree, {TreeNode} from 'rc-tree';
import 'rc-tree/assets/index.css';
import * as React from "react";
import { connect } from 'react-redux';
import * as Types from 'types/panel';

const FolderIcon = ({ selected }:{ selected: any }) => (
  <span
    className={classNames(
      'glyphicon glyphicon-folder-close',
      selected && 'glyphicon glyphicon-folder-open',
    )}
  />
);

const FileIcon = ({ selected }:{ selected: any }) => (
  <span
    className={classNames(
      'glyphicon glyphicon-file',
      selected && 'glyphicon glyphicon-eye-open',
    )}
  />
);

interface IMainProps {
	aside: any
}

interface IMainState {
  autoExpandParent: boolean,
  expandedKeys: string[],
  gData: object[],
  selectedNode: any
}

export class Main extends React.Component<IMainProps, IMainState> {
    public state = {
        autoExpandParent: true,
        expandedKeys: ['0-0-key', '0-0-0-key', '0-0-0-0-key'],
        gData: [],
        selectedNode: null
    };

    public onDragStart = (info: any) => {
        return info;
    };
    public onDragEnter = (info: any) => {
        this.setState({
            expandedKeys: info.expandedKeys,
        });
    };
    public onDrop = (info: any) => {
        const dropKey = info.node.props.eventKey;
        const dragKey = info.dragNode.props.eventKey;
        const dropPos = info.node.props.pos.split('-');
        const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);
        // const dragNodesKeys = info.dragNodesKeys;
        const loop = (Data: any, key: any, callback: any) => {
            Data.forEach((item: any, index: any, arr:any) => {
                if (item.key === key) {
                    callback(item, index, arr);
                    return;
                }
                if (item.children) {
                    loop(item.children, key, callback);
                }
            });
        };
        const data = [...this.state.gData];
        let dragObj: any;
        let dropObj: any;
        
        loop(data, dropKey, (item: any) => {
            dropObj = item;
        });

        if (dropObj.isFile) {
            return;
        }

        loop(data, dragKey, ((item: any, index: any, arr:any) => {
            arr.splice(index, 1);
            dragObj = item;
        }));
        if (info.dropToGap) {
            let ar: any;
            let i: any;
            loop(data, dropKey, ((item: any, index: any, arr:any) => {
                ar = arr;
                i = index;
            }));
            if (dropPosition === -1) {
                ar.splice(i, 0, dragObj);
            } else {
                ar.splice(i + 1, 0, dragObj);
            }
        } else {
            loop(data, dropKey, (item: any) => {
                item.children = item.children || [];
                item.children.push(dragObj);
            });
        }
        this.setState({
            gData: data,
        });
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
        }
    };

    public render() {
        const loop = (data: any) => {
            return data.map((item: any) => {
                if (item.children && item.children.length) {
                    return <TreeNode icon={FolderIcon} key={item.key} title={item.title}>{loop(item.children)}</TreeNode>;
                }

                const Icon = item.isFile ? FileIcon : FolderIcon;

                return <TreeNode icon={Icon} key={item.key} title={item.title}/>;
            });
        };

        return (<div className={"col-md-9"}>
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
                    {loop(this.state.gData)}
                </Tree>
            </div>
        </div>);
    }
}

export function mapStateToProps({ node }: Types.IPanelState) {
  return {
    node
  }
}

export function mapDispatchToProps(dispatch: any) {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);