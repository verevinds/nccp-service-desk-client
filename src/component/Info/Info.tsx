import React, { memo, Fragment, useLayoutEffect } from 'react';

import { Card, Accordion, Button } from 'react-bootstrap';
import styles from './styles.module.css';

export interface IInfo {}

const Info: React.FC<IInfo> = () => {
  const info = [
    {
      version: '1.15.0',
      date: '21.07.2020',
      body: [
        {
          title: 'Приложение > Заявки > Согласование',
          text: 'Если создается заявка с участием любого из ресурсов, то требуется согласование владельца ресурса',
        },
        {
          title: 'НОВОЕ: Поиск',
          text:
            '   Добавлен модуль: Поиск по актуальным заявкам.' +
            '\n   Местоположение: Мои заявки/Рабочая панель/Руководитель/Согласование > Список заявок. ' +
            '\n\n   Поиск осуществляется по актуальному списку заявок, и не распространяется на историю' +
            '\n   Поиск можно выполнить по двух критериям:' +
            '\n     1) Инициатор - ФИО создателя заявки;' +
            '\n     2) Должность - должность создателя заявки.' +
            '\n\n   ВНИМАНИЕ! В случае отсутствия заявок по данным критериям поиска, будет выведена надпись "Список пуст".',
        },
      ],
    },
    {
      version: '1.14.0',
      date: '20.07.2020',
      body: [
        {
          title: 'НОВОЕ: Ресурсы',
          text:
            '   Добавлен модуль: "Ресурсы".' +
            '\n   Местоположение: Настройки > Ресурсы.' +
            '\n\n   Каждый отдел может добавлять ресурсы в список, и привязывать к ним ответственных. Ответственные нужны для того, чтобы вести учёт ресурсов и ответственных, а так же для согласования модификаций над ресурсом.',
        },
      ],
    },
    {
      version: '1.13.0',
      date: '17.07.2020',
      body: [
        {
          title: 'Архитектура',
          text:
            'Переписано Api для более комфортного поддержания и масштабирования приложения.' +
            'Сокращены объемы кода на 5%. Теперь настройки Api не прописываются, а выбираются.' +
            'Это повышает читабельность и скорость отладки, и понизила вероятность ошибок.',
        },
      ],
    },
    {
      version: '1.12.0',
      date: '15.07.2020',
      body: [
        {
          title: 'Архитектура',
          text: 'Большая реконструкция кода. Сокращены объемы кода на 20%, и увеличена производительность.',
        },
        {
          title: 'Приложение > Меню',
          text: 'Добавлены подсказки для пользователей. Подсказка показывается при наведении на кнопку.',
        },
      ],
    },
    {
      version: '1.11.3',
      date: '14.07.2020',
      body: [
        {
          title: 'Приложение > Подписки',
          text:
            '1. Добавлена подписка: "Мои отдел". ' +
            '\n   По этой подписке, Вы будете получать уведомление на почту о всех инцидентах,' +
            '\n которые поступают на страницу "Рабочая панель", всего Вашего отдела.' +
            '\n\n ВАЖНО!' +
            '\n Если вы не назначены на какую-то категорию, но она присутствует в Вашем отделе, то Вы также будете получать уведомления.' +
            '\n\n2. Добавлена подписка: "Моя ответственность".' +
            '\n   По этой подписке, Вы будете получать уведомления на почту о всех инцидентах, которые по категории входят в Вашу ответственность.' +
            '\n Ответственность назначает руководитель в настройках.' +
            '\n\nПо подпискам, на почту приходит только одно письмо.' +
            '\n   1) Мои заявки;' +
            '\n   2) Моя ответственность;' +
            '\n   3) Мои отдел.' +
            '\n К примеру, если вы подписаны на все подписки. При изменение инцидента находящемся в Вашем отделе на исполнение, и в зоне Вашей ответственности, то Вам придёт сообщение по подписке "Моя ответственность", но если он не находиться в зоне Вашей ответственности, тогда придёт по подписке "Мой отдел"',
        },
        {
          title: 'Приложение > Список заявок',
          text: 'Мелкие изменения в дизайне и анимации.',
        },
      ],
    },
    {
      version: '1.11.2',
      date: '13.07.2020',
      body: [
        {
          title: 'Приложение > Маршрутизация',
          text: 'Каждая заявка получила свою уникальную адресную ссылку.',
        },
        {
          title: 'Приложение > Подписки',
          text:
            '1. Переписан алгоритм обработки подписок сервером;' +
            '\n2. Выключены подписки: "Мой отдел", "Моя ответственность".',
        },
        {
          title: 'Приложение > Комментарии',
          text: 'Исправлены мелкие ошибки в оформлении.',
        },
        {
          title: 'Приложение > Список инцидентов',
          text: '1. Рефакторинг архитектуры модуля; \n2. Мелкие изменения в формате и стилизации.',
        },
        {
          title: 'Приложение > Кнопки',
          text: 'Добавлены иконки на некоторых кнопках для повышения читабельности и наглядности .',
        },
      ],
    },
    {
      version: '1.11.1',
      date: '10.07.2020',
      body: [
        {
          title: 'Приложение > Загрузка данных',
          text:
            '1. Оптимизирована загрузка данных, теперь данные загружаются быстрее;' +
            '\n2. Перед загрузкой данных, программа получает сохраненные данные из локального хранилища пользователя;' +
            '\n3. Оптимизированы изображения, уменьшен вес на 92%;' +
            '\n4. Исправлены мелкие ошибки.',
        },
        {
          title: 'Приложение > Заявка > Доработка инцидента',
          text:
            'Исправлен баг с возвращением заявки в работу, после доработки. Теперь заявка возвращается в предыдущий статус, и не просит заново согласования у руководителя, также не сбрасывает счётчики времени. ',
        },
        {
          title: 'Приложение > Дизайн > Шрифт',
          text:
            '1. Основной шрифт приложения изменен на шрифт от Росатома, из брендбука;' +
            '\n2. Размеры шрифта уменьшены для экономии рабочего пространства и наглядности.',
        },
        {
          title: 'Приложение > Дизайн > Тег',
          text:
            '1. Увеличено кол-во тегов. Добавлен тег "На согласовании";' +
            '\n2. Увеличен цветовой диапазон тегов;' +
            '\n3. Исправлено соответствие тегов статусу заявки.',
        },
        {
          title: 'Приложение > Список заявок > Фильтр',
          text:
            '1. Изменено отображение фильтров для списков заявок;' +
            '\n2. Убран фильтр "Срочность";' +
            '\n3. Добавлен фильтр "Инициатор заявки". Этот фильтр сортирует заявки по инициаторам заявки в алфавитном порядке.',
        },

        {
          title: 'Приложение > Заявка > Комментарии',
          text: '1. Изменена структура работы комментариев; \n2. Переписаны шаблоны текста в комментариях.',
        },
      ],
    },
    {
      version: '1.11.0',
      date: '09.07.2020',
      body: [
        {
          title: 'Приложение > Согласование заявки',
          text:
            '1. Добавлена возможность создавать правила согласования заявок;' +
            '\n2. Добавлен дополнительный интерфейс для работы с согласованием заявок. Если Ваша должность попадает под какое-нибудь правило, о согласование, то на страницу «Согласование» будут падать заявки, требующие Вашего согласования;' +
            '\n3. Заявка поступает в отдел, ответственный за неё, только после согласования всеми людьми из правила, созданного ответственным. Если на заявку не создано правило, она сразу падает в ответственный отдел',
        },
        {
          title: 'Настройка',
          text: 'Добавлена возможность включения/выключения модулей приложения.',
        },
        {
          title: 'Приложение > Заявка > Срок выполнения',
          text: 'Отключено отображение временной шкалы и расчёта срока выполнения.',
        },
      ],
    },
    {
      version: '1.10.0',
      date: '08.07.2020',
      body: [
        {
          title: 'Приложение > Заявки',
          text:
            'Каждая заявка, перед поступлением в работу, проходит согласованием у руководителя отдела.' +
            ' Если заявку создал руководитель и выше, тогда заявка не требует согласования.',
        },
      ],
    },
    {
      version: '1.9.0',
      date: '07.07.2020',
      body: [
        {
          title: 'Приложение > Ответственность',
          text:
            'Добавлена возможность добавить ответственность на каждую должность отдельно.' +
            ' Если ответственность на должность не назначена, тогда сотрудники этой должности видят все инциденты в отделе.',
        },
      ],
    },
    {
      version: '1.8.1',
      date: '03.07.2020',
      body: [
        {
          title: 'Приложение > Архитектура',
          text: '1. Перепроектирование кода; \n2. Исправлены мелкие ошибки.',
        },
        {
          title: 'Приложение > Заявка > Комментарии',
          text: 'Изменен формат времени с 12-и на 24-х часовой',
        },
      ],
    },
    {
      version: '1.8.0',
      date: '02.07.2020',
      body: [
        {
          title: 'НОВОЕ: Фильтр',
          text:
            'В возможности приложения добавлен новый модуль: «Фильтр».' +
            '\n\nЭтот модуль позволяет создать список категорий, параметров, опций, которые вы хотите видеть в своей рабочей области.' +
            '\nКнопка находиться справа от заголовка в рабочей панели. ',
        },
        {
          title: 'Приложение > Дизайн',
          text: '1. Изменен логотип; \n2. Изменен фон рабочей области; \n3. Мелкие изменения в цветовой палитре.',
        },
        {
          title: 'Приложение > Список заявок',
          text:
            '1. Добавлен лимит по отображаемым заявкам в списке.' +
            '\n Отображается 8 заявок.' +
            '\n\nС помощью кнопки "Показать ещё" можно отобразить ещё заявок. Каждый "клик" — это плюс 8 заявок в список.',
        },
      ],
    },
    {
      version: '1.7.0',
      date: '01.07.2020',
      body: [
        {
          title: 'НОВОЕ: Подписки',
          text:
            'В возможности приложения добавлен новый модуль: "Подписки".' +
            '\nНа почту Вам будут приходить уведомления, в зависимости от Ваших подписок.' +
            '\n\nДобавлено 3-и вида подписок:' +
            '\n 1) Мой отдел - уведомление на почту о каждой новой заявке, поступившей в Ваш отдел.' +
            '\n 2) Моя ответственность - Уведомление на почту о каждом изменении по заявкам, в которых Вы назначены ответственным.' +
            '\n 3) Мои заявки - Уведомление на почту о каждом изменении по Вашим заявкам.',
        },
        {
          title: 'Настройки',
          text:
            'Все пользователи имеют доступ к настройкам, в разделы:' +
            '\n 1) Пользователи - просмотр списка пользователей;' +
            '\n 2) Подписки - просмотр и оформление подписки.',
        },

        {
          title: 'Настройки > Пользователи',
          text: 'Уволенные сотрудники больше не отображаются',
        },
      ],
    },
    {
      version: '1.6.0',
      date: '30.06.2020',
      body: [
        {
          title: 'Приложение > Уведомления',
          text:
            '1.	Переписана архитектура уведомлений;' +
            '\n2.	Уведомления приходят инициатору и ответственному по заявке, если в ней произошли изменения.' +
            '\nЕсли ответственного нет, тогда уведомление приходит на весь отдел.',
        },
      ],
    },
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
            '\n5. Добавлено поле вида "Заглушка" для большей гибкости в настройки интерфейса пользовательских форм;' +
            '\n6. Стандартные статусы жизненного цикла программы удалять, изменять, архивировать, может только Суперпользователь.',
        },
        {
          title: 'Приложение > Заявки ',
          text:
            '1. Отправка на визирование - возможность отправить любому сотруднику для визирования(подтверждения) заявки;' +
            '\n2. Добавлены 4 стандартных состояния жизненного цикла заявки :' +
            '\n   1) Готово - заявка выполнена исполнителем;' +
            '\n   2) Закрыта - заявка закрыта инициатором. Возможно только после перевода заявки в статус "Готово". Такие заявки уходят в историю.' +
            '\n   3) Отказано - в предоставление услуги отказано. Заявка закрыта исполнителем. Такую заявку нельзя вернуть в работу и она сразу уходит в историю.' +
            '\n   4) На доработку - инцидент переведен на инициатора. Может быть возвращен в работу, после исправления.' +
            '\n3. Изменять заявки может только текущий ответственный;' +
            '\n4. Изменена логика выбора категории, параметра, опции;' +
            '\n5. Изменена архитектура заведения и исправления заявок.',
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
        {
          title: `Приложение > Структура`,
          text: `Связь один к многому между таблицами параметр и опция`,
        },
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
