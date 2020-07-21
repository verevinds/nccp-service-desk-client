import React, { memo, Fragment, useState, useMemo, useContext, Dispatch, SetStateAction } from 'react';
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

  const [search, setSearch] = useState({
    id: 1,
    name: 'Инициатор',
  });
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
      default:
        break;
    }

    props.setSearch(filterIncidents);
  }, [text]);

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
              setSearch({
                id: 1,
                name: 'Инициатор',
              });
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
              });
            }}
            disabled={search.id === 2}
          >
            Должность
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );

    return { element };
  }, [search]);

  return (
    <div className={styles.search}>
      <FilterQuery dropdowns={dropdowns} handleText={{ text, setText }} />
    </div>
  );
};

export default memo(SidebarSearch);
