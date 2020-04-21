import React, { memo } from 'react';

/**Bootstrap component */
import { Navbar, Nav, Image, Button, Badge } from 'react-bootstrap';

const incident = 0;

const Header = (props) => {
  return (
    <nav>
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Navbar.Brand>Service Desk</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Item>
              <Button variant={incident > 0 ? 'primary' : 'light'}>
                <span className="pr-1">Отработанные инциденты</span>
              </Button>
            </Nav.Item>
            <Nav.Item>
              <Button>Создать инцидент</Button>
            </Nav.Item>
          </Nav>
          <Nav>
            <Nav.Link href="#deets">
              <Navbar.Text className="pr-1">Веревин Денис</Navbar.Text>
              <Image src="https://via.placeholder.com/35" roundedCircle />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </nav>
  );
};

export default memo(Header);
