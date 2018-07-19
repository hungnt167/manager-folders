import Tree, {TreeNode} from 'rc-tree';
import * as React from "react";
import {gData} from './util';

export class Aside extends React.Component {
    public state = {
        autoExpandParent: true,
        expandedKeys: ['0-0-key', '0-0-0-key', '0-0-0-0-key'],
        gData,
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
                // where to insert 示例添加到尾部，可以是随意位置
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

    public render() {
        const loop = (data: any) => {
            return data.map((item: any) => {
                if (item.children && item.children.length) {
                    return <TreeNode key={item.key} title={item.title}>{loop(item.children)}</TreeNode>;
                }
                return <TreeNode key={item.key} title={item.title}/>;
            });
        };
        return (<div className={"col-md-3"}>
            <div className="draggable-container">
                <Tree
                    expandedKeys={this.state.expandedKeys}
                    onExpand={this.onExpand} autoExpandParent={this.state.autoExpandParent}
                    draggable={true}
                    onDragStart={this.onDragStart}
                    onDragEnter={this.onDragEnter}
                    onDrop={this.onDrop}
                >
                    {loop(this.state.gData)}
                </Tree>
            </div>
        </div>);
    }
}