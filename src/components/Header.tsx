import * as TreeActions from "actions/tree";
import {EditModal as AddModal} from "components/EditModal";
import * as React from 'react';
import {Button, MenuItem, Nav, Navbar, NavDropdown} from 'react-bootstrap';
import {connect} from "react-redux";
import {Dispatch} from "redux";
import * as AsideTypes from "types/aside";
import {IApplicationState} from "types/index";
import * as TreeTypes from "types/tree";

export class Header extends React.Component<any, any> {
    public addModal: AddModal;

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
                <AddModal ref={this.setAddModal} onConfirm={this.confirmAdd}/>
            </React.Fragment>
        );
    }

    public setAddModal = (addModal: any) => (this.addModal = addModal);

    public confirmAdd = (nodeData: any) => {
        this.props.add(nodeData, this.props.selectedNode);
    };

    public toggleModal = (isFileMode?: boolean) => (event: React.MouseEvent<Button>) => {
        this.addModal.toggleModal(isFileMode)(event);
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
