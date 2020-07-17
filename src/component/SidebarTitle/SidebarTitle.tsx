import React, { memo, Fragment, useState, useLayoutEffect } from 'react';
import styles from './styles.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import ButtonFontAwesome from '../ButtonFontAwesome/ButtonFontAwesome';
import { faFilter, faTrash } from '@fortawesome/free-solid-svg-icons';
import ModalWindow from '../ModalWindow/ModalWindow';
import { Form, Button, ListGroup } from 'react-bootstrap';
import { IState, TCategory, TProperty, TOption, TUser } from '../../interface';
import { useMemo } from 'react';
import { filterSet } from '../../redux/actionCreators/filterAction';
import { findById } from '../../js/supportingFunction';
export interface ISidebarTitle {
  title: string;
}

const SidebarTitle: React.FC<ISidebarTitle> = ({ title }) => {
  const [show, setShow] = useState(false);
  const [from, setFrom] = useState<string | undefined>();
  const [filter, setFilter] = useState<{
    categories: any[];
    properties: any[];
    options: any[];
  }>({
    categories: [],
    properties: [],
    options: [],
  });
  const [select, setSelect] = useState<string | undefined>();
  const user: TUser = useSelector((state: IState) => state.auth.user);
  const categories: (TCategory | never)[] = useSelector((state: IState) => state.catalog.list);
  const dispatch = useDispatch();
  const properties: { id: number; name: string }[] = useMemo(() => {
    return categories
      .filter((item: TCategory) => item.departmentId === user.departmentId)
      .map((item: TCategory) => item.properties)
      .flat()
      .map((item: TProperty) => {
        return {
          id: item.id,
          name: item.name,
        };
      });
  }, [categories, user]);

  const options: { id: number; name: string }[] = useMemo(() => {
    return categories
      .filter((item: TCategory) => item.departmentId === user.departmentId)
      .map((item: TCategory) => item.options)
      .flat()
      .map((item: TOption) => {
        return {
          id: item.id,
          name: item.name,
        };
      });
  }, [categories, user]);

  const list = useMemo(() => {
    switch (Number(from)) {
      case 1:
        return categories.map((item: TCategory) => {
          return {
            id: item.id,
            name: item.name,
          };
        });
      case 2:
        return properties;
      case 3:
        return options;
      default:
        return undefined;
    }
  }, [categories, properties, options, from]);

  useLayoutEffect(() => {
    let filterNoParse = localStorage.getItem('filter');
    let filter = !!filterNoParse && JSON.parse(filterNoParse);
    !!filter && setFilter(filter);
  }, []);

  return (
    <Fragment>
      <div className={styles.title}>
        <h4>{title}</h4>
        <ButtonFontAwesome
          faIcon={faFilter}
          onClick={() => {
            setShow(true);
          }}
          size="sm"
          sizeIcon="lg"
          variant="link"
        />
        <ModalWindow
          show={show}
          onHide={() => {
            setShow(false);
          }}
          onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            localStorage.setItem('filter', JSON.stringify(filter));
            dispatch(filterSet(filter));
            setShow(false);
          }}
          title={'Фильтр'}
          textOk={'Сохранить'}
        >
          <Form>
            <h4>Выбрать из</h4>
            <Form.Control
              as="select"
              defaultValue={''}
              onChange={(event: React.FormEvent<HTMLInputElement>) => {
                setFrom(event.currentTarget.value);
              }}
            >
              <option value=""></option>
              <option value="1">Категории</option>
              <option value="2">Параметры</option>
              <option value="3">Опции</option>
            </Form.Control>
            <br />

            {list ? (
              <>
                <h4>Фильтровать по</h4>
                <Form.Control
                  as="select"
                  onChange={(event: React.FormEvent<HTMLInputElement>) => {
                    setSelect(event.currentTarget.value);
                  }}
                >
                  <option value=""></option>
                  {list.map((item: { id: number; name: string }) => (
                    <option value={item.id} key={item.id}>
                      {item.name}
                    </option>
                  ))}
                </Form.Control>
              </>
            ) : undefined}

            <br />
            <Button
              onClick={() => {
                if (select) {
                  let newFilter = { ...filter };
                  switch (Number(from)) {
                    case 1:
                      {
                        let isIndex = newFilter.categories.findIndex((item: any) => item === select);
                        if (!~isIndex) {
                          newFilter.categories.push(select);
                          setFilter(newFilter);
                        }
                      }
                      break;
                    case 2:
                      {
                        let isIndex = newFilter.properties.findIndex((item: any) => item === select);
                        if (!~isIndex) {
                          newFilter.properties.push(select);
                          setFilter(newFilter);
                        }
                      }
                      break;
                    case 3:
                      {
                        let isIndex = newFilter.options.findIndex((item: any) => item === select);
                        if (!~isIndex) {
                          newFilter.options.push(select);
                          setFilter(newFilter);
                        }
                      }
                      break;
                    default:
                      break;
                  }
                }
              }}
            >
              Добавить
            </Button>

            <hr />
            <ListGroup>
              {!!filter && filter.categories.length ? (
                <>
                  <h6>Категории</h6>
                  {filter.categories.map((item: any) => (
                    <ListGroup.Item>
                      <div className="flex flex_row flex_between">
                        {!!categories.length ? findById(categories, item)?.name : 'Загрузка...'}
                        <ButtonFontAwesome
                          faIcon={faTrash}
                          onClick={() => {
                            let newFilter = { ...filter };
                            newFilter.categories = newFilter.categories.filter(
                              (element: TCategory) => element !== item,
                            );
                            setFilter(newFilter);
                          }}
                          size="sm"
                          variant="danger"
                        />
                      </div>
                    </ListGroup.Item>
                  ))}
                </>
              ) : undefined}

              {!!filter && filter.properties.length ? (
                <>
                  <h6>Параметры</h6>
                  {filter.properties.map((item: any, index: number) => (
                    <ListGroup.Item key={index}>
                      <div className="flex flex_row flex_between">
                        {!!properties.length ? findById(properties, item)?.name : 'Загрузка...'}
                        <ButtonFontAwesome
                          faIcon={faTrash}
                          onClick={() => {
                            let newFilter = { ...filter };

                            newFilter.properties = newFilter.properties.filter(
                              (element: TProperty) => element !== item,
                            );
                            setFilter(newFilter);
                          }}
                          size="sm"
                          variant="danger"
                        />
                      </div>
                    </ListGroup.Item>
                  ))}
                </>
              ) : undefined}

              {!!filter && filter.options.length ? (
                <>
                  <h6>Опции</h6>
                  {filter.options.map((item: any) => (
                    <ListGroup.Item>
                      <div className="flex flex_row flex_between">
                        {!!options.length ? findById(options, item)?.name : 'Загрузка...'}{' '}
                        <ButtonFontAwesome
                          faIcon={faTrash}
                          onClick={() => {
                            let newFilter = { ...filter };
                            newFilter.options = newFilter.options.filter((element: TOption) => element !== item);
                            setFilter(newFilter);
                          }}
                          size="sm"
                          variant="danger"
                        />
                      </div>
                    </ListGroup.Item>
                  ))}
                </>
              ) : undefined}
            </ListGroup>
          </Form>
        </ModalWindow>
      </div>
    </Fragment>
  );
};

export default memo(SidebarTitle);
