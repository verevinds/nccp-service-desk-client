import React, { memo, useState, useEffect } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { IIncidentStatus } from './interface';
import styles from './styles.module.css';
//Bootstrap
import { Button } from 'react-bootstrap';
import { IState, TStatusies } from '../../interface';
import { findById } from '../../js/supportingFunction';

const IncidentStatus: React.FC<IIncidentStatus> = () => {
  const status = useSelector((state: IState) => state.incidents?.current.incident.statusId, shallowEqual);
  const [variant, setVariant] = useState<
    'info' | 'success' | 'primary' | 'secondary' | 'warning' | 'danger' | 'light' | 'link'
  >('info');
  const [color, setColor] = useState('#28a745');
  const { list }: TStatusies = useSelector((state: IState) => state.status);

  useEffect(() => {
    let color;
    switch (status) {
      case 0:
        //Новая
        color = '#007bff';
        setVariant('primary');
        break;
      case 8388607:
        //Готово
        // color = '#c3e6cb';
        color = '#8cce9b';
        setVariant('success');
        break;
      case 8388608:
        color = '#9ca2a7';
        setVariant('secondary');
        break;
      case 8388604:
        //Отказано
        color = '#e57983';
        setVariant('danger');
        break;
      case 8388606:
        //Согласование
        color = '#ffe083';
        setVariant('warning');
        break;
      case 8388605:
        //На доработке
        color = '#007bff';
        setVariant('primary');
        break;
      default:
        color = '#bee5eb';
        setVariant('light');
        break;
    }

    setColor(color);
  }, [status]);
  if (status && list.length)
    return (
      <>
        <Button variant={variant} style={{ backgroundColor: color }} disabled size="sm" className={styles.item}>
          {findById(list, status)?.name}
        </Button>
      </>
    );
  else return <></>;
};

export default memo(IncidentStatus);
