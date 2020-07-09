import React, { memo, Fragment, useLayoutEffect } from 'react';
import { Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import List from '../List/List';
import { IState } from '../../interface';
import { queryApi } from '../../redux/actionCreators/queryApiAction';
import { positionsRequestSeccessed } from '../../redux/actionCreators/positionAction';
export interface ISettingRules {}

const SettingRules: React.FC<ISettingRules> = (props) => {
  return (
    <Fragment>
      <h2>Редактирования правил согласования</h2>
      
    </Fragment>
  );
};

export default memo(SettingRules);
