import React, { memo, useEffect, useState, useMemo } from 'react';
import CreateIncident from '../CreateIncident/CreateIncident';
import styles from './styles.module.css';
import logo from '../../images/logo.png';
/**Bootstrap component */
import { Navbar, Nav, Image, Button, Badge } from 'react-bootstrap';
import { useSelector, shallowEqual } from 'react-redux';
//? Font Awesome иконки
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faClipboardList, faEdit, faHome, faInfo } from '@fortawesome/free-solid-svg-icons';
import HeaderButton from '../HeaderButton/HeaderButton';

const Header = (props) => {
  const user = useSelector((state) => state.auth.user, shallowEqual);
  const version = useSelector((state) => state.app.version, shallowEqual);
  const filterState = useSelector((state) => state.filter);
  const listIncident = useSelector((state) => state.incidents.list, shallowEqual);
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
  const [page, setPage] = useState(window.location.pathname);
  const newIncidentCount = useMemo(() => {
    if (listIncident) {
      let newList = listIncident.filter((item) => item.numberResponsible !== user.number);
      if (filterState.categories || filterState.options || filterState.properties)
        if (filterState.categories.length || filterState.options.length || filterState.properties.length) {
          let combineList = [];
          for (let key in filterState) {
            if (filterState[key].length) {
              filterState[key].forEach((element) => {
                combineList.push(newList.filter((item) => item[key] === Number(element)));
              });
            }
          }
          let flatCombineList = combineList.flat();
          let uniqueFlatCombineList = Array.from(new Set(flatCombineList));

          return uniqueFlatCombineList.filter((item) => Number(item.statusId) === 0).length;
        }
      return newList.filter((item) => Number(item.statusId) === 0).length;
    }
  }, [listIncident, filterState, user]);
  return (
    <nav>
      <Navbar collapseOnSelect expand="lg" variant="light" className="bg">
        <Navbar.Brand>
          <a href="http://www.c31.nccp.ru/">
            <Image src={logo} className={styles.logo} />
          </a>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className={`${styles.nav} mr-auto`}>
            <Nav.Item>
              <HeaderButton to={'/myincidents'} faIcon={faHome} page={page} setPage={setPage} text={'Мои заявки'} />
              <HeaderButton
                to={'/'}
                faIcon={faClipboardList}
                newIncidentCount={newIncidentCount}
                page={page}
                setPage={setPage}
                text={'Рабочая панель'}
              />
            </Nav.Item>{' '}
          </Nav>
          <Nav>
            <Nav.Item className="fcc">
              <Button onClick={handleOpen} size="sm">
                <FontAwesomeIcon icon={faEdit} size="sm" className="mr-1" />
                Создать заявку
              </Button>
              {!!showModal && user ? (
                <CreateIncident handleClose={handleClose} showModal={showModal} user={user} />
              ) : null}
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="">
                <div className={styles.user}>
                  <Navbar.Text className="pr-1">{`${fullName}`}</Navbar.Text>
                  <div className={styles.avatar}>
                    <Image src={user ? user.photo : ''} roundedCircle className={styles.avatar__img} />
                  </div>
                </div>
              </Nav.Link>
            </Nav.Item>

            <Nav.Item className={styles.nav__item}>
              <HeaderButton to={'/setting'} faIcon={faCog} page={page} setPage={setPage} />
            </Nav.Item>
          </Nav>
          <div className={styles.info}>
            <HeaderButton to={'/info'} faIcon={faInfo} page={page} setPage={setPage} />
            {String(version) !== localStorage.getItem('version') ? (
              <Badge variant="primary" pill className={styles.info__badge}>
                !
              </Badge>
            ) : undefined}
          </div>
        </Navbar.Collapse>
      </Navbar>
    </nav>
  );
};

export default memo(Header);
