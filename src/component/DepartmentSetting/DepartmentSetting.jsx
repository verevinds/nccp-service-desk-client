import React, { memo, useState } from 'react';
import ListEdit from '../ListEdit/ListEdit';

const DepartmentSetting = ({ department, setNumber, activeId, onClick }) => {
  return (
    <>
      <ListEdit
        list={department}
        title={`Отделы`}
        setNumber={setNumber}
        activeId={activeId}
        onClick={onClick}
        route={'departments'}
        inputOff
      />
    </>
  );
};

export default memo(DepartmentSetting);
