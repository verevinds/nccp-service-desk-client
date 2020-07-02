import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { Card, Row, Col } from 'react-bootstrap';
import { IState, TPropertyParam, TIncident } from '../../interface';
export interface IIncidentWindowBodyCustom {}

const IncidentWindowBodyCustom: React.FC<IIncidentWindowBodyCustom> = (props) => {
  const incident: TIncident = useSelector((state: IState) => state.incidents?.current.incident);
  return (
    <Row>
      {Array.isArray(incident?.params) &&
        incident?.params.map((row: TPropertyParam[], indexRow: number) => {
          return (
            <Col>
              {row.map((col: TPropertyParam, indexCol: number) => {
                let value;
                if (typeof col.value === 'boolean') {
                  value = col.value ? 'Да' : 'Нет';
                } else {
                  value = col.value ? col.value : ' - ';
                }

                return (
                  <Card.Text key={indexCol}>
                    {col.type === 'title' && col.title ? (
                      <b>
                        {`${col.title}`} {col.description ? <br /> : undefined}
                      </b>
                    ) : undefined}
                    {col.type === 'switch' || col.type === 'checkbox'
                      ? `${col.placeholder}:`
                      : `${col.title && col.type !== 'title' && col.title ? `${col.title}:` : `${col.description}:`} `}
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
