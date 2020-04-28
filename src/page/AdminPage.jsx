import React, { memo, useEffect, useState } from 'react';
import { catalogPost } from '../redux/actionCreators/catalogAction';

//?Bootstrap
import { Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import ListEdit from '../component/ListEdit/ListEdit';

const AdminPage = (props) => {
  const { list } = useSelector((state) => state.catalog);
  const [currentCategory, setCurrentCategory] = useState();

  const onClick = (id, setNumber) => {
    setNumber(id);
  };
  const [currentProperty, setCurrentProperty] = useState({});
  useEffect(() => {
    setCurrentProperty(list.filter((item) => item.id === currentCategory));
  }, [currentCategory, list]);

  return (
    <div>
      <Row>
        <ListEdit
          title="Категории"
          list={list}
          setNumber={setCurrentCategory}
          activeId={currentCategory}
          actionCreator={catalogPost}
          route={'categories'}
          onClick={onClick}
        />
        {currentProperty[0] ? (
          <ListEdit
            title="Параметры"
            list={
              currentProperty[0].properties.length > 0
                ? currentProperty[0].properties
                : null
            }
            actionCreator={catalogPost}
            route={'properties'}
            categoryId={currentCategory}
          />
        ) : null}
        {currentProperty[0] ? (
          <ListEdit
            title="Опции"
            list={
              currentProperty[0].options.length > 0
                ? currentProperty[0].options
                : null
            }
            route={'options'}
            actionCreator={catalogPost}
            categoryId={currentCategory}
          />
        ) : null}
      </Row>
    </div>
  );
};

export default memo(AdminPage);
