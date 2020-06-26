import React, { memo, Fragment, useEffect, useCallback, useState, useMemo } from 'react';
/**Bootstrap components */
import ConstructorInput from '../ConstructorInput/ConstructorInput';
import { TPropertyParam } from '../../interface';

export interface ICreateIncidentCustom {
  params: any[];
  setParams: (arg: any[]) => void;
}

const CreateIncidentCustom: React.FC<ICreateIncidentCustom> = ({ params, setParams }) => {
  const [state, setState] = useState([...params]);
  const handleChange = useCallback(
    (id: string, item: any, value: any) => {
      let newState = [...state];

      const newStateItem = {
        type: item.type,
        title: item.title,
        value,
        parent: item.parent,
        description: item.description,
        placeholder: item.placeholder,
      };

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
      {params.map((item: TPropertyParam, index: number) => {
        let id = `${index}`;
        let parent = item.parent;

        let parentValue = parent ? state[Number(parent)]?.value : undefined;
        return <ConstructorInput input={item} id={id} key={id} onChange={handleChange} parentValue={parentValue} />;
      })}
    </Fragment>
  );
};

export default memo(CreateIncidentCustom);
