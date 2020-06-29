import React, { memo, Fragment, useLayoutEffect } from 'react';

import { Card, Accordion, Button } from 'react-bootstrap';
import styles from './styles.module.css';

export interface IInfo {}

const Info: React.FC<IInfo> = () => {
  const info = [
    {
      version: '1.5.0',
      date: '29.06.2020',
      body: [
        {
          title: 'Настройки > Заявки > Пользовательские настройки',
          text:
            '1. Исправленные мелкие ошибки;' +
            '\n2. Настройка пользовательской формы перенесена из настроек "Параметры" в настройки "Опции";' +
            '\n3. Теперь пользовательские формы можно расширять не только по оси У, но и по оси Х;' +
            '\n4. Для поля вида "Выпадающий список" добавлен тип "Сотрудники";' +
            '\n5. Добавлено поле вида "Заглушка" для большей гибкости в настройки интерфейса пользовательских форм.',
        },
        {
          title: 'Приложение > Заявки ',
          text:
            '1. Отправка на визирование - возможность отправить любому сотруднику для визирования(подтверждения) заявки;' +
            '\n2. Добавлены 4 стандартных состояния жизненого цикла заявки :' +
            '\n   1) Готово - заявка выполнена исполнителем;' +
            '\n   2) Закрыта - заявка закрыта инициатором. Возможно только после перевода завки в статус "Готово". Такие заявки уходят в историю.' +
            '\n   3) Отказано - в предоставление усгл отказано. Заявка закрыта исполнителем. Такую заявку нельзя вернуть в работу и она сразу уходит в историю.' +
            '\n   4) На доработку - инцидент переведен на инициатора. Может быть возвращен в работу, после исправления.' +
            '\n3. Изменять заявки может только текущий ответственный;',
        },
      ],
    },
    {
      version: '1.4.4',
      date: '27.06.2020',
      body: [
        {
          title: 'Настройки > Заявки > Пользовательские настройки',
          text:
            '1. Добавлена возможность создавать поле вида "Выпадающий список".' +
            '\n   a. Добавлен тип поля: "Отдел".' +
            '\n\n2. Добавлена возможность связывать поля условием: "Если родительское поле заполнено, тогда дочернее блокировать"' +
            '\n\n3. Рефакторинг и исправления ошибок.',
        },
      ],
    },
    {
      version: '1.4.3',
      date: '26.06.2020',
      body: [
        {
          title: 'Приложение > Заявки > Заведение заявки',
          text: ' Исправлены мелкие ошибки.',
        },
      ],
    },
    {
      version: '1.4.2',
      date: '25.06.2020',
      body: [
        {
          title: 'Приложение > Заявки > Просмотр заявки',
          text:
            ' Изменен вид отображения пользовательских заявок.' +
            '\nДобавлено обязательное заполнение формы заявок по умолчанию',
        },
        {
          title: 'Приложение > Заявки > Создание заявки',
          text:
            ' Добавлена возможность выбирать срок выполнения заявки.' +
            '\nСрок может быть выбран, только если он больше срока установленного по умолчанию.',
        },
        {
          title: 'Настройки > Параметры > Пользовательская форма',
          text:
            '1. Исправление ошибок;' +
            '\n2. Интерфейс стал более наглядным. Модуль для добавления полей стал более акцентированный;' +
            '\n3. Добавлен новый вид полей: "Заголовок";' +
            '\n4. Обязательные поля помечаются красной полосой слева.',
        },
        {
          title: 'Приложение',
          text:
            'Приложение само определяет через какой протокол оно открыто, и на основание этого формирует соответствующие запросы.' +
            '\nВозможность пользоваться HTTPS отключена на сервере.',
        },
      ],
    },
    {
      version: '1.4.1',
      date: '24.06.2020',
      body: [
        {
          title: 'Настройки > Параметры > Пользовательская форма',
          text:
            'Изменен вид добавления новых полей для пользовательской формы. Уменьшено кол-во полей, и приведено к адаптивно-понятному интерфейсу.' +
            '\nИзменения вносятся по двойному клику, на желаемое свойство. После двойного клика появляется форма для ввода данные о свойстве.',
        },
      ],
    },
    {
      version: '1.4.0',
      date: `23.06.2020`,
      body: [
        {
          title: `Заявки > Статус заявки`,
          text: '1. В настройках можно сделать приватные статусы для отдельных категорий.',
        },
        {
          text:
            '2. В списке изменения статуса отображаются только приватные заявки категории текущего инцидента, плюс публичные заявки.',
        },
        {
          title: `Приложение > Вертикальное меню`,
          text:
            '1. В вертикальном меню приложения, где находится список заявок, добавлен фильтр. Можно выбрать сортировку: номеру; имени; сроку сдачи.',
        },
        {
          text:
            '2. У каждой заявки снизу есть шкала прогресса.' +
            '\nШкала разделена на 2-а деления:' +
            '\n 1) Процесс ожидания - пока не возьмут в работу, будет только эта шкала. Отображает сколько пропорционально потрачено времени на ожидание' +
            '\n    Синий - идёт ожидание; Жёлтый - прошло больше 20% времени; Красный - срок истек; Бирюзовый - ожидание закончено.' +
            '\n 2) Процесс выполнения - появляется после взятия в работу. Отображает сколько пропорционально потрачено времени на выполнение. ' +
            '\n    Синий - идёт ожидание; Жёлтый - прошло больше 80% времени; Красный - срок истек;  Зелёный - работа выполнена.',
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
          title: `Каталог > Параметры-Опция`,
          text:
            'Если зайти в каталог, выбрать категорию и нажать CTRL, можно сделать связь Параметр-Опция. Если опция привязана к какому-нибудь параметру, она не будет использоваться в других параметрах.',
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
          title: `Настройки > Заявки > Параметры`,
          text: `У каждой заявки теперь есть регламентный срок. По умолчанию это 2 дня, но в настройках руководитель
      может изменить. Изменять срок нужно в настройках меню "Каталог", и меняется он на параметрах`,
        },
      ],
    },
  ];
  let news = info[0];
  info.splice(0, 1);

  useLayoutEffect(() => {
    process.env.REACT_APP_VERSION && localStorage.setItem('version', process.env.REACT_APP_VERSION);
  }, []);
  return (
    <Fragment>
      <h6>Текущая версия: {`${news.version}`}</h6>
      <br />
      {news.body.map((item) => (
        <>
          <Card.Title>{item.title}</Card.Title>
          <Card.Text as="pre" className={styles.textIncident}>
            {item.text}
          </Card.Text>
        </>
      ))}
      <br />
      <hr />
      <h6>История:</h6>
      <br />
      <Accordion>
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
                    <Card.Text as="pre" className={styles.textIncident}>
                      {item.text}
                    </Card.Text>
                  </>
                ))}
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        ))}
      </Accordion>
    </Fragment>
  );
};

export default memo(Info);
