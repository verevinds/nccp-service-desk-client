import React from 'react';
import { TConstructorInput } from '../ConstructorInput/ConstructorInput';

export interface IConstructorInputChangeContext {
  handleLabel?: (agr: string) => void;
  handleControl?: (agr: string) => void;
  handleText?: (agr: string) => void;
  input: TConstructorInput;
}
export const ConstructorInputChangeContext = React.createContext<IConstructorInputChangeContext>({
  input: {
    title: '',
    placeholder: '',
    type: '',
    required: false,
    description: '',
    parent: '',
    select: '',
  },
});
