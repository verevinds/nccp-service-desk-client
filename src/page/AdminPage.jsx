import React, { memo, useEffect, useState } from 'react';
import { categorySend } from '../redux/actionCreators/categoryAction';
import { propertyPost } from '../redux/actionCreators/propertyAction';
import { optionPost } from '../redux/actionCreators/optionAction';

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
          actionCreator={categorySend}
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
            actionCreator={propertyPost}
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
            actionCreator={optionPost}
            categoryId={currentCategory}
          />
        ) : null}
      </Row>
    </div>
  );
};

export default memo(AdminPage);
