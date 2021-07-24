import { TradeItem } from '../../models/tradeItem';
import * as TradesActions from './trades.actions';

const initialState: TradeItem[] = [];

function TradesReducer(
  state = initialState,
  action: TradesActions.Actions
): TradeItem[] {
  switch (action.type) {
    case TradesActions.SET_TRADES:
      return action.payload;
    case TradesActions.CLEAN_TRADES:
      return initialState;
    default:
      return state;
  }
}

export default TradesReducer;
