import React, { memo, Fragment, useState, useEffect } from 'react';
import { Card, Button, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faBellSlash } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { IState, ISubscription, TUser } from '../../interface';
import { useCallback } from 'react';
import { queryApi } from '../../redux/actionCreators/queryApiAction';
import { useMemo } from 'react';
import { subscriptionUpdate } from '../../redux/actionCreators/subscriptionAction';
import styles from './styles.module.scss';

export interface ISettingSubscriptionCard {
  title: string;
  text: string;
  code: number;
  warning?: string;
}

const SettingSubscriptionCard: React.FC<ISettingSubscriptionCard> = ({ title, text, code, warning }) => {
  const [subscription, setSubscription] = useState<ISubscription | undefined>();
  const user: TUser = useSelector((state: IState) => state.auth.user);
  const subscriptions: ISubscription[] = useSelector((state: IState) => state.subscription.list);
  const { isLoading } = useSelector((state: IState) => state.subscription);
  const [isSubscription, setIsSubscription] = useState(false);
  const dispatch = useDispatch();

  const queryParams = useMemo(() => {
    let route = 'subscriptions';

    let data;
    switch (code) {
      case 100:
        data = {
          userNumberSubscription: user.number,
          name: 'Мой отдел',
          code,
          departmentId: user.departmentId,
        };
        break;
      case 200:
        data = {
          userNumberSubscription: user.number,
          name: 'Моя ответственность',
          code,
          currentResponsible: user.number,
        };
        break;
      case 300:
        data = {
          userNumberSubscription: user.number,
          userNumber: user.number,
          name: 'Мои заявки',
          code,
        };
        break;

      default:
        break;
    }
    if (isSubscription && subscription)
      return {
        route,
        method: 'delete',
        actionUpdate: subscriptionUpdate,
        id: subscription.id,
      };

    return {
      route,
      method: 'post',
      actionUpdate: subscriptionUpdate,
      data,
    };
  }, [isSubscription, subscription, user, code]);

  const handleSubscription = useCallback(() => {
    dispatch(queryApi(queryParams));
  }, [queryParams, dispatch]);

  useEffect(() => {
    let subscription =
      Array.isArray(subscriptions) && subscriptions.find((subscription: ISubscription) => subscription.code === code);

    if (!!subscription) {
      setSubscription(subscription);
      setIsSubscription(true);
    } else {
      setIsSubscription(false);
      setSubscription(undefined);
    }
  }, [code, subscriptions]);

  return (
    <Fragment>
      <Card>
        <Card.Header as="h5">{title}</Card.Header>
        <Card.Body>
          <Card.Text>{text}</Card.Text>
          <div className="flex flex_row flex_end">
            <Button
              variant={isLoading ? (isSubscription ? 'outline-danger' : 'primary') : 'info'}
              size="sm"
              onClick={() => {
                handleSubscription();
              }}
              disabled={!isLoading}
            >
              {isLoading ? (
                <FontAwesomeIcon icon={isSubscription ? faBellSlash : faBell} className="mr-1" />
              ) : (
                <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
              )}
              {isLoading ? (isSubscription ? 'Отписаться' : 'Подписаться') : 'Загрузка...'}
            </Button>
          </div>
        </Card.Body>

        <Card.Footer>
          {!warning ? undefined : (
            <Card.Text>
              <pre className={styles.description}>
                <small>{warning}</small>
              </pre>
            </Card.Text>
          )}
        </Card.Footer>
      </Card>
    </Fragment>
  );
};

export default memo(SettingSubscriptionCard);
