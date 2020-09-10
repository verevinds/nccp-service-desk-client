import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { Card, Row, Col } from 'react-bootstrap';
import { IState, TPropertyParam, TIncident, TPosition } from '../../interface';
import { findById } from '../../js/supportingFunction';
export interface IIncidentWindowBodyCustom {}

const IncidentWindowBodyCustom: React.FC<IIncidentWindowBodyCustom> = (props) => {
  const incident: TIncident = useSelector((state: IState) => state.incidents?.current.incident);
  const positions: TPosition[] = useSelector((state: IState) => state.positions.list);
  return (
    <Row>
      {Array.isArray(incident?.params) &&
        incident?.params.map((row: TPropertyParam[], indexRow: number) => {
          return (
            <Col>
              {row.map((col: TPropertyParam, indexCol: number) => {
                console.log(col);
                let value;
                if (typeof col.value === 'boolean') {
                  value = col.value ? 'Да' : 'Нет';
                } else {
                  value = col.value ? col.value : ' - ';
                }
                if (col.select === 'positions') value = findById(positions, col.value).name;
                return (
                  <Card.Text key={indexCol}>
                    {col.type === 'title' && col.title ? (
                      <b>
                        {`${col.title}`} {col.description ? <br /> : undefined}
                      </b>
                    ) : undefined}
                    {col.type === 'switch' || col.type === 'checkbox'
                      ? `${col.placeholder}:`
                      : `${
                          col.title && col.type !== 'title' && col.title
                            ? `${col.title}:`
                            : `${col.description}:`
                        } `}
                    <br />
                    {col.type !== 'title' ? value : undefined}
                  </Card.Text>
                );
              })}
            </Col>
          );
        })}
    </Row>
  );
};

export default memo(IncidentWindowBodyCustom);
