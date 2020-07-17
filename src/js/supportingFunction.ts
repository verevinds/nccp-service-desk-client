import { TUser } from '../interface';

export interface IArrayWithId {
  id: number;
  [key: string]: any;
}
type TId = number | null | string;
type IFindById = (array?: IArrayWithId[], id?: TId) => any;
export const findUser = (users: TUser[] | TUser, numberUser?: TId) =>
  Array.isArray(users) ? users.find((item: TUser) => item.number === Number(numberUser)) : users;

export const nameUser = (user: TUser[] | TUser, numberUser?: TId) => {
  const selectUser = findUser(user, numberUser);

  if (!selectUser) return undefined;

  return {
    user: selectUser,
    fullName: () => (!!selectUser ? `${selectUser.name1} ${selectUser.name2} ${selectUser.name3}` : undefined),
    initials: () =>
      !!selectUser ? `${selectUser.name1} ${selectUser.name2.charAt(0)}. ${selectUser.name2.charAt(0)}.` : undefined,
  };
};

export const findById: IFindById = (array, id) =>
  array && Array.isArray(array) ? array.find((item: IArrayWithId) => item.id === Number(id)) : undefined;
