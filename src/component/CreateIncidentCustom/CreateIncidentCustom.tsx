import React, { memo, Fragment, useState, useCallback } from 'react';
/**Bootstrap components */
import ConstructorInput from '../ConstructorInput/ConstructorInput';

export interface ICreateIncidentCustom {
  params: any[];
  setParams: (arg: any[]) => void;
}

const CreateIncidentCustom: React.FC<ICreateIncidentCustom> = ({ params, setParams }) => {
  const [state, setState] = useState([...params]);

  const handleChange = useCallback(
    (id: string, item: any) => (value: string) => {
      const description = item.type === 'switch' || item.type === 'checkbox' ? item.placeholder : '';
      let newState = state;

      const newStateItem = { id, type: item.type, title: item.title, description, value };
      if (~id) {
        newState[Number(id)] = newStateItem;
      } else {
        newState.push(newStateItem);
      }
      setState(newState);
      setParams(newState);
    },
    [state, setParams],
  );

  return (
    <Fragment>
      {params.map((item: any, index: number) => {
        let id = `${index}`;
        return <ConstructorInput input={item} id={id} onChange={handleChange(id, item)} />;
      })}
    </Fragment>
  );
};

export default memo(CreateIncidentCustom);
