import React, { memo, useState, useMemo, Fragment, useEffect } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { useDispatch } from 'react-redux';
import ModalWindow from '../ModalWindow/ModalWindow';
import ModalTunePanel from './ModalTunePanel';
import { queryApi } from '../../redux/actionCreators/queryApiAction';
import { IState, TCategory, TPropertyParam, TOption } from '../../interface';
import { categoryUpdate } from '../../redux/actionCreators/catalogAction';
import styles from './styles.module.scss';
import ConstructorInput from '../ConstructorInput/ConstructorInput';

import { BoardContext } from '../Board/BoardContext';
import { Button } from 'react-bootstrap';
import Board from '../Board/Board';

export interface IModalTune {
  setShow: (agr: boolean) => void;
  show: boolean;
  id?: number;
}

const ModalTune: React.FC<IModalTune> = ({ show, setShow, id }) => {
  const dispatch = useDispatch();
  const [input, setInput] = useState<(TPropertyParam | never)[]>([]);
  const [state, setState] = useState<any[]>([]);

  const catalogs: TCategory[] | undefined = useSelector((state: IState) => state.catalog.list, shallowEqual);

  // fake data generator
  const getItems = (inputs: any, offset = 0) =>
    inputs.map((row: any, keyRow: number) => {
      if (Array.isArray(row)) {
        let rows = row.map((col: any, keyCol: number) => ({
          id: `item-${keyRow + offset}-${keyCol}-${new Date().getTime()}`,
          content: (
            <div className={styles.customInput}>
              <div className={`${styles.required} ${col?.required ? styles.required_red : undefined}`}></div>
              <ConstructorInput input={col} id={String(keyCol)} />
            </div>
          ),
        }));
        return rows;
      } else
        return {
          id: `item-${keyRow + offset}-${new Date().getTime()}`,
          content: (
            <div className={styles.customInput}>
              <div className={`${styles.required} ${row?.required ? styles.required_red : undefined}`}></div>
              <ConstructorInput input={row} id={String(keyRow)} />
            </div>
          ),
        };
    });

  const optionsParams = useMemo(() => {
    const findProperty = (item: TOption) => item.id === id;
    let category = catalogs?.find((item: TCategory) => item.options.find(findProperty));
    let options = category?.options.find(findProperty);

    return options?.params;
  }, [catalogs, id]);

  useEffect(() => {
    if (state) {
      let newInput = state.map((item: any) => item.map((elem: any) => elem.content?.props?.children[1]?.props?.input));
      setInput(newInput);
    }
  }, [state]);

  useEffect(() => {
    optionsParams && setState(getItems(optionsParams));
    optionsParams && setInput(optionsParams);
  }, [optionsParams]);

  return (
    <Fragment>
      <ModalWindow
        show={show}
        title="Настройка параметра"
        onHide={() => setShow(false)}
        onOk={() => {
          dispatch(
            queryApi({
              route: 'options',
              method: 'put',
              actionUpdate: categoryUpdate,
              data: { params: input },
              id,
            }),
          );
          setShow(false);
        }}
        textOk={'Сохранить'}
        size={'lg'}
      >
        <Fragment>
          <h5>Форма:</h5>
          <BoardContext.Provider value={{ state, setState, getItems }}>
            <div>
              <Button
                variant="outline-primary"
                size="sm"
                onClick={() => {
                  setState([...state, []]);
                }}
              >
                Добавить стоблец
              </Button>

              <div style={{ display: 'flex', width: '100%' }}>
                <Board />
              </div>
            </div>

            <hr />
            <ModalTunePanel stateInput={input} />
          </BoardContext.Provider>
        </Fragment>
      </ModalWindow>
    </Fragment>
  );
};

export default memo(ModalTune);
