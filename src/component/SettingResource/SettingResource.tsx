import React, { memo, Fragment, useLayoutEffect, useCallback, useContext, useMemo, useState, useEffect } from 'react';
import { Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { AppContext } from '../../AppContext';
import { IState, TResource, TUser } from '../../interface';
import { IApi } from '../../js/api';
import { findById } from '../../js/supportingFunction';
import List from '../List/List';
import SpinnerGrow from '../SpinnerGrow/SpinnerGrow';

const SettingResource = () => {
  const { apiDispatch } = useContext(AppContext);
  const api: IApi = useMemo(() => apiDispatch, [apiDispatch]);
  const { list: resources, isUpdate } = useSelector((state: IState) => state.resources);
  const user: TUser = useSelector((state: IState) => state.auth.user);
  const users: TUser[] = useSelector((state: IState) => state.users.list);

  const [parentId, setParentId] = useState(0);
  const [childrenId, setChildrenId] = useState(0);

  useEffect(() => {
    let parent: TResource | undefined = findById(resources, parentId);

    if (parent && !!childrenId && !!parentId) {
      let bindId = 0;
      //@ts-ignore
      parent?.bind.forEach((item, index) => {
        if (item.item.id === childrenId) {
          bindId = item.id;
        }
        if (item.item.number === childrenId) {
          bindId = item.id;
        }
      });

      if (!!bindId) {
        api.resourcesBind().delete(bindId);
      } else {
        api.resourcesBind().post({
          data: {
            userNumber: childrenId,
            resourceId: parentId,
          },
        });
      }
      setChildrenId(0);
    }
  }, [parentId, childrenId, resources, api]);

  useLayoutEffect(() => {
    api.resources().get({ creatorDepartmentId: user.departmentId });
  }, [isUpdate, api, user]);

  const handleAdd = useCallback(
    ({ id, value }) => {
      if (!!value) {
        let data = {
          name: value,
          creatorId: user.number,
          creatorPositionId: user.positionId,
          creatorDepartmentId: user.departmentId,
        };

        api.resources().post({ data });
      }
    },
    [user, api],
  );

  const handleArchive = useCallback(
    ({ id, value }) => {
      const resource: TResource = findById(resources, id);
      api.resources().put(id, { data: { isArchive: !resource.isArchive } });
    },
    [api, resources],
  );
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

  if (resources && users)
    return (
      <Fragment>
        <h1>Ресурсы</h1>
        <Row>
          <List
            list={resources}
            onSubmit={handleAdd}
            onArchive={handleArchive}
            handleBind={{ id: parentId, handleBind: handleBindParent, bindDelete: handleBindChild }}
            xs={5}
          />
          <List
            list={users.filter((user: TUser) => !user.fired)}
            handleBind={{ id: childrenId, handleBind: handleBindChild }}
            xs={7}
          />
        </Row>
      </Fragment>
    );
  else return <SpinnerGrow />;
};

export default memo(SettingResource);
