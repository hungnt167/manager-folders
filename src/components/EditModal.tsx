import * as React from 'react';
import {Button, FormControl, FormGroup, Modal} from 'react-bootstrap';

export interface IEditModalProps {
    onConfirm?(nodeData: any): any
}

export interface IEditModalStates {
    isAddMode: boolean
    isFileMode: boolean
    name: string
    show: boolean,
}

export class EditModal extends React.Component<IEditModalProps, IEditModalStates>{
	public state = {
        isAddMode: true,
        isFileMode: true,
        name: '',
        show: false
    };

	public render() {
		return <Modal
                    show={this.state.show}
                    onHide={this.toggleModal}
                    container={this}
                    aria-labelledby="contained-modal-title"
                    bsSize={"small"}
                >
                    <Modal.Header closeButton={true}>
                        <Modal.Title id="contained-modal-title">
                            {this.state.isAddMode ? 'Add new' : 'Edit' }&nbsp; 
                            {this.state.isFileMode ? 'file' : 'folder' }&nbsp;
                            {this.state.name}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormGroup
                            controlId="formBasicText"
                        >
                            <FormControl
                                autoFocus={true}
                                onChange={this.onChangeName}
                                onKeyPress={this.onKeyPressName}
                                value={this.state.name}
                                type="text"
                                placeholder="Enter name"
                            />
                        </FormGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.toggleModal()}>Close</Button>
                        <Button bsStyle="primary" onClick={this.confirm()}>Add</Button>
                    </Modal.Footer>
                </Modal>;
	}

	public onChangeName = (e:any) => {
        this.setState({ name: e.target.value });
    };

    public onKeyPressName = (e:any) => {
        if (e.key === 'Enter') {
            this.confirm()(e);
        }
    };

    public confirm = () => (event: React.MouseEvent<Button>) => {
        if (this.props.onConfirm) {
        	this.props.onConfirm({
                children: [],
	            isFile: this.state.isFileMode,
	            title: this.state.name
	        });
        }

        this.toggleModal()(event);
    };

    public toggleModal = (isFileMode?: boolean) => (event: React.MouseEvent<Button>) => {
        const newState: any = { show: !this.state.show };

        if (this.state.isAddMode) {
        	newState.name = '';
        }

        if (isFileMode !== undefined) {
            newState.isFileMode = isFileMode;
        }

        this.setState(newState);
    };
}