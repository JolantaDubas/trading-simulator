import { TradeItem } from '../models/tradeItem';
import { User } from '../models/user';
import TradesReducer from './trades/trades.reducer';
import UserReducer from './user/user.reducer';

export interface AppState {
  readonly user: User;
  readonly trades: TradeItem[];
}

export const allReducers = {
  user: UserReducer,
  trades: TradesReducer,
};
