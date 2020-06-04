import React, { memo, useMemo } from 'react';
import Popup from 'reactjs-popup';
import styles from './styles.module.css';
//? Font Awesome иконки
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';

interface IPopup {
  content: any[];
}
export default memo((props: IPopup) => {
  const width = useMemo(() => {
    return props?.content.length * 45;
  }, [props]);

  return (
    <Popup
      trigger={
        <span className="pointer">
          <FontAwesomeIcon icon={faEllipsisV} size="lg" color={'#007bff'} />
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
