import React, { memo, useEffect, useState } from 'react';
import CreateIncidentModal from '../CreateIncident/CreateIncident';
import { NavLink } from 'react-router-dom';
import styles from './styles.module.css';

/**Bootstrap component */
import { Navbar, Nav, Image, Button, Badge } from 'react-bootstrap';
import { useSelector, shallowEqual } from 'react-redux';
//? Font Awesome иконки
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

const Header = (props) => {
  const user = useSelector((state) => state.auth.user, shallowEqual);
  const isAccess = useSelector((state) => state.access.isAccess, shallowEqual);
  const list = useSelector((state) => state.catalog.list, shallowEqual);
  const listIncident = useSelector(
    (state) => state.incidents.list,
    shallowEqual,
  );
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
          <Nav className={`${styles.nav} mr-auto`}>
            <Nav.Item>
              <NavLink
                to="/"
                activeClassName={`btn-light`}
                className={`btn btn-link align-middle ${styles.nav__button}`}
              >
                Рабочая панель
                {!!listIncident.length ? (
                  <Badge variant="primary" className={'ml-1'}>
                    {
                      listIncident.filter((item) => Number(item.statusId) === 0)
                        .length
                    }
                  </Badge>
                ) : undefined}
              </NavLink>
              <NavLink
                to="/myincidents"
                activeClassName={`btn-light ${styles.nav__button}`}
                className={`btn btn-link align-middle ${styles.nav__button}`}
              >
                Мои инциденты
              </NavLink>
            </Nav.Item>{' '}
            <Nav.Item>
              <Button onClick={handleOpen}>Создать инцидент</Button>
              {!!showModal && list.length && user ? (
                <CreateIncidentModal
                  handleClose={handleClose}
                  showModal={showModal}
                  user={user}
                  list={list}
                />
              ) : null}
            </Nav.Item>
          </Nav>
          <Nav>
            <Nav.Item>
              <Nav.Link href="">
                <div className={styles.user}>
                  <Navbar.Text className="pr-1">{`${fullName}`}</Navbar.Text>
                  <div className={styles.avatar}>
                    <Image
                      src={user ? user.photo : ''}
                      roundedCircle
                      className={styles.avatar__img}
                    />
                  </div>
                </div>
              </Nav.Link>
            </Nav.Item>
            {isAccess >= 1 ? (
              <Nav.Item className={styles.nav__item}>
                <NavLink
                  to="/setting"
                  activeClassName={'btn-light'}
                  className="btn btn-link align-middle"
                >
                  <FontAwesomeIcon icon={faCog} />
                </NavLink>
              </Nav.Item>
            ) : null}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </nav>
  );
};

export default memo(Header);
