import React, { memo, useState, useEffect } from 'react';
import Sidebar from '../component/Sidebar/Sidebar';
import SettingCatalog from '../component/SettingCatalog/SettingCatalog';
import SettingStatus from '../component/SettingStatus/SettingStatus';

/**Bootstrap components */
import { Row, Col } from 'react-bootstrap';

const SettingPage = (props) => {
  const [activeId, setActiveId] = useState(0);
  const list = [
    { name: 'Каталог', id: 1 },
    { name: 'Статус', id: 2 },
    { name: 'Принять в работу', id: 3 },
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
    <Row>
      <Col xs={2}>
        {/* <Sidebar
          list={list}
          title={`Настройки`}
          activeId={activeId}
          onClick={setActiveId}
        /> */}
      </Col>
      <Col xs={10}>{jsxContent}</Col>
    </Row>
  );
};

export default memo(SettingPage);
