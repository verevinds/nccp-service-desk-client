import React, { memo } from 'react';
import { Container, Card, Accordion, Button } from 'react-bootstrap';

const InfoPage = () => {
  const info = [
    {
      version: `1.1.0`,
      body: [
        {
          title: `Заявки`,
          text: 'Заявки можно переводить в другой',
        },

        {
          title: `Заявки > Перевод в другой отдел`,
          text: 'Перевод в другой отдел, только после согласования руководителем.',
        },
      ],
    },
    {
      version: `1.0.3`,
      body: [
        {
          title: `Заявки`,
          text: 'Заявки можно переводить в другой',
        },

        {
          title: `Заявки > Перевод в другой отдел`,
          text: 'Перевод в другой отдел, только после согласования руководителем.',
        },
      ],
    },
    {
      version: `1.0.2`,
      body: [
        {
          title: `Настройки > Суперпользователь`,
          text:
            'В приложение теперь есть доступ: Суперпользователь. \n Он имеет доступ абсолютно к любому функционалу приложения.',
        },
        {
          title: `Настройки > Каталог`,
          text: 'Категории, параметры, опции можно только отправлять в архив. Удалять может только Суперпользователь.',
        },
      ],
    },
    {
      version: '1.0.1',
      body: [
        { title: `Приложение > Структура`, text: `Связь один к многому между таблицами параметр и опция` },
        {
          title: `Настройки > Завки > Параметры`,
          text: `У каждой заявки теперь есть регламентный срок. По умолчанию это 2 дня, но в настройках руководитель
      может изменить. Изменять срок нужно в настройках меню "Каталог", и меняется он на параметрах`,
        },
      ],
    },
  ];
  return (
    <Container fluid>
      <h1>Документация (версия {`${process.env.REACT_APP_VERSION}`})</h1>
      <Accordion defaultActiveKey="0">
        {info.map((item, index) => (
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey={`${index}`}>
                Версия {item.version}
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey={`${index}`}>
              <Card.Body>
                {item.body.map((item) => (
                  <>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text>{item.text}</Card.Text>
                  </>
                ))}
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        ))}
      </Accordion>
    </Container>
  );
};

export default memo(InfoPage);
