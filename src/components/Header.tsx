import * as React from 'react';
import {MenuItem, Nav, Navbar, NavDropdown} from 'react-bootstrap';

class Header extends React.Component {
    public render() {
        return (
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
                            <MenuItem eventKey={3.1}>Folder</MenuItem>
                            <MenuItem eventKey={3.2}>File</MenuItem>
                        </NavDropdown>
                    </Nav>

                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default Header;
