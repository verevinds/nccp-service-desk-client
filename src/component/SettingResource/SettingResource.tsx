import React, { memo, Fragment } from 'react';
export interface ISettingResource {}

const SettingResource: React.FC<ISettingResource> = (props) => {
  return (
    <Fragment>
      <h1>Ресурсы</h1>
    </Fragment>
  );
};

export default memo(SettingResource);
