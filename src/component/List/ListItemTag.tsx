import React, { memo } from 'react';
import styles from './styles.module.css';
export interface IListItemTag {
  list: TItemTag[];
}
export type TItemTag = {
  id: number;
  item?: { id: number; name: string; isArchive: boolean };
};

const ListItemTag: React.FC<IListItemTag> = ({ list }) => {
  console.log(list);
  return (
    <>
      <ul className={styles.tags}>
        {list?.map((item: any, index: number) => {
          console.log(item);
          return (
            <li className={styles.tag} key={index}>
              {item?.item.name}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default memo(ListItemTag);
