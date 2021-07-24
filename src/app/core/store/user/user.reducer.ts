import { User } from '../../models/user';
import * as UserActions from './user.actions';

const initialState: User = {
  id: null,
  user_name: null,
  password: null,
  email: null,
  account_balance: null,
};

function UserReducer(state = initialState, action: UserActions.Actions): User {
  switch (action.type) {
    case UserActions.SET_USER:
      return action.payload;
    case UserActions.CLEAN_USER:
      return initialState;
    default:
      return state;
  }
}

export default UserReducer;
