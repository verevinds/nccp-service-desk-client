import React, { memo, useCallback, useState, useEffect } from 'react';
/**Bootstrap components */
import ConstructorInput from '../ConstructorInput/ConstructorInput';
import { TPropertyParam } from '../../interface';
import { Col, Row } from 'react-bootstrap';

export interface ICreateIncidentCustom {
  setParams: (arg: any[]) => void;
  state: any;
  setState: any;
}

const CreateIncidentCustom: React.FC<ICreateIncidentCustom> = ({ setParams, state, setState }) => {
  const handleChange = useCallback(
    (item: any, value: any, indexRow = 0, indexCol = 0) => {
      let newState = [...state];
      const newStateItem = {
        type: item.type,
        title: item.title,
        value,
        parent: item.parent,
        select: item.select,
        description: item.description,
        placeholder: item.placeholder,
      };
      newState[indexCol][indexRow] = newStateItem;
      setState(newState);
      setParams(newState);
    },
    [state, setState, setParams],
  );

  return (
    <Row>
      {state.map((col: TPropertyParam, indexCol: number) => {
        let id = `${indexCol}`;
        let parent = col.parent;

        let parentValue = parent ? state[Number(parent)]?.value : undefined;
        if (Array.isArray(col)) {
          return (
            <Col>
              {col.map((row: any, indexRow: number) => {
                return (
                  <ConstructorInput
                    input={row}
                    id={`${indexRow}`}
                    indexRow={indexRow}
                    indexCol={indexCol}
                    key={indexRow}
                    onChange={handleChange}
                    parentValue={parentValue}
                  />
                );
              })}
            </Col>
          );
        } else {
          return <ConstructorInput input={col} id={id} key={id} onChange={handleChange} parentValue={parentValue} />;
        }
      })}
    </Row>
  );
};

export default memo(CreateIncidentCustom);
