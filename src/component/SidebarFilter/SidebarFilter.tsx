import React, { memo, Fragment, useState, useMemo, useCallback, useEffect, useContext } from 'react';
import ButtonFontAwesome from '../ButtonFontAwesome/ButtonFontAwesome';
import Popup from '../Popup/Popup';
//? Font Awesome иконки
import {
  faSortNumericDown,
  faSortAlphaDown,
  faSortAmountDown,
  faSortNumericUp,
  faSortAlphaUp,
  faSortAmountUp,
  faEllipsisV,
} from '@fortawesome/free-solid-svg-icons';
import { IncidentContext } from '../Incident/IncidentContext';

export interface ISidebarFilter {
  setFilter: any;
  color?: string;
}
const SidebarFilter: React.FC<ISidebarFilter> = ({ setFilter, color }) => {
  let { myIncident } = useContext(IncidentContext);
  const [sort, setSort] = useState({
    name: 'numeric',
    vectorUp: false,
  });

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

      let sing = vectorUp ? 1 : -1;
      let filter: { name?: any; sing?: any } = {};

      switch (name) {
        case 'numeric':
          filter.name = 'id';
          break;
        case 'alpha':
          filter.name = 'name';
          break;
        default:
          filter.name = 'userNumber';
          break;
      }
      filter.sing = sing;

      setFilter(filter);
    },
    [sort, setSort, setFilter],
  );

  useEffect(() => {}, [setFilter, sort]);

  const content = useMemo(() => {
    const buttons: any[] = [];
    let numeric = 'numeric';
    buttons.push(
      <ButtonFontAwesome
        faIcon={sort.name === numeric && !sort.vectorUp ? faSortNumericDown : faSortNumericUp}
        onClick={onClick.bind({ name: numeric })}
        sizeIcon="lg"
        variant={sort.name === 'numeric' ? 'outline-primary' : 'primary'}
        tooltip={'По номеру'}
      />,
    );

    let alpha = 'alpha';
    buttons.push(
      <ButtonFontAwesome
        faIcon={sort.name === alpha && !sort.vectorUp ? faSortAlphaDown : faSortAlphaUp}
        onClick={onClick.bind({ name: alpha })}
        sizeIcon="lg"
        variant={sort.name === 'alpha' ? 'outline-primary' : 'primary'}
        tooltip={'По алфавиту'}
      />,
    );

    let finish = 'finish';
    buttons.push(
      <ButtonFontAwesome
        faIcon={sort.name === finish && !sort.vectorUp ? faSortAmountDown : faSortAmountUp}
        onClick={onClick.bind({ name: finish })}
        sizeIcon="lg"
        size={'sm'}
        variant={sort.name === 'finish' ? 'outline-primary' : 'primary'}
        tooltip={'Срочность'}
      />,
    );
    return buttons;
  }, [sort, onClick]);

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
            variant={sort.name === 'numeric' ? 'outline-primary' : 'primary'}
            tooltip={'По номеру'}
          />
        </div>
        <div className="mr-1">
          <ButtonFontAwesome
            faIcon={sort.name === alpha && !sort.vectorUp ? faSortAlphaDown : faSortAlphaUp}
            onClick={onClick.bind({ name: alpha })}
            sizeIcon="lg"
            variant={sort.name === alpha ? 'outline-primary' : 'primary'}
            tooltip={'По алфавиту'}
          />
        </div>
        {myIncident ? undefined : (
          <div>
            <ButtonFontAwesome
              faIcon={sort.name === finish && !sort.vectorUp ? faSortAmountDown : faSortAmountUp}
              onClick={onClick.bind({ name: finish })}
              sizeIcon="lg"
              size={'sm'}
              variant={sort.name === finish ? 'outline-primary' : 'primary'}
              tooltip={'Инициатор заявки'}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(SidebarFilter);

// <Popup content={content} trigger={faEllipsisV} size={'sm'} color={color} />
