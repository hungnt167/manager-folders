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