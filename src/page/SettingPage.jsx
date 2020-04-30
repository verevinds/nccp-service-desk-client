import React, { memo } from 'react';
import CatalogSetting from '../component/CatalogSetting/CatalogSetting';

const SettingPage = (props) => {
  return (
    <>
      <CatalogSetting />
    </>
  );
};

export default memo(SettingPage);
