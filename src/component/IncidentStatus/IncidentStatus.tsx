import React, { memo, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { IIncidentStatus } from './interface';
import styles from './styles.module.css';
//Bootstrap
import { DropdownButton, Dropdown, Button } from 'react-bootstrap';

const IncidentStatus: React.FC<IIncidentStatus> = ({ myincident, status }) => {
  const [variant, setVariant] = useState<'info' | 'success'>('info');
  useEffect(() => {
    if (status === 8388608) {
      setVariant('success');
    } else {
      setVariant('info');
    }
  }, [status]);
  const { list } = useSelector((state: any) => state.status);
  if (status && list.length)
    return (
      <>
        <Button variant={variant} disabled size="sm" className={styles.item}>
          {list.find((item: any) => item.id === status).name}
        </Button>
      </>
    );
  else return <></>;
};

export default memo(IncidentStatus);
