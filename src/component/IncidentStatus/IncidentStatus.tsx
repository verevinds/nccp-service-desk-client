import React, { memo, useState } from 'react';
import { IIncidentStatus } from './interface';
//Bootstrap
import { DropdownButton, Dropdown, Button } from 'react-bootstrap';

const IncidentStatus: React.FC<IIncidentStatus> = ({ myincident, status }) => {
  const [statusTitle] = useState('В работе');
  if (status)
    return (
      <>
        {!myincident ? (
          <DropdownButton
            id="dropdown-item-button"
            title={statusTitle}
            variant={'info'}
            size="sm"
          >
            <Dropdown.Item>В работе</Dropdown.Item>
            <Dropdown.Item>В работе (подрядчик)</Dropdown.Item>
            <Dropdown.Item>Готово</Dropdown.Item>
          </DropdownButton>
        ) : (
          <Button variant={'info'} disabled size="sm">
            {statusTitle}
          </Button>
        )}
      </>
    );
  else return <></>;
};

export default memo(IncidentStatus);
