import React, { memo, useMemo, useLayoutEffect, Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
/** Typescript interface & type */
import { IState, TPropsParams, TUser, TIncidents } from '../interface';
/** Action creators */
import { incidentChoose } from '../redux/actionCreators/incidentAction';
import { incidentRequestSuccessed } from '../redux/actionCreators/incidentAction';
/** Components */
import SpinnerGrow from '../component/SpinnerGrow/SpinnerGrow';
import { IncidentContext } from '../component/Incident/IncidentContext';
import IncidentWindowButton from '../component/IncidentWindowButton/IncidentWindowButton';
import { findById } from '../js/supportingFunction';

const Incident = React.lazy(() => import('../component/Incident/Incident'));

const MainPage = (props: TPropsParams) => {
  // Получаем авторизированного сотрудника из хранилища
  const user: TUser = useSelector((state: IState) => state.auth.user);
  // Получаем инциденты для работы из хранилища
  const { list: incidents }: TIncidents = useSelector((state: IState) => state.incidents);
  // Подключаем хук для обработки action
  const dispatch = useDispatch();

  const params = useMemo(() => ({ departmentId: user?.departmentId }), [user]);
  const title = useMemo(() => `${user?.department?.name ? user?.department?.name : 'Заявки'}`, [
    user,
  ]);

  /** Создать объект для проброса в компоненты, на каждое изменение параметров запроса и заголовка */
  const incident = useMemo(
    () => ({
      params, //параметры запроса
      title, // заголовок страницы
      requestSuccessed: incidentRequestSuccessed, // action: запрос выполнен, сохранить заявку
      Buttons: IncidentWindowButton, // Кнопка для окна заявки
      match: { path: '/incident' }, // имитация пути адресной строки
      numberResponsible: user?.number,
      incidents,
    }),
    [params, title, user, incidents],
  );

  /** Если передается id  в адресной строке, выбрать заявку, иначе обнулить выбранное */
  useLayoutEffect(() => {
    const id = props.match.params.id;
    const incident = findById(incidents, id);

    dispatch(incidentChoose(incident));
  }, [incidents, dispatch, props.match.params.id]);

  return (
    <IncidentContext.Provider value={incident}>
      <Suspense fallback={<SpinnerGrow />}>
        <Incident />
      </Suspense>
    </IncidentContext.Provider>
  );
};

export default memo(MainPage);
