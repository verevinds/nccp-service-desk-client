import React, { memo, useState, useEffect } from 'react';
import Sidebar from '../component/Sidebar/Sidebar';
import SettingCatalog from '../component/SettingCatalog/SettingCatalog';
import SettingStatus from '../component/SettingStatus/SettingStatus';

/**Bootstrap components */
import { Row, Col } from 'react-bootstrap';
import SettingPositions from '../component/SettingPositions/SettingPositions';

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
        setJsxContent(<SettingCatalog />);
        break;
      case 2:
        setJsxContent(<SettingStatus />);
        break;
      case 3:
        setJsxContent(<SettingPositions />);
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
      <Col xs={2}>
        <h1>Настройки</h1>
        <Sidebar list={list} activeId={activeId} onClick={setActiveId} />
      </Col>
      <Col xs={10}>{jsxContent}</Col>
    </Row>
  );
};

export default memo(SettingPage);
