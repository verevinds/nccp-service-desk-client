import React, { memo, Fragment } from 'react';
import { Button } from 'react-bootstrap';
export interface IVisaIncidentButton {}

const VisaIncidentButton: React.FC<IVisaIncidentButton> = (props) => {
  return (
    <Fragment>
      <Button>OK</Button>
      <Button>NOT</Button>
    </Fragment>
  );
};

export default memo(VisaIncidentButton);
