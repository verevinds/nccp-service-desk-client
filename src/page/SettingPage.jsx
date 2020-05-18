import React, { memo, useState, useEffect, Suspense } from 'react';
import Sidebar from '../component/Sidebar/Sidebar';
import SettingCatalog from '../component/SettingCatalog/SettingCatalog';
import SettingStatus from '../component/SettingStatus/SettingStatus';
import Fade from 'react-reveal/Fade';
/**Bootstrap components */
import { Row, Col } from 'react-bootstrap';
const SettingPositions = React.lazy(() =>
  import('../component/SettingPositions/SettingPositions'),
);

const SettingPage = (props) => {
  const [activeId, setActiveId] = useState(0);
  const list = [
    { name: 'Каталог', id: 1 },
    { name: 'Статус', id: 2 },
    { name: 'Должности', id: 3 },
  ];
  const [jsxContent, setJsxContent] = useState();
  useEffect(() => {
    switch (activeId) {
      case 0:
        setJsxContent('');
        break;
      case 1:
        setJsxContent(
          <Fade opposite collapse left>
            <SettingCatalog />
          </Fade>,
        );
        break;
      case 2:
        setJsxContent(
          <Fade opposite collapse left>
            <SettingStatus />
          </Fade>,
        );
        break;
      case 3:
        setJsxContent(
          <Suspense fallback={<div>Loading...</div>}>
            <Fade opposite collapse left>
              <SettingPositions />
            </Fade>
          </Suspense>,
        );
        break;
      default:
        setJsxContent(
          <p className="align-content-center">
            Контент находиться в разработке
          </p>,
        );
        break;
    }
  }, [activeId]);
  return (
    <Row className={'m-1'}>
      <Col xs={3}>
        <h1>Настройки</h1>
        <Sidebar list={list} activeId={activeId} onClick={setActiveId} />
      </Col>

      <Col xs={9}>{jsxContent}</Col>
    </Row>
  );
};

export default memo(SettingPage);
