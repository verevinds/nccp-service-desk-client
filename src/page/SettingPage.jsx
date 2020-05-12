import React, { memo, useState, useEffect } from 'react';
import CatalogSetting from '../component/CatalogSetting/CatalogSetting';
import Sidebar from '../component/Sidebar/Sidebar';
import { useSelector } from 'react-redux';
import DepartmentSetting from '../component/DepartmentSetting/DepartmentSetting';

/**Bootstrap components */
import { Row, Col, Container } from 'react-bootstrap';

const SettingPage = (props) => {
  const { catalog } = useSelector((state) => state);
  const [departmentId, setDepartmentId] = useState();
  const onClick = (id, setNumber) => {
    setNumber(id);
  };
  const [listCatalog, setListCatalog] = useState([]);
  useEffect(() => {
    setListCatalog(
      catalog.list.filter((item) => item.departmentId == departmentId),
    );
  }, [departmentId, catalog]);
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
        setJsxContent(
          <Row>
            <DepartmentSetting
              department={catalog.department}
              setNumber={setDepartmentId}
              activeId={departmentId}
              onClick={onClick}
              inputed
            />
            <CatalogSetting list={listCatalog} departmentId={departmentId} />
          </Row>,
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
  }, [activeId, listCatalog]);
  return (
    <Row>
      <Col xs={2}>
        <Sidebar
          list={list}
          title={`Настройки`}
          activeId={activeId}
          onClick={setActiveId}
        />
      </Col>
      <Col xs={10}>{jsxContent}</Col>
    </Row>
  );
};

export default memo(SettingPage);
