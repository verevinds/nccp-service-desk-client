import React, { memo, useEffect, useState } from 'react';

import Incident from '../component/Incident/Incident';
import { useSelector } from 'react-redux';

const MainPage = () => {
  const { list, isLoading } = useSelector((state) => state.incidents);
  return <Incident list={list} isLoading={isLoading} />;
};

export default memo(MainPage);
