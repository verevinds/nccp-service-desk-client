import React, { memo } from 'react';

import ConstructorInputChangeInput from '../ConstructorInputChangeInput/ConstructorInputChangeInput';
import ConstructorInputChangeTitle from '../ConstructorInputChangeTitle/ConstructorInputChangeTitle';
import ConstructorInputChangeText from '../ConstructorInputChangeText/ConstructorInputChangeText';
import ConstructorInputChangeSelect from '../ConstructorInputChangeSelect/ConstructorInputChangeSelect';
import { ConstructorInputChangeContext } from './ConstructorInputChangeContext';
import { TPropertyParam } from '../../interface';

export interface IConstructorInputChange {
  handleLabel?: (agr: string) => void;
  handleControl?: (agr: string) => void;
  handleText?: (agr: string) => void;
  input: TPropertyParam;
}

const ConstructorInputChange: React.FC<IConstructorInputChange> = ({
  handleControl,
  handleLabel,
  handleText,
  input,
}) => {
  if (input.type !== 'void')
    return (
      <ConstructorInputChangeContext.Provider value={{ handleControl, handleLabel, handleText, input }}>
        <ConstructorInputChangeTitle />
        {input.type !== 'title' ? (
          input.type === 'list' ? (
            <ConstructorInputChangeSelect />
          ) : (
            <ConstructorInputChangeInput />
          )
        ) : undefined}
        <ConstructorInputChangeText />
      </ConstructorInputChangeContext.Provider>
    );
  else return <></>;
};

export default memo(ConstructorInputChange);
