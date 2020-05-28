import React, { memo, Fragment, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import SettingAccessList from '../SettingAccessList/SettingAccessList';
import CardUser from '../CardUser/CardUser';

const SettingAccess = () => {
  const [id, setId] = useState<number | undefined>();
  return (
    <Fragment>
      <h2>Доступ</h2>
      <Row>
        <Col xs={5}>
          <SettingAccessList
            setId={(id: number) => {
              setId(id);
            }}
          />
        </Col>

        <Col xs={7}>{id ? <CardUser id={id} /> : undefined}</Col>
      </Row>
    </Fragment>
  );
};

export default memo(SettingAccess);
