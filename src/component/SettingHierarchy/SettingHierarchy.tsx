import React, { memo, Fragment, useLayoutEffect, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IState, TPosition } from '../../interface';
import { queryApi } from '../../redux/actionCreators/queryApiAction';
import { positionsRequestSeccessed } from '../../redux/actionCreators/positionAction';
import { Form, Row, Col, Button } from 'react-bootstrap';
import styles from './styles.module.scss';
import { BoardContext } from '../Board/BoardContext';
import Board from '../Board/Board';
export interface ISettingHierarchy {}

const SettingHierarchy: React.FC<ISettingHierarchy> = (props) => {
  const positions: (TPosition | never)[] = useSelector((state: IState) => state.positions.list);
  const isUpdate = useSelector((state: IState) => state.positions.isUpdate);
  const [levelZero, setLevelZero] = useState<TPosition[]>();
  const [levelOne, setLevelOne] = useState<TPosition[]>();
  const [levelTwo, setLevelTwo] = useState<TPosition[]>();
  const [levelThree, setLevelThree] = useState<TPosition[]>();
  const [state, setState] = useState<any[]>([]);

  const dispatch = useDispatch();
  useLayoutEffect(() => {
    if (!positions.length)
      dispatch(
        queryApi({
          actionSuccessed: positionsRequestSeccessed,
          route: 'positions',
        }),
      );
    // eslint-disable-next-line
  }, [isUpdate, dispatch]);
  useLayoutEffect(() => {
    if (positions) {
      let levelZero = positions.filter((item: TPosition) => item.level === 0);
      let levelOne = positions.filter((item: TPosition) => item.level === 1);
      let levelTwo = positions.filter((item: TPosition) => item.level === 2);
      let levelThree = positions.filter((item: TPosition) => item.level === 3);
      setLevelZero(levelZero);
      setLevelOne(levelOne);
      setLevelTwo(levelTwo);
      setLevelThree(levelThree);
    }
  }, [positions]);

  const [valueZero, setValueZero] = useState<string[]>([]);
  const [valueOne, setValueOne] = useState<string[]>([]);
  const [valueTwo, setValueTwo] = useState<string[]>([]);
  const [valueThree, setValueThree] = useState<string[]>([]);
  const getItems = (inputs: any, offset = 0) =>
    inputs.map((row: any, keyRow: number) => {
      let rows = row.map((col: any, keyCol: number) => ({
        id: `item-${keyRow + offset}-${keyCol}-${new Date().getTime()}`,
        content: <div className={styles.item}>{col.name}</div>,
      }));
      return rows;
    });
  useEffect(() => {
    console.log('levelZero', levelZero);
    console.log('levelOne', levelOne);
    console.log('levelTwo', levelTwo);
    console.log('levelThree', levelThree);
    setState(getItems([levelZero || [], levelOne || [], levelTwo || [], levelThree || []]));
  }, [levelZero, levelOne, levelTwo, levelThree]);
  return (
    <Fragment>
      <h2>Иерархия</h2>
      <BoardContext.Provider value={{ state, setState, getItems, noDelete: true }}>
        <div>
          <div className={styles.panel}>
            {state.length > 3 ? undefined : (
              <Button
                variant="outline-primary"
                size="sm"
                onClick={() => {
                  setState([...state, []]);
                }}
              >
                Добавить Уровень
              </Button>
            )}
          </div>
          <div style={{ display: 'flex', width: '100%' }}>
            <Board />
          </div>
        </div>
      </BoardContext.Provider>
    </Fragment>
  );
};

export default memo(SettingHierarchy);
