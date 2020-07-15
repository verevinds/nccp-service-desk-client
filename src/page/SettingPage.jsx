import React, { memo, useState, useEffect, Suspense, useMemo } from 'react';
import SettingCatalog from '../component/SettingCatalog/SettingCatalog';
import SettingStatus from '../component/SettingStatus/SettingStatus';
/**Bootstrap components */
import { Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import SettingAccess from '../component/SettingAccess/SettingAccess';
import SettingSubscription from '../component/SettingSubscription/SettingSubscription';
import List from '../component/List/List';
const SettingPositions = React.lazy(() => import('../component/SettingPositions/SettingPositions'));

const SettingPage = (props) => {
  const [activeId, setActiveId] = useState(0);
  const isAccess = useSelector((state) => state.access.isAccess);
  const list = useMemo(() => {
    let list = [];
    list.push({ name: 'Пользователи', id: 4 });
    list.push({ name: 'Подписки', id: 5 });
    if (isAccess) {
      list.push({ name: 'Каталог', id: 1 });
      list.push({ name: 'Статус', id: 2 });
      list.push({ name: 'Должности', id: 3 });
    }

    return list;
  }, [isAccess]);
  const [jsxContent, setJsxContent] = useState();
  useEffect(() => {
    switch (activeId) {
      case 0:
        setJsxContent('');
        break;
      case 1:
        if (isAccess >= 1) setJsxContent(<SettingCatalog />);
        break;
      case 2:
        if (isAccess >= 1) setJsxContent(<SettingStatus />);
        break;
      case 3:
        if (isAccess >= 1)
          setJsxContent(
            <Suspense fallback={<div>Loading...</div>}>
              <SettingPositions />
            </Suspense>,
          );
        break;
      case 4:
        setJsxContent(
          <Suspense fallback={<div>Loading...</div>}>
            <SettingAccess />
          </Suspense>,
        );
        break;
      case 5:
        setJsxContent(<SettingSubscription />);
        break;

      default:
        setJsxContent(<p className="align-content-center">Контент находиться в разработке</p>);
        break;
    }
  }, [activeId, isAccess]);
  return (
    <Row className={'m-1'}>
      <Col xs={3}>
        <h1>Настройки</h1>
        <List list={list} xs={12} onClick={setActiveId} />
      </Col>

      <Col xs={9}>{jsxContent}</Col>
    </Row>
  );
};

export default memo(SettingPage);
