import React, { memo, useState, useEffect } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { IIncidentStatus } from './interface';
import styles from './styles.module.css';
//Bootstrap
import { Button } from 'react-bootstrap';
import { IState, TStatusies } from '../../interface';

const IncidentStatus: React.FC<IIncidentStatus> = () => {
  const status = useSelector((state: IState) => state.incidents?.current.incident.statusId, shallowEqual);
  const [variant, setVariant] = useState<'info' | 'success'>('info');
  const { list }: TStatusies = useSelector((state: IState) => state.status);

  useEffect(() => {
    if (status === 8388608) {
      setVariant('success');
    } else {
      setVariant('info');
    }
  }, [status]);
  if (status && list.length)
    return (
      <>
        <Button variant={variant} disabled size="sm" className={styles.item}>
          {list.find((item: any) => item.id === status)?.name}
        </Button>
      </>
    );
  else return <></>;
};

export default memo(IncidentStatus);
