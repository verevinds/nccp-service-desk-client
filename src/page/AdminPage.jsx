import React, { memo, useEffect, useState } from 'react';

//?Bootstrap
import { Row, Col, Container } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import ListEdit from '../component/ListEdit/ListEdit';

const AdminPage = (props) => {
  const state = useSelector((state) => state);

  const [propertyModal, setPropertyModal] = useState({
    number: 0,
  });
  const onClick = (id) => {
    setPropertyModal({ ...propertyModal, number: id });
  };

  const [defineCategory, setDefineCategory] = useState({});
  useEffect(() => {
    setDefineCategory(
      state.categories.list.filter((item) => item.id === propertyModal.number),
    );
  }, [propertyModal.number]);

  return (
    <div>
      <h1>Admin</h1>
      <Row>
        <ListEdit list={state.categories.list} onClick={onClick} />
        <ListEdit
          list={defineCategory[0] ? defineCategory[0].properties : []}
        />
        <ListEdit list={defineCategory[0] ? defineCategory[0].options : []} />
      </Row>
    </div>
  );
};

export default memo(AdminPage);
