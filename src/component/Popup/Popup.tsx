import React, { memo, useMemo } from 'react';
import Popup from 'reactjs-popup';
import styles from './styles.module.css';
//? Font Awesome иконки
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface IPopup {
  content: any[];
  trigger: any;
  size?: 'lg' | 'xs' | 'sm' | '1x' | '2x' | '3x' | '4x' | '5x' | '6x' | '7x' | '8x' | '9x' | '10x';
  color?: string;
}
export default memo((props: IPopup) => {
  const width = useMemo(() => {
    return props?.content.length * 45;
  }, [props]);

  return (
    <Popup
      trigger={
        <span className="pointer">
          <FontAwesomeIcon icon={props.trigger} color={props.color || '#007bff'} size={props.size} />
        </span>
      }
      position="left center"
      contentStyle={{
        width,
        maxWidth: 180,
        borderRadius: '3px',
        zIndex: 900,
        boxShadow: 'none',
      }}
    >
      <span className={styles.popup}>
        {props?.content.map((item: any, index: number) => (
          <span key={index}>{item}</span>
        ))}{' '}
      </span>
    </Popup>
  );
});
