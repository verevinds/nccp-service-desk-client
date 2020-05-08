import React, { memo, useEffect, useState } from 'react';
import CreateIncidentModal from '../CreateIncidentModal/CreateIncidentModal';
import { NavLink } from 'react-router-dom';
import styles from './styles.module.css';

/**Bootstrap component */
import { Navbar, Nav, Image, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
//? Font Awesome иконки
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

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
    <nav className="mb-1">
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Navbar.Brand>Service Desk</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className={`${styles.nav} mr-auto`}>
            <Nav.Item>
              <NavLink
                to="/"
                activeClassName={`btn-light ${styles.nav__button}`}
                className="btn btn-link align-middle"
              >
                Рабочая панель
              </NavLink>
              <NavLink
                to="/myincidents"
                activeClassName={`btn-light ${styles.nav__button}`}
                className="btn btn-link align-middle"
              >
                Мои инциденты
              </NavLink>
            </Nav.Item>{' '}
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
            <Nav.Item>
              <Nav.Link href="">
                <Navbar.Text className="pr-1">{`${fullName}`}</Navbar.Text>
                <Image src="https://via.placeholder.com/35" roundedCircle />
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className={styles.nav__item}>
              <NavLink
                to="/setting"
                activeClassName={'btn-light'}
                className="btn btn-link align-middle"
              >
                <FontAwesomeIcon icon={faCog} />
              </NavLink>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </nav>
  );
};

export default memo(Header);
