import React, { memo, useEffect, useState, useMemo } from 'react';
import CreateIncident from '../CreateIncident/CreateIncident';
import styles from './styles.module.css';
import logo from '../../images/logo.webp';
import { nameUser } from '../../js/supportingFunction';
/**Bootstrap component */
import { Navbar, Nav, Image, Button, Badge } from 'react-bootstrap';
import { useSelector, shallowEqual } from 'react-redux';
//? Font Awesome иконки
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCog,
  faClipboardList,
  faEdit,
  faHome,
  faInfo,
  faBusinessTime,
  faUserTie,
} from '@fortawesome/free-solid-svg-icons';
import HeaderButton from '../HeaderButton/HeaderButton';

const Header = (props) => {
  const user = useSelector((state) => state.auth.user, shallowEqual);
  const version = useSelector((state) => state.app.version, shallowEqual);
  const filterState = useSelector((state) => state.filter);
  const listIncident = useSelector((state) => state.incidents.list);
  const allowToCreate = useSelector((state) => state.incidents.allowToCreate);
  const myList = useSelector((state) => state.incidents.myList);
  const visa = useSelector((state) => state.incidents.visa);
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleOpen = () => setShowModal(true);
  /**Получаем полное имя при изменение сущности users в store */
  const [fullName, setFullName] = useState('');
  useEffect(() => {
    !!user ? setFullName(nameUser(user)?.fullName()) : setFullName(`Гость`);
  }, [user]);

  const [page, setPage] = useState(window.location.pathname);
  const newIncidentCount = useMemo(() => {
    if (listIncident) {
      let newList = listIncident.filter((item) => item.numberResponsible !== user?.number);
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

  const newMyDepartmentIncidentCount = useMemo(() => {
    return allowToCreate.length;
  }, [allowToCreate]);
  const newVisaIncidentCount = useMemo(() => {
    return visa.length;
  }, [visa]);
  const newMyIncidentCount = useMemo(() => {
    return myList.filter((item) => item.statusId === 8388605 || item.statusId === 8388607).length;
  }, [myList]);

  console.log(page);
  return (
    <nav>
      <Navbar
        collapseOnSelect
        expand="lg"
        variant="light"
        style={{ backgroundColor: '#fff', boxShadow: '0px 0px 6px 1px rgba(0,0,0,0.2)' }}
      >
        <Navbar.Brand className={styles.brand}>
          <a href="http://www.c31.nccp.ru/">
            <Image src={logo} className={styles.logo} />
          </a>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className={`${styles.nav} mr-auto`}>
            <Nav.Item>
              <HeaderButton
                to={'/myincidents'}
                faIcon={faHome}
                page={page}
                setPage={setPage}
                text={'Мои заявки'}
                tooltip={{
                  list: myList || [],
                  isListTooltips: 'Заявки созданные Вами',
                  isNoListTooltips: 'Все Ваши заявки были выполнены, и находятся в статусе "Закрыт"',
                }}
                newIncidentCount={newMyIncidentCount}
              />
              <HeaderButton
                to={'/'}
                faIcon={faClipboardList}
                page={page}
                setPage={setPage}
                text={'Рабочая панель'}
                tooltip={{
                  list: listIncident || [],
                  isListTooltips: 'Заявки по Вашей зоне ответственности',
                  isNoListTooltips: 'Заявок по Вашей зоне ответственности нет',
                }}
                newIncidentCount={newIncidentCount}
              />
              {user?.position?.level < 1 ? undefined : (
                <>
                  <HeaderButton
                    to={'/MyDepartmentPage'}
                    faIcon={faUserTie}
                    page={page}
                    setPage={setPage}
                    text={'Руководитель'}
                    tooltip={{
                      list: allowToCreate || [],
                      isListTooltips:
                        'Заявки из Вашего отдела, требующие Вашего согласования для проявления согласия в надобности создания заявки.',
                      isNoListTooltips: 'Заявок по Вашему отделу, требующих Вашего внимания, нет',
                    }}
                    newIncidentCount={newMyDepartmentIncidentCount}
                  />
                  <HeaderButton
                    to={'/visa'}
                    faIcon={faBusinessTime}
                    page={page}
                    setPage={setPage}
                    text={'Согласование'}
                    tooltip={{
                      list: visa || [],
                      isListTooltips: 'Заявки, которые требуют Вашего согласования для принятия их на исполнение.',
                      isNoListTooltips: 'Заявок по Вашему отделу, требующих Вашего внимания, нет',
                    }}
                    newIncidentCount={newVisaIncidentCount}
                  />
                </>
              )}
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
                  <Navbar.Text className="pr-1 nowrap">{`${fullName}`}</Navbar.Text>
                  <div className={styles.avatar}>
                    <Image src={user ? user.photo : ''} roundedCircle className={styles.avatar__img} />
                  </div>
                </div>
              </Nav.Link>
            </Nav.Item>

            <Nav.Item className={styles.nav__item}>
              <HeaderButton
                to={'/setting'}
                faIcon={faCog}
                page={page}
                setPage={setPage}
                tooltip={{
                  isNoListTooltips: 'Настройка приложения',
                }}
              />
            </Nav.Item>
          </Nav>
          <div className={styles.info}>
            <HeaderButton
              to={'/info'}
              faIcon={faInfo}
              page={page}
              setPage={setPage}
              tooltip={{
                isNoListTooltips: 'Информация о приложении',
              }}
            />
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
