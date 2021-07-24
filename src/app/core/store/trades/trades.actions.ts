import { Action } from '@ngrx/store';
import { TradeItem } from '../../models/tradeItem';

export const SET_TRADES = '[TRADES] SET_TRADES';
export const CLEAN_TRADES = '[TRADES] CLEAN_TRADES';

export class SetTrades implements Action {
  readonly type = SET_TRADES;
  constructor(public payload: TradeItem[]) {}
}

export class CleanTrades implements Action {
  readonly type = CLEAN_TRADES;
}

export type Actions = SetTrades | CleanTrades;
