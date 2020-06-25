import React, { memo, useState, useMemo, Fragment, useEffect } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { useDispatch } from 'react-redux';
import ModalWindow from '../ModalWindow/ModalWindow';
import ModalTunePanel from './ModalTunePanel';
import ConstructorInput from '../ConstructorInput/ConstructorInput';
import ModalTuneDrag from './ModalTuneDrag';
import { queryApi } from '../../redux/actionCreators/queryApiAction';
import { IState, TProperty, TCategory } from '../../interface';
import { Button } from 'react-bootstrap';

export interface IModalTune {
  setShow: (agr: boolean) => void;
  show: boolean;
  id?: number;
}

export interface IObj {
  [key: string]: any;
}

const ModalTune: React.FC<IModalTune> = ({ show, setShow, id }) => {
  const [input, setInput] = useState<IObj | undefined>(undefined);
  const [state, setState] = useState<any>({ quotes: [] });
  const [params, setParams] = useState(undefined);
  // const [property, setProperty] = useState<TProperty | undefined>(undefined);
  const catalogs: TCategory[] | undefined = useSelector((state: IState) => state.catalog.list, shallowEqual);

  const propertyParams = useMemo(() => {
    const findProperty = (item: TProperty) => item.id === id;
    let category = catalogs?.find((item: TCategory) => item.properties.find(findProperty));
    let property = category?.properties.find(findProperty);

    return property?.params;
  }, [catalogs, id]);

  const dispatch = useDispatch();
  const initial = useMemo(() => {
    let newInitial: any[] = [];
    if (input) {
      for (var key in input) {
        const custom = {
          id: `id-${key}`,
          content: <ConstructorInput input={input[key]} key={key} />,
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

  useEffect(() => {
    let newParams =
      Array.isArray(state.quotes) &&
      state.quotes.map((item: any) => {
        return item.content.props.input;
      });
    setParams(newParams);
  }, [state]);

  return (
    <Fragment>
      <ModalWindow
        show={show}
        title="Настройка параметра"
        onHide={() => setShow(false)}
        onOk={() => {
          // console.log(JSON.stringify(input));
          dispatch(
            queryApi({
              route: 'properties',
              method: 'put',
              data: { params },
              id,
            }),
          );
        }}
        textOk={'Сохранить'}
        size={'lg'}
      >
        <Fragment>
          <h5>Форма:</h5>
          {state.quotes ? <ModalTuneDrag state={state} setState={setState} /> : <i>Добавьте поле</i>}

          <hr />
          <ModalTunePanel setInput={setInput} stateInput={input} />
        </Fragment>
      </ModalWindow>
    </Fragment>
  );
};

export default memo(ModalTune);
