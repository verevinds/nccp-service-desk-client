import React, { memo, useState } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import styles from './styles.module.css';
import Moment from 'react-moment';
import 'moment/locale/ru';
import './styles.css';
//Bootstrap
import { Card, Accordion, Table, Image, OverlayTrigger, Tooltip } from 'react-bootstrap';

//? Font Awesome иконки
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleDown, faFileImage, faFile } from '@fortawesome/free-solid-svg-icons';
import ModalWindow from '../ModalWindow/ModalWindow';
import PopUpMenu from '../PopupMenu/PopUpMenu';
import { IState } from '../../interface';

const IncidentWindowFiles = () => {
  const files = useSelector((state: IState) => state.incidents?.current.incident.files, shallowEqual);

  const [accordion, setAccordion] = useState(false);
  const [show, setShow] = useState(false);
  const [urlImg, setUrlImg] = useState<string | undefined>(undefined);

  return (
    <div className="window-file">
      <ModalWindow
        show={show}
        onHide={() => {
          setShow(false);
        }}
      >
        <Image src={urlImg} fluid />
      </ModalWindow>
      <Accordion defaultActiveKey="1">
        <Card>
          <Accordion.Toggle
            as={Card.Header}
            eventKey="0"
            onClick={() => {
              let boolean = accordion;
              setAccordion(!boolean);
            }}
            className={styles.header}
          >
            <FontAwesomeIcon icon={accordion ? faAngleDown : faAngleRight} /> Вложения
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Table borderless hover>
              <thead>
                <tr>
                  <th></th>
                  <th>Название файла</th>
                  <th>Кто вложил</th>
                  <th>Дата вложения</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {files?.map((item: any) => {
                  let stateFile = { icon: faFile, isImg: false };
                  if (/\.(?:png|jpeg|jpg)/.test(item.name)) {
                    stateFile = { icon: faFileImage, isImg: true };
                  }
                  return (
                    <tr key={item.id}>
                      <td>
                        <OverlayTrigger
                          placement="right"
                          delay={{ show: 250, hide: 400 }}
                          overlay={
                            <Tooltip id="button-tooltip">
                              {stateFile.isImg ? `Посмотреть картинку` : `Нажми, чтобы посмотреть`}
                            </Tooltip>
                          }
                        >
                          <FontAwesomeIcon
                            size="lg"
                            icon={stateFile.icon}
                            onClick={() => {
                              if (stateFile.isImg) {
                                setShow(true);
                                setUrlImg(item.url);
                              }
                            }}
                            className={styles.icon}
                          />
                        </OverlayTrigger>
                      </td>
                      <td>
                        <pre>{item.name}</pre>
                      </td>
                      <td>{`${item.user.name1} ${item.user.name2.charAt(0)}. ${item.user.name3.charAt(0)}.`}</td>
                      <td>
                        <Moment locale="ru" format="HH:mm D.MM.YYг" withTitle>
                          {item.createdAt}
                        </Moment>
                      </td>
                      <td>
                        <PopUpMenu url={item.url} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </div>
  );
};

export default memo(IncidentWindowFiles);
