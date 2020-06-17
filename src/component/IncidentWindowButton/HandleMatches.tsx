import React, { memo, useMemo } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { shallowEqual, useSelector } from 'react-redux';
import { IState, TIncidentCurrent, TMatch } from '../../interface';

export interface IHandleMatches {
  incident: any;
  onClick: () => void;
}

const HandleMatches: React.FC<IHandleMatches> = ({ onClick }) => {
  const {
    incident: { matches },
  }: TIncidentCurrent = useSelector((state: IState) => state.incidents.current, shallowEqual);
  console.log(matches);
  let jsxButton = useMemo(() => {
    if (matches)
      return matches.map((item: TMatch) => {
        switch (item.code) {
          case 1:
            return (
              <ButtonGroup aria-label="Basic example" key={1}>
                <Button
                  variant="success"
                  onClick={onClick.bind({
                    comment: `Согласовано`,
                    bodyData: { consent: true },
                  })}
                >
                  Согласовать
                </Button>
                <Button
                  variant="outline-danger"
                  onClick={onClick.bind({
                    comment: `Отказано`,
                    bodyData: { currentResponsible: null, statusId: 0 },
                  })}
                >
                  Отказать
                </Button>
              </ButtonGroup>
            );
          default:
            break;
        }
      });
  }, [matches]);
  return <>{jsxButton && jsxButton.map((item: any) => item)}</>;
};

export default memo(HandleMatches);
