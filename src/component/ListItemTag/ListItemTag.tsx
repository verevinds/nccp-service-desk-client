import React, { memo } from 'react';
import styles from './styles.module.css';
import Fade from 'react-reveal/Fade';
import { THandleBind } from '../ListItem/ListItem';

export interface IListItemTag {
  cursor: any;
  list: TItemTag[];
  handleBind?: THandleBind;
}
export type TItemTag = {
  id: number;
  item?: { id: number; name: string; isArchive: boolean };
};

const ListItemTag: React.FC<IListItemTag> = ({ list, cursor, handleBind }) => {
  console.dir(handleBind);
  return (
    <>
      <ul className={styles.tags}>
        {list
          ?.sort((a: any, b: any) => (a.id < b.id ? -1 : 1))
          .map((item: any, index: number) => {
            return (
              <Fade key={index} opposite collapse right>
                <li
                  className={`${styles.tag} ${!!cursor ? styles.tagbind : ''} `}
                  key={index}
                  onClick={(e) => {
                    if (e.ctrlKey)
                      if (handleBind) if (handleBind.tagDelete) handleBind.tagDelete(item.id);
                  }}>
                  {item?.item.name
                    ? item?.item.name
                    : `${item?.item.name1} ${item?.item.name2.charAt(0)}.${item?.item.name3.charAt(
                        0,
                      )}.`}
                </li>
              </Fade>
            );
          })}
      </ul>
    </>
  );
};

export default memo(ListItemTag);
