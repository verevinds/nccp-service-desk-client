import React, { memo, useCallback, useState, useEffect } from 'react';
import List from '../List/List';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { queryApi } from '../../redux/actionCreators/queryApiAction';
import { statusUpdate } from '../../redux/actionCreators/statusAction';

import { Col, Row } from 'react-bootstrap';
import { IState, TStatus, TStatusies } from '../../interface';

const SettingStatus = () => {
  const [parentId, setParentId] = useState(0);
  const [childrenId, setChildrenId] = useState(0);
  const { list }: TStatusies = useSelector((state: IState) => state.status, shallowEqual);
  const category = useSelector((state: IState) => state.catalog.list, shallowEqual);
  const dispatch = useDispatch();
  const route = 'status';

  const handleBindParent = useCallback(
    (id: number) => {
      setParentId(id);
    },
    [setParentId],
  );

  const handleBindChild = useCallback(
    (id: number) => {
      setChildrenId(id);
    },
    [setChildrenId],
  );

  const handleEvent = useCallback(
    ({ route, list, fact }) => ({ id, value }: any) => {
      let data;
      let method = 'put';
      if (value) {
        data = {
          name: value,
        };
      }
      switch (fact) {
        case 'favorites':
          data = {
            level: Number(!list.find((item: TStatus) => item.id === id).level),
          };
          break;
        case 'archive':
          data = {
            isArchive: Number(!list.find((item: TStatus) => item.id === id).isArchive),
          };
          break;
        case 'delete':
          method = 'delete';
          break;
        default:
          method = 'post';
          break;
      }

      if (Number(id) !== 8388608 && Number(id) !== 1) {
        dispatch(
          queryApi({
            id,
            actionUpdate: statusUpdate,
            route,
            method,
            data,
          }),
        );
      } else {
        alert('Только администратор может это сделать!');
      }
    },
    [dispatch],
  );

  useEffect(() => {
    let parent: TStatus | undefined = list && list.find((item: TStatus) => item.id === parentId);
    console.log('parentId', parentId);
    console.log('parent', parent);
    if (parent && !!childrenId && !!parentId) {
      let bindId = 0;
      //@ts-ignore
      parent?.bind.forEach((item, index) => {
        if (item.item.id === childrenId) {
          bindId = item.id;
        }
      });

      console.log('childrenId', childrenId);
      if (!!bindId) {
        dispatch(
          queryApi({
            route: 'status/bind',
            actionUpdate: statusUpdate,
            method: 'delete',
            id: bindId,
          }),
        );
      } else {
        dispatch(
          queryApi({
            route: 'status/bind',
            actionUpdate: statusUpdate,
            method: 'post',
            data: {
              categoryId: childrenId,
              statusId: parentId,
            },
          }),
        );
      }
      setChildrenId(0);
    }
  }, [parentId, childrenId, dispatch, category, list]);

  return (
    <Col>
      <h2>Статус</h2>
      <Row>
        <List
          list={list}
          onSubmit={handleEvent({ route, list })}
          onDelete={handleEvent({ route, list, fact: 'delete' })}
          onArchive={handleEvent({ route, list, fact: 'archive' })}
          handleBind={{ id: parentId, handleBind: handleBindParent, bindDelete: handleBindChild }}
          xs={3}
        />

        {parentId ? (
          <List list={category} xs={3} handleBind={{ id: childrenId, handleBind: handleBindChild }} />
        ) : undefined}
      </Row>
    </Col>
  );
};

export default memo(SettingStatus);
