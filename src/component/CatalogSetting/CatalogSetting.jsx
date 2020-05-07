import React, { memo, useEffect, useState } from 'react';
import { catalogPost } from '../../redux/actionCreators/catalogAction';

//?Bootstrap
import { Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import ListEdit from '../ListEdit/ListEdit';

const CatalogSetting = (props) => {
  const { list } = useSelector((state) => state.catalog);
  const [chooseCategoryId, setChooseCategoryId] = useState();

  const onClick = (id, setNumber) => {
    setNumber(id);
  };
  const [currentCategory, setCurrentCategory] = useState({});
  useEffect(() => {
    setCurrentCategory(list.find((item) => item.id === chooseCategoryId));
  }, [chooseCategoryId, list]);

  return (
    <div>
      <Row>
        <ListEdit
          title="Категории"
          list={list}
          setNumber={setChooseCategoryId}
          activeId={chooseCategoryId}
          actionCreator={catalogPost}
          route={'categories'}
          onClick={onClick}
        />
        {currentCategory ? (
          <ListEdit
            title="Параметры"
            list={
              currentCategory.properties ? currentCategory.properties : null
            }
            actionCreator={catalogPost}
            route={'properties'}
            categoryId={Number(chooseCategoryId)}
          />
        ) : null}
        {currentCategory ? (
          <ListEdit
            title="Опции"
            list={currentCategory.options ? currentCategory.options : null}
            route={'options'}
            actionCreator={catalogPost}
            categoryId={chooseCategoryId}
          />
        ) : null}
      </Row>
    </div>
  );
};

export default memo(CatalogSetting);
