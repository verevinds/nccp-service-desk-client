import React, { memo, useState, useEffect, useMemo, useLayoutEffect, Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import IncidentWindowButton from '../component/IncidentWindowButton/IncidentWindowButton';
import { incidentChoose } from '../redux/actionCreators/incidentAction';
import { incidentRequestSuccessed } from '../redux/actionCreators/incidentAction';
import { IncidentContext } from '../component/Incident/IncidentContext';
import SpinnerGrow from '../component/SpinnerGrow/SpinnerGrow';
import { IState, TIncident } from '../interface';
const Incident = React.lazy(() => import('../component/Incident/Incident'));

export interface IMainPage {
  match: {
    params: { id: number };
    isExact: boolean;
    path: string;
    url: string;
  };
}

const MainPage = (props: IMainPage) => {
  // Получаем авторизированного сотрудника из хранилища
  const user = useSelector((state: IState) => state.auth.user);
  // Получаем инциденты для работы из хранилища
  const list = useSelector((state: IState) => state.incidents.list);
  // Локальная обработка состояния параметров для запроса
  const [params, setParams] = useState<{ departmentId: number } | undefined>();
  // Локальное обработка состояния заголовка для страницы
  const [title, setTitle] = useState(`Инциденты`);
  // Подключаем хук для обработки экшенов
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    let id = props.match.params.id;
    let incident = list.find((item: TIncident) => item.id === Number(id));
    dispatch(incidentChoose(incident));
  }, [list, dispatch, props.match.params.id]);

  useEffect(() => {
    if (user) {
      let isDepartment = !!user.department;

      setParams({ departmentId: user.departmentId });

      if (isDepartment) setTitle(`${user.department?.name}`);
    }
  }, [user]);

  // list.sort((a, b) => (Number(a.updatedAt) > Number(b.updatedAt) ? 1 : -1))
  const incident = useMemo(() => {
    return {
      params,
      title,
      requestSuccessed: incidentRequestSuccessed,
      Buttons: IncidentWindowButton,
      match: { path: '/incident' },
    };
  }, [params, title]);

  return (
    <IncidentContext.Provider value={incident}>
      <h1>Рабочая панель</h1>
      <Suspense fallback={<SpinnerGrow />}>
        <Incident />
      </Suspense>
    </IncidentContext.Provider>
  );
};

export default memo(MainPage);
