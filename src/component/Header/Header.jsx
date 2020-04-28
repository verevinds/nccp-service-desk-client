import React, { memo, useEffect, useState } from 'react';
import CreateIncidentModal from '../CreateIncidentModal/CreateIncidentModal';

/**Bootstrap component */
import { Navbar, Nav, Image, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const incident = 0;

const Header = (props) => {
  const { user } = useSelector((state) => state.auth);

  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleOpen = () => setShowModal(true);

  /**Получаем полное имя при изменение сущности users в store */
  const [fullName, setFullName] = useState('');
  useEffect(() => {
    if (!!user) {
      setFullName(`${user.name1 || 'N'} ${user.name2 || 'N'}`);
    } else {
      setFullName(`Гость`);
    }
  }, [user]);

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
              <Button onClick={handleOpen}>Создать инцидент</Button>
              {!!showModal ? (
                <CreateIncidentModal
                  handleClose={handleClose}
                  showModal={showModal}
                />
              ) : null}
            </Nav.Item>
          </Nav>
          <Nav>
            <Nav.Link href="">
              <Navbar.Text className="pr-1">{`${fullName}`}</Navbar.Text>
              <Image src="https://via.placeholder.com/35" roundedCircle />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </nav>
  );
};

export default memo(Header);
