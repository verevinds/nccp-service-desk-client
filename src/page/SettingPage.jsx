import React, { memo, useState, useEffect } from 'react';
import CatalogSetting from '../component/CatalogSetting/CatalogSetting';
import Sidebar from '../component/Sidebar/Sidebar';

/**Bootstrap components */
import { Row, Col, Container } from 'react-bootstrap';

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
        setJsxContent(<CatalogSetting />);
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
      <Col xs={3}>
        <Sidebar
          list={list}
          title={`Настройки`}
          activeId={activeId}
          onClick={setActiveId}
        />
      </Col>
      <Col xs={9}>
        <Container>{jsxContent}</Container>
      </Col>
    </Row>
  );
};

export default memo(SettingPage);
