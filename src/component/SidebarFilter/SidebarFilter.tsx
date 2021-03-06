import React, { memo, useState, useCallback, useContext } from 'react';
import ButtonFontAwesome from '../ButtonFontAwesome/ButtonFontAwesome';
//? Font Awesome иконки
import {
  faSortNumericDown,
  faSortAlphaDown,
  faSortAmountDown,
  faSortNumericUp,
  faSortAlphaUp,
  faSortAmountUp,
} from '@fortawesome/free-solid-svg-icons';
import { IncidentContext } from '../Incident/IncidentContext';

export interface ISidebarFilter {
  setFilter: any;
  color?: string;
}
export type TFilter = { name: string; sing: number };

const SidebarFilter: React.FC<ISidebarFilter> = ({ setFilter, color }) => {
  let { isMyIncidentsPage } = useContext(IncidentContext);

  const InitialSort = {
    name: 'numeric',
    vectorUp: false,
  };

  const [sort, setSort] = useState(InitialSort);

  const onClick = useCallback(
    function (this: any) {
      let vectorUp;
      let name;
      if (sort.name === this.name) {
        setSort({ name: this.name, vectorUp: !sort.vectorUp });
        name = this.name;
        vectorUp = !sort.vectorUp;
      } else {
        setSort({ name: this.name, vectorUp: false });
        name = this.name;
        vectorUp = false;
      }

      const sing = vectorUp ? 1 : -1;

      let filter: TFilter = {
        name: 'userNumber',
        sing,
      };

      switch (name) {
        case 'numeric':
          filter.name = 'id';
          break;
        case 'alpha':
          filter.name = 'name';
          break;
        default:
          break;
      }

      setFilter(filter);
    },
    [sort, setSort, setFilter],
  );

  let numeric = 'numeric';
  let alpha = 'alpha';
  let finish = 'finish';

  return (
    <div>
      <div className="flex">
        <div className="mr-1">
          <ButtonFontAwesome
            faIcon={sort.name === numeric && !sort.vectorUp ? faSortNumericDown : faSortNumericUp}
            onClick={onClick.bind({ name: numeric })}
            sizeIcon="lg"
            variant={sort.name === 'numeric' ? 'secondary' : 'outline-secondary'}
            tooltip={'По номеру'}
          />
        </div>
        <div className="mr-1">
          <ButtonFontAwesome
            faIcon={sort.name === alpha && !sort.vectorUp ? faSortAlphaDown : faSortAlphaUp}
            onClick={onClick.bind({ name: alpha })}
            sizeIcon="lg"
            variant={sort.name === alpha ? 'secondary' : 'outline-secondary'}
            tooltip={'По алфавиту'}
          />
        </div>
        {isMyIncidentsPage ? undefined : (
          <div>
            <ButtonFontAwesome
              faIcon={sort.name === finish && !sort.vectorUp ? faSortAmountDown : faSortAmountUp}
              onClick={onClick.bind({ name: finish })}
              sizeIcon="lg"
              size={'sm'}
              variant={sort.name === finish ? 'secondary' : 'outline-secondary'}
              tooltip={'Инициатор заявки'}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(SidebarFilter);
