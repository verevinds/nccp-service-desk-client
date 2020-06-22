import React, { memo, Fragment, useState, useEffect, useMemo, useCallback } from 'react';
/**Bootstrap components */
import { Form } from 'react-bootstrap';
import ConstructorInput from '../ConstructorInput/ConstructorInput';
import { uid } from 'react-uid';

export interface ICreateIncidentCustom {
  params: any[];
  setParams: (arg: any[]) => void;
}

const CreateIncidentCustom: React.FC<ICreateIncidentCustom> = ({ params, setParams }) => {
  const [state, setState] = useState<any>([]);

  useEffect(() => {}, []);

  const handleChange = useCallback(
    (id: string, item: any) => (value: string) => {
      const title = item.title ? item.title : item.description;
      let newState = state;
      let index = newState.findIndex((item: any) => item.id === String(id));
      const newStateItem = { id, type: item.type, title, value };
      if (~index) {
        newState[index] = newStateItem;
      } else {
        newState.push(newStateItem);
      }
      // console.log(`${newState[index]}`, index);
      // console.log('newState', newState);
      // console.log('id', id);
      setParams(newState);
    },
    [state, setState],
  );

  return (
    <Fragment>
      {params.map((item: any, index: number) => {
        let id = uid(item);

        return <ConstructorInput input={item} key={id} onChange={handleChange(id, item)} />;
      })}
    </Fragment>
  );
};

export default memo(CreateIncidentCustom);
