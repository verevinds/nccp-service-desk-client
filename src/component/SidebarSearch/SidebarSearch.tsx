import React, { memo, useState, useMemo, useContext, Dispatch, SetStateAction } from 'react';
import { useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { IState, TIncident, TPosition, TUser } from '../../interface';
import FilterQuery from '../FilterQuery/FilterQuery';
import { IncidentContext } from '../Incident/IncidentContext';
import styles from './styles.module.scss';
export interface ISidebarSearch {
  search: TIncident[] | undefined;
  setSearch: Dispatch<SetStateAction<TIncident[] | undefined>>;
}

const SidebarSearch: React.FC<ISidebarSearch> = (props) => {
  const { incidents } = useContext(IncidentContext);

  const users: TUser[] = useSelector((state: IState) => state.users.list);
  const positions: TPosition[] = useSelector((state: IState) => state.positions.list);

  const InitialSearch = {
    id: 1,
    name: 'Инициатор',
    placeholder: 'Иванов Иван Иванович',
  };
  const [search, setSearch] = useState(InitialSearch);
  const [text, setText] = useState('');

  useEffect(() => {
    let filterIncidents = undefined;

    switch (search.id) {
      case 1:
        const usersNumbers: number[] = users
          .filter(
            (user: TUser) => ~`${user.name1} ${user.name2} ${user.name3}`.toLowerCase().indexOf(text.toLowerCase()),
          )
          .map((user: TUser) => user.number);

        filterIncidents = incidents?.filter(
          (incident: TIncident) => ~usersNumbers.findIndex((userNumber: number) => userNumber === incident.userNumber),
        );
        break;
      case 2:
        const positionsId: number[] = positions
          .filter((position: TPosition) => ~`${position.name}`.toLowerCase().indexOf(text.toLowerCase()))
          .map((position: TPosition) => position.id);

        const usersNumbersByPosition: number[] = users
          .filter((user: TUser) => ~positionsId.findIndex((positionId: number) => positionId === user.positionId))
          .map((user: TUser) => user.number);

        filterIncidents = incidents?.filter(
          (incident: TIncident) =>
            ~usersNumbersByPosition.findIndex((userNumber: number) => userNumber === incident.userNumber),
        );
        break;
      case 3:
        const usersNumbersByPhone: number[] = users
          .filter((user: TUser) => ~`${user.phone1} ${user.phone2}`.toLowerCase().indexOf(text.toLowerCase()))
          .map((user: TUser) => user.number);

        filterIncidents = incidents?.filter(
          (incident: TIncident) =>
            ~usersNumbersByPhone.findIndex((userNumber: number) => userNumber === incident.userNumber),
        );
        break;
      case 4:
        const usersNumbersByEmail: number[] = users
          .filter((user: TUser) => ~user.email.toLowerCase().indexOf(text.toLowerCase()))
          .map((user: TUser) => user.number);

        filterIncidents = incidents?.filter(
          (incident: TIncident) =>
            ~usersNumbersByEmail.findIndex((userNumber: number) => userNumber === incident.userNumber),
        );
        break;
      default:
        break;
    }

    props.setSearch(filterIncidents);

    // eslint-disable-next-line
  }, [text, search.id]);

  const dropdowns = useMemo(() => {
    const element = (
      <Dropdown>
        <Dropdown.Toggle id="dropdown-basic" variant="outline-light" size="sm" className={styles.search__button}>
          {search.name}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => {
              setText('');
              setSearch(InitialSearch);
            }}
            disabled={search.id === 1}
          >
            Инициатор
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              setText('');
              setSearch({
                id: 2,
                name: 'Должность',
                placeholder: 'Инженер',
              });
            }}
            disabled={search.id === 2}
          >
            Должность
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              setText('');
              setSearch({
                id: 3,
                name: 'Телефон',
                placeholder: '11-11',
              });
            }}
            disabled={search.id === 3}
          >
            Телефон
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              setText('');
              setSearch({
                id: 4,
                name: 'Электронная почта',
                placeholder: 'ivd80123@c31.nccp.ru',
              });
            }}
            disabled={search.id === 4}
          >
            Электронная почта
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );

    return { element };
  }, [search]);

  return (
    <div className={styles.search}>
      <FilterQuery dropdowns={dropdowns} options={{ placeholder: search.placeholder }} handleText={{ text, setText }} />
    </div>
  );
};

export default memo(SidebarSearch);
