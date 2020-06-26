import React, { memo, useState, useMemo, Fragment, useContext } from 'react';
import { TConstructorInput } from '../ConstructorInput/ConstructorInput';
import { Form, InputGroup } from 'react-bootstrap';
import ButtonFontAwesome from '../ButtonFontAwesome/ButtonFontAwesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ConstructorInputChangeContext } from '../ConstructorInputChange/ConstructorInputChangeContext';
export interface IConstructorInputChangeSelect {}

const ConstructorInputChangeSelect: React.FC<IConstructorInputChangeSelect> = () => {
  const { input, handleControl } = useContext(ConstructorInputChangeContext);
  return <Fragment></Fragment>;
};

export default memo(ConstructorInputChangeSelect);
