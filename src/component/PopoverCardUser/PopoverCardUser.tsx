import React, { memo } from 'react';
import CardUser from '../CardUser/CardUser';
import { Popover } from 'react-bootstrap';
import styles from './styles.module.css';

interface IPopoverCardUser {
  id: number;
}
const PopoverCardUser: React.FC<IPopoverCardUser> = ({ id }) => {
  return (
    <Popover id="popover-contained" className={styles.popover}>
      <Popover.Content>
        <CardUser id={id} isPopover />
      </Popover.Content>
    </Popover>
  );
};

export default memo(PopoverCardUser);
