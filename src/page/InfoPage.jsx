import React, { memo } from 'react';
import { Container, Card, Accordion, Button } from 'react-bootstrap';

const InfoPage = () => {
  const info = [
    {
      version: `1.3.1`,
      date: `23.06.2020`,
      body: [
        {
          title: `Приложение > Вертикальное меню`,
          text:
            'В вертикальном меню приложения, где находится список заявок, добавлен фильтр. Можно выбрать сортировку: номеру; имени; сроку сдачи.',
        },
      ],
    },
    {
      version: `1.3.0`,
      date: `22.06.2020`,
      body: [
        {
          title: `Каталог > Параметры`,
          text:
            'Настройка уникальной формы заполнения для отдельных параметров. Если Вам не подходить форма заявки по умолчанию, в настройках можно изменить эту форму на свою.',
        },

        {
          title: `Заявки > Перевод в другой отдел`,
          text: 'Перевод в другой отдел, только после согласования руководителем.',
        },
      ],
    },
    {
      version: `1.2.0`,
      date: `18.06.2020`,
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
      version: `1.1.2`,
      date: `16.06.2020`,
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
      version: '1.1.1',
      date: `15.06.2020`,
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
  let news = info[0];
  info.splice(0, 1);
  return (
    <Container fluid>
      <h1>Что нового </h1>
      <br />
      <hr />
      <br />
      <h6>Текущая версия: {`${news.version}`}</h6>
      {news.body.map((item) => (
        <>
          <Card.Title>{item.title}</Card.Title>
          <Card.Text>{item.text}</Card.Text>
        </>
      ))}
      <br />
      <hr />
      <br />
      <h6>История:</h6>
      <Accordion defaultActiveKey="0">
        {info.map((item, index) => (
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey={`${index}`}>
                Версия {item.version}{' '}
                <small>
                  (<i>{item.date}</i>)
                </small>
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
