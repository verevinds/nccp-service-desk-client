import React, { memo } from 'react';
import styles from './styles.module.css';
import Fade from 'react-reveal/Fade';

export interface IListItemTag {
  list: TItemTag[];
}
export type TItemTag = {
  id: number;
  item?: { id: number; name: string; isArchive: boolean };
};

const ListItemTag: React.FC<IListItemTag> = ({ list }) => {
  return (
    <>
      <ul className={styles.tags}>
        {list
          ?.sort((a: any, b: any) => (a.id < b.id ? -1 : 1))
          .map((item: any, index: number) => {
            return (
              <Fade key={index} opposite collapse right>
                <li className={styles.tag} key={index}>
                  {item?.item.name}
                </li>
              </Fade>
            );
          })}
      </ul>
    </>
  );
};

export default memo(ListItemTag);
