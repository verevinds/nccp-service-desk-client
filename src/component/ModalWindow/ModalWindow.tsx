import React, { memo } from 'react';
import { IModalWindow } from './interface';

//Bootstrap
import { Modal, Button, Form } from 'react-bootstrap';

const ModalWindow: React.FC<IModalWindow> = ({
  title,
  children,
  show,
  onSubmit,
  onOk,
  onHide,
  textOk,
  textNot,
  validated,
}) => {
  return (
    <>
      <Modal
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={onHide}
      >
        {!!title ? (
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
        ) : null}

        <Form noValidate validated={validated} onSubmit={onSubmit || null}>
          {!!children ? <Modal.Body>{children}</Modal.Body> : null}

          {!!textOk || !!textNot ? (
            <Modal.Footer>
              {!!textNot ? (
                <Button variant="secondary" onClick={onHide || null}>
                  {textNot}
                </Button>
              ) : null}
              {!!textOk ? (
                <Button
                  variant="primary"
                  onClick={!onSubmit ? onOk : undefined}
                  type={!!onSubmit ? 'submit' : 'button'}
                >
                  {textOk}
                </Button>
              ) : null}
            </Modal.Footer>
          ) : null}
        </Form>
      </Modal>
    </>
  );
};
export default memo(ModalWindow);
