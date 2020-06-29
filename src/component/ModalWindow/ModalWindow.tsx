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
  size,
}) => {
  return (
    <>
      <Modal
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={onHide ? onHide : () => {}}
        size={size}
      >
        {!!title ? (
          <Modal.Header closeButton={!!onHide}>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
        ) : null}

        <Form noValidate validated={validated} onSubmit={onSubmit ? onSubmit : undefined}>
          {!!children ? <Modal.Body>{children}</Modal.Body> : undefined}

          {!!textOk || !!textNot ? (
            <Modal.Footer>
              {!!textNot ? (
                <Button variant="secondary" onClick={onHide || undefined}>
                  {textNot}
                </Button>
              ) : null}
              {!!textOk ? (
                <Button variant="primary" onClick={onSubmit ? undefined : onOk} type={!!onSubmit ? 'submit' : 'button'}>
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
