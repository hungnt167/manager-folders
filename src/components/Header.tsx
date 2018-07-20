import * as TreeActions from "actions/tree";
import * as React from 'react';
import {Button, FormControl, FormGroup, MenuItem, Modal, Nav, Navbar, NavDropdown} from 'react-bootstrap';
import {connect} from "react-redux";
import {Dispatch} from "redux";
import * as AsideTypes from "types/aside";
import {IApplicationState} from "types/index";
import * as TreeTypes from "types/tree";

export interface IHeaderStates {
    isFileMode: boolean
    name: string
    show: boolean,
}

class Header extends React.Component<any, IHeaderStates> {
    public state = {
        isFileMode: true,
        name: '',
        show: false
    };

    public render() {
        return (
            <React.Fragment>
                <Navbar fluid={true}>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#">Manage Folders</a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav pullRight={true}>
                            <NavDropdown
                                noCaret={true}
                                eventKey={3} title="Add"
                                id="basic-nav-dropdown"
                                active={false}
                            >
                                <MenuItem eventKey={3.1} onClick={this.toggleModal(false)}>Folder</MenuItem>
                                <MenuItem eventKey={3.2} onClick={this.toggleModal(true)}>File</MenuItem>
                            </NavDropdown>
                        </Nav>

                    </Navbar.Collapse>
                </Navbar>
                <Modal
                    show={this.state.show}
                    onHide={this.toggleModal}
                    container={this}
                    aria-labelledby="contained-modal-title"
                    bsSize={"small"}
                >
                    <Modal.Header closeButton={true}>
                        <Modal.Title id="contained-modal-title">
                            Add new {this.state.isFileMode ? 'file' : 'folder' }
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormGroup
                            controlId="formBasicText"
                        >
                            <FormControl
                                autoFocus={true}
                                onChange={this.onChangeName}
                                value={this.state.name}
                                type="text"
                                placeholder="Enter name"
                            />
                        </FormGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.toggleModal()}>Close</Button>
                        <Button bsStyle="primary" onClick={this.confirmAdd()}>Add</Button>
                    </Modal.Footer>
                </Modal>
            </React.Fragment>
        );
    }

    public onChangeName = (e:any) => {
        this.setState({ name: e.target.value });
    };

    public confirmAdd = () => (event: React.MouseEvent<Button>) => {
        this.props.add({
            isFile: this.state.isFileMode,
            title: this.state.name
        }, this.props.selectedNode);

        this.toggleModal()(event);
    };

    private toggleModal = (isFileMode?: boolean) => (event: React.MouseEvent<Button>) => {
        const newState: any = { show: !this.state.show };

        if (isFileMode !== undefined) {
            newState.isFileMode = isFileMode;
        }

        this.setState(newState);
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
        add: (node: any, parentNode: any) => dispatch(TreeActions.treeAddNode(node, parentNode)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
