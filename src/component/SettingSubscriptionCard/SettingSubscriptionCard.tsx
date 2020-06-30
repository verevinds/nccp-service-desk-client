import React, { memo, Fragment, useState, useEffect } from 'react';
import { Card, Button, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faBellSlash } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { IState, ISubscription } from '../../interface';
export interface ISettingSubscriptionCard {
  title: string;
  text: string;
  code: number;
}

const SettingSubscriptionCard: React.FC<ISettingSubscriptionCard> = ({ title, text, code }) => {
  const [subscription, setSubscription] = useState({
    userNumber: '',
    code: null,
    name: '',
    params: null,
    departmentId: null,
    categoryId: null,
    positionId: null,
    optionId: null,
  });
  const subscriptions = useSelector((state: IState) => state.subscription.list);
  const { isLoading } = useSelector((state: IState) => state.subscription);
  const [isSubscription, setIsSubscription] = useState(false);

  useEffect(() => {
    console.log(subscriptions);
    let hasElement = ~subscriptions?.findIndex((item: ISubscription) => item.code === Number(code));
    console.log('code', code);
    console.log('hasElement', hasElement);
    if (!hasElement) setIsSubscription(true);
  }, [code, subscriptions]);

  return (
    <Fragment>
      <Card>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{text}</Card.Text>
          <Button
            variant={isLoading ? (isSubscription ? 'primary' : 'outline-danger') : 'info'}
            size="sm"
            onClick={() => {
              setIsSubscription(!isSubscription);
            }}
            disabled={!isLoading}
          >
            {isLoading ? (
              <FontAwesomeIcon icon={isSubscription ? faBell : faBellSlash} className="mr-1" />
            ) : (
              <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
            )}
            {isLoading ? (isSubscription ? 'Подписаться' : 'Отписаться') : 'Загрузка...'}
          </Button>
        </Card.Body>
      </Card>
    </Fragment>
  );
};

export default memo(SettingSubscriptionCard);
