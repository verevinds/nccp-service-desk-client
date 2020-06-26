import React, { memo } from 'react';
import { TConstructorInput } from '../ConstructorInput/ConstructorInput';

import ConstructorInputChangeInput from '../ConstructorInputChangeInput/ConstructorInputChangeInput';
import ConstructorInputChangeTitle from '../ConstructorInputChangeTitle/ConstructorInputChangeTitle';
import ConstructorInputChangeText from '../ConstructorInputChangeText/ConstructorInputChangeText';
import ConstructorInputChangeSelect from '../ConstructorInputChangeSelect/ConstructorInputChangeSelect';
import { ConstructorInputChangeContext } from './ConstructorInputChangeContext';

export interface IConstructorInputChange {
  handleLabel?: (agr: string) => void;
  handleControl?: (agr: string) => void;
  handleText?: (agr: string) => void;
  input: TConstructorInput;
}

const ConstructorInputChange: React.FC<IConstructorInputChange> = ({
  handleControl,
  handleLabel,
  handleText,
  input,
}) => {
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
};

export default memo(ConstructorInputChange);
