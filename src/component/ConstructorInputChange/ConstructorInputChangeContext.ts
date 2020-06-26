import { TPropertyParam } from './../../interface';
import React from 'react';

export interface IConstructorInputChangeContext {
  handleLabel?: (agr: string) => void;
  handleControl?: (agr: string) => void;
  handleText?: (agr: string) => void;
  input: TPropertyParam;
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
    value: '',
  },
});
