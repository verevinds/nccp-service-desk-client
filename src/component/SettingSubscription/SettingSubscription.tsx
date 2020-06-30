import React, { memo, Fragment, useState, useEffect } from 'react';
import { Row, Container, CardColumns, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import SettingSubscriptionCard from '../SettingSubscriptionCard/SettingSubscriptionCard';
import { queryApi } from '../../redux/actionCreators/queryApiAction';
import { subscriptionRequestSuccessed } from '../../redux/actionCreators/subscriptionAction';
import { IState } from '../../interface';
export interface ISettingSubscription {}

const SettingSubscription: React.FC<ISettingSubscription> = (props) => {
  const [state, setState] = useState();
  const subscriptions = useSelector((state: IState) => state.subscription.list);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      queryApi({
        route: 'subscriptions',
        actionSuccessed: subscriptionRequestSuccessed,
      }),
    );
  }, []);

  return (
    <Fragment>
      <h2>Подписки</h2>
      <Row>
        <Container>
          <h3>Шаблоны</h3>
          <CardColumns>
            <SettingSubscriptionCard
              title={'Мой отдел'}
              text={`Уведомление на почту о каждой новой заявке, поступившей в Ваш отдел.`}
              code={100}
            />
            <SettingSubscriptionCard
              title={'Моя ответственность'}
              text={`Уведомление на почту о каждом изменении по заявкам, в которых Вы назначены ответственным.`}
              code={200}
            />

            <SettingSubscriptionCard
              title={'Мои заявки'}
              text={`Уведомление на почту о каждом изменении по Вашим заявкам.`}
              code={300}
            />
          </CardColumns>
        </Container>
      </Row>
      <Row>
        <Container className="mt-1">
          <h3>Пользовательские</h3>
          <i>В разработке...</i>
        </Container>
      </Row>
    </Fragment>
  );
};

export default memo(SettingSubscription);
