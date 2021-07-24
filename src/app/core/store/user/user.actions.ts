import { Action } from '@ngrx/store';
import { User } from '../../models/user';

export const SET_USER = '[USER] SET_USER';
export const CLEAN_USER = '[USER] CLEAN_USER';

export class SetUser implements Action {
  readonly type = SET_USER;
  constructor(public payload: User) {}
}

export class CleanUser implements Action {
  readonly type = CLEAN_USER;
}

export type Actions = SetUser | CleanUser;
