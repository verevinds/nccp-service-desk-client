import React, { memo, useState, useMemo, Fragment, useEffect, useCallback } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { useDispatch } from 'react-redux';
import ModalWindow from '../ModalWindow/ModalWindow';
import ModalTunePanel from './ModalTunePanel';
import ConstructorInput from '../ConstructorInput/ConstructorInput';
import ModalTuneDrag from './ModalTuneDrag';
import { queryApi } from '../../redux/actionCreators/queryApiAction';
import { IState, TProperty, TCategory } from '../../interface';
import { categoryUpdate } from '../../redux/actionCreators/catalogAction';
import styles from './styles.module.scss';

export interface IModalTune {
  setShow: (agr: boolean) => void;
  show: boolean;
  id?: number;
}

const ModalTune: React.FC<IModalTune> = ({ show, setShow, id }) => {
  const dispatch = useDispatch();
  const [input, setInput] = useState<any[] | undefined>(undefined);
  const [state, setState] = useState<any>({ quotes: [] });
  const catalogs: TCategory[] | undefined = useSelector((state: IState) => state.catalog.list, shallowEqual);
  console.log('input', input);

  const handleDrag = useCallback((value: any) => {
    setState(value);
    let newParams =
      Array.isArray(value.quotes) &&
      value.quotes.map((item: any) => {
        return item.content.props.children[1].props.input;
      });
    setInput(newParams);
  }, []);
  const propertyParams = useMemo(() => {
    const findProperty = (item: TProperty) => item.id === id;
    let category = catalogs?.find((item: TCategory) => item.properties.find(findProperty));
    let property = category?.properties.find(findProperty);

    return property?.params;
  }, [catalogs, id]);
  useEffect(() => {
    console.log('input', input);
  }, [input]);

  const initial = useMemo(() => {
    let newInitial: any[] = [];
    if (input) {
      for (var key in input) {
        const custom = {
          id: `id-${key}`,
          content: (
            <div className={styles.customInput}>
              <div className={`${styles.required} ${input[key].required ? styles.required_red : undefined}`}></div>
              <ConstructorInput input={input[key]} key={key} />
            </div>
          ),
        };

        newInitial.push(custom);
      }

      return newInitial;
    }
    if (propertyParams) {
      setInput(propertyParams);
    }
  }, [input, propertyParams]);

  useEffect(() => {
    setState({ quotes: initial });
  }, [initial]);

  const handleDelete = useCallback(
    (id: any) => {
      let index = Number(id.slice(3));

      if (input) {
        let newInput = [...input];

        newInput?.splice(index, 1);

        setInput(newInput);
      }
    },
    [setInput, input],
  );

  return (
    <Fragment>
      <ModalWindow
        show={show}
        title="Настройка параметра"
        onHide={() => setShow(false)}
        onOk={() => {
          dispatch(
            queryApi({
              route: 'properties',
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
          {state.quotes ? (
            <ModalTuneDrag state={state} setState={handleDrag} handleDelete={handleDelete} />
          ) : (
            <i>Добавьте поле</i>
          )}

          <hr />
          <ModalTunePanel setInput={setInput} stateInput={input} />
        </Fragment>
      </ModalWindow>
    </Fragment>
  );
};

export default memo(ModalTune);
