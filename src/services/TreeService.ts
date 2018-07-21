import {File} from 'components/aside/File';

export class TreeService {
	public static addNode = (tree:any, node: any, parent: any) => {
		let parentKey = parent.props ? parent.props.eventKey : parent.key;

		if (parent instanceof File) {
			parentKey = parentKey.split('-');
			parentKey.splice(parentKey.length - 2, 1);
			parentKey = parentKey.join('-');
		}

		TreeService.getNode(tree, parentKey, ((item: any, index: any, arr:any) => {
            item.children = item.children || [];

            const childQty = item.children.length;
            node.key = item.key.replace('key', `${childQty}-key`); 
            item.children.push(node);
        }));

        return tree;
	};

	public static removeNode = (tree:any, node: any) => {
		const nodeKey = node.props.eventKey;
		let parentKey = nodeKey.split('-');
		parentKey.splice(parentKey.length - 2, 1);
		parentKey = parentKey.join('-');

		TreeService.getNode(tree, parentKey, ((item: any, index: any, arr:any) => {
            item.children.forEach((child: any, childIndex: number) => {
            	if (child.key === nodeKey) {
            		item.children.splice(childIndex, 1);
            	}
            })
            
        }));

        return tree;
	};

	public static updateNode = (tree:any, node: any, nodeData: any, parent: any) => {
		TreeService.getNode(tree, node.props.eventKey, ((item: any, index: any, arr:any) => {
            item = Object.assign(item, nodeData);
        }));

        return tree;
	};

	public static getNode = (data: any, key: any, callback: any) => {
        data.forEach((item: any, index: any, arr:any) => {
            if (item.key === key) {
                callback(item, index, arr);
                return;
            }
            if (item.children) {
                TreeService.getNode(item.children, key, callback);
            }
        });
    };
}