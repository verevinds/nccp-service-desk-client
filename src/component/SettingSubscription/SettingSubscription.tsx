import React, { memo, Fragment, useEffect, useCallback } from 'react';
import { Row, Container, CardColumns } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import SettingSubscriptionCard from '../SettingSubscriptionCard/SettingSubscriptionCard';
import { queryApi } from '../../redux/actionCreators/queryApiAction';
import { subscriptionRequestSuccessed } from '../../redux/actionCreators/subscriptionAction';
import { IState } from '../../interface';
export interface ISettingSubscription {}

const SettingSubscription: React.FC<ISettingSubscription> = (props) => {
  const user = useSelector((state: IState) => state.auth.user);
  const isUpdate = useSelector((state: IState) => state.subscription.isUpdate);
  const dispatch = useDispatch();

  const fetchSubscription = useCallback(() => {
    dispatch(
      queryApi({
        route: 'subscriptions',
        actionSuccessed: subscriptionRequestSuccessed,
        params: { userNumber: user.number },
      }),
    );
  }, [user, dispatch]);

  useEffect(() => {
    fetchSubscription();
  }, [fetchSubscription]);
  useEffect(() => {
    if (isUpdate) fetchSubscription();
  }, [isUpdate, fetchSubscription]);

  return (
    <Fragment>
      <h2>Подписки</h2>
      <Row>
        <Container>
          <h3>Шаблоны</h3>
          <CardColumns>
            {
              //   <SettingSubscriptionCard
              //   title={'Мой отдел'}
              //   text={`Уведомление на почту о каждой новой заявке, поступившей в Ваш отдел.`}
              //   code={100}
              // />
              // <SettingSubscriptionCard
              //   title={'Моя ответственность'}
              //   text={`Уведомление на почту о каждом изменении по заявкам, в которых Вы назначены ответственным.`}
              //   code={200}
              // />
            }

            <SettingSubscriptionCard
              title={'Мои заявки'}
              text={`Уведомление на почту о каждом изменении по Вашим заявкам.`}
              code={300}
            />
          </CardColumns>
        </Container>
      </Row>
    </Fragment>
  );
};

export default memo(SettingSubscription);
