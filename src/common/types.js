// @flow
//
// Copyright 2019 Ivan Sorokin.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { type State as BalanceState } from 'modules/balance'
import { type State as TxState } from 'modules/tx'
import { type State as SettingsState } from 'modules/settings'
import { type State as ToastedState } from 'modules/toaster'
import { type State as WalletState } from 'modules/wallet'

export type balanceRequestAction = {
  type: 'BALANCE_REQUEST',
}
export type balanceSuccessAction = { type: 'BALANCE_SUCCESS', data: Balance }
export type balanceFailureAction = { type: 'BALANCE_FAILURE', code?: number, message: string }

export type txListRequestAction = {
  type: 'TX_LIST_REQUEST',
  showLoader: boolean,
  refreshFromNode: boolean,
}
export type txListClearAction = {
  type: 'TX_LIST_CLEAR',
}
export type txListSuccessAction = {
  type: 'TX_LIST_SUCCESS',
  data: Array<RustTx>,
  validated: boolean,
}
export type txListFailureAction = { type: 'TX_LIST_FAILURE', code: number, message: string }

export type txGetRequestAction = { type: 'TX_GET_REQUEST', id: string }
export type txGetSuccessAction = { type: 'TX_GET_SUCCESS', tx: RustTx, validated: boolean }
export type txGetFalureAction = { type: 'TX_GET_FAILURE', code?: number, message: string }

export type txCancelRequestAction = {
  type: 'TX_CANCEL_REQUEST',
  id: number,
  slateId: string,
  isResponse: boolean,
}
export type txCancelSuccessAction = { type: 'TX_CANCEL_SUCCESS' }
export type txCancelFalureAction = { type: 'TX_CANCEL_FAILURE', code: number, message: string }

export type txCreateRequestAction = {
  type: 'TX_CREATE_REQUEST',
  amount: number,
  selectionStrategyIsUseAll: boolean,
  message: string,
}
export type txCreateSuccessAction = { type: 'TX_CREATE_SUCCESS' }
export type txCreateFalureAction = { type: 'TX_CREATE_FAILURE', code: number, message: string }

export type setSettings = { type: 'SET_SETTINGS', newSettings: SettingsState }

export type slateGetRequestAction = { type: 'SLATE_GET_REQUEST', id: string, isResponse: boolean }
export type slateGetSuccessAction = { type: 'SLATE_GET_SUCCESS', slate: Slate }
export type slateGetFalureAction = { type: 'SLATE_GET_FAILURE', code?: number, message: string }

export type slateLoadRequestAction = { type: 'SLATE_LOAD_REQUEST', slatePath: string }
export type slateLoadSuccessAction = { type: 'SLATE_LOAD_SUCCESS', slate: Slate }
export type slateLoadFalureAction = { type: 'SLATE_LOAD_FAILURE', code?: number, message: string }

export type slateSetRequestAction = { type: 'SLATE_SET_REQUEST', slate: Slate, isResponse: boolean }
export type slateSetSuccessAction = { type: 'SLATE_SET_SUCCESS' }
export type slateSetFalureAction = { type: 'SLATE_SET_FAILURE', code?: number, message: string }

export type slateRemoveRequestAction = {
  type: 'SLATE_REMOVE_REQUEST',
  id: string,
  isResponse: boolean,
}
export type slateRemoveSuccessAction = { type: 'SLATE_REMOVE_SUCCESS' }
export type slateRemoveFalureAction = {
  type: 'SLATE_REMOVE_FAILURE',
  code?: number,
  message: string,
}

export type txReceiveRequestAction = { type: 'TX_RECEIVE_REQUEST', slatePath: string }
export type txReceiveSuccessAction = { type: 'TX_RECEIVE_SUCCESS' }
export type txReceiveFalureAction = { type: 'TX_RECEIVE_FAILURE', code?: number, message: string }

export type txFinalizeRequestAction = {
  type: 'TX_FINALIZE_REQUEST',
  responseSlatePath: string,
  slateId: string,
}
export type txFinalizeSuccessAction = { type: 'TX_FINALIZE_SUCCESS' }
export type txFinalizeFalureAction = { type: 'TX_FINALIZE_FAILURE', code?: number, message: string }

export type slateShareRequestAction = {
  type: 'SLATE_SHARE_REQUEST',
  id: string,
  isResponse: boolean,
}
export type slateShareSuccessAction = { type: 'SLATE_SHARE_SUCCESS' }
export type slateShareFalureAction = { type: 'SLATE_SHARE_FAILURE', code?: number, message: string }

export type walletInitRequestAction = { type: 'WALLET_INIT_REQUEST' }
export type walletInitSuccessAction = { type: 'WALLET_INIT_SUCCESS', mnemonic: string }
export type walletInitFalureAction = { type: 'WALLET_INIT_FAILURE', code?: number, message: string }

export type walletRecoveryRequestAction = {
  type: 'WALLET_RECOVERY_REQUEST',
}
export type walletRecoverySuccessAction = { type: 'WALLET_RECOVERY_SUCCESS' }
export type walletRecoveryProgressUpdateAction = {
  type: 'WALLET_RECOVERY_PROGRESS_UPDATE',
  progress: number,
}
export type walletRecoveryFalureAction = {
  type: 'WALLET_RECOVERY_FAILURE',
  code?: number,
  message: string,
}
export type walletRecoverySetPhraseAction = { type: 'WALLET_RECOVERY_SET_PHRASE', phrase: string }
export type walletRecoverySetPasswordAction = {
  type: 'WALLET_RECOVERY_SET_PASSWORD',
  password: string,
}

export type walletPhraseRequestAction = { type: 'WALLET_PHRASE_REQUEST' }
export type walletPhraseSuccessAction = { type: 'WALLET_PHRASE_SUCCESS', phrase: string }
export type walletPhraseFalureAction = {
  type: 'WALLET_PHRASE_FAILURE',
  code?: number,
  message: string,
}
export type toastShowAction = { type: 'TOAST_SHOW', text: string, styles: any }

export type txFormSetAmountAction = {
  type: 'TX_FORM_SET_AMOUNT',
  amount: number,
  textAmount: string,
}

export type txFormSetOutputStrategyAction = {
  type: 'TX_FORM_SET_OUTPUT_STRATEGY',
  outputStrategy: OutputStrategy,
}

export type txFormOutputStrategiesRequestAction = {
  type: 'TX_FORM_SET_OUTPUT_STRATEGIES_REQUEST',
  amount: number,
}
export type txFormOutputStrategiesSuccessAction = {
  type: 'TX_FORM_SET_OUTPUT_STRATEGIES_SUCCESS',
  outputStrategies: Array<RustOutputStrategy>,
}
export type txFormOutputStrategiesFalureAction = {
  type: 'TX_FORM_SET_OUTPUT_STRATEGIES_FAILURE',
  code?: number,
  message: string,
}

export type txFormSetMessageAction = { type: 'TX_FORM_SET_MESSAGE', message: string }

export type Action =
  | balanceRequestAction
  | balanceSuccessAction
  | balanceFailureAction
  | txListClearAction
  | txListRequestAction
  | txListSuccessAction
  | txListFailureAction
  | txGetRequestAction
  | txGetSuccessAction
  | txGetFalureAction
  | txCancelRequestAction
  | txCancelSuccessAction
  | txCancelFalureAction
  | txCreateRequestAction
  | txCreateSuccessAction
  | txCreateFalureAction
  | setSettings
  | slateGetRequestAction
  | slateGetSuccessAction
  | slateGetFalureAction
  | slateSetRequestAction
  | slateSetSuccessAction
  | slateSetFalureAction
  | slateRemoveRequestAction
  | slateRemoveSuccessAction
  | slateRemoveFalureAction
  | txReceiveRequestAction
  | txReceiveSuccessAction
  | txReceiveFalureAction
  | txFinalizeRequestAction
  | txFinalizeSuccessAction
  | txFinalizeFalureAction
  | slateLoadRequestAction
  | slateLoadSuccessAction
  | slateLoadFalureAction
  | slateShareRequestAction
  | slateShareSuccessAction
  | slateShareFalureAction
  | toastShowAction
  | txFormSetAmountAction
  | txFormSetMessageAction
  | txFormSetOutputStrategyAction
  | txFormOutputStrategiesRequestAction
  | txFormOutputStrategiesSuccessAction
  | txFormOutputStrategiesFalureAction
  | walletInitRequestAction
  | walletInitSuccessAction
  | walletInitFalureAction
  | walletRecoveryRequestAction
  | walletRecoverySuccessAction
  | walletRecoveryFalureAction
  | walletRecoverySetPhraseAction
  | walletRecoverySetPasswordAction
  | walletRecoveryProgressUpdateAction
  | walletPhraseRequestAction
  | walletPhraseSuccessAction
  | walletPhraseFalureAction

export type Currency = 'EUR' | 'USD'
export type State = {
  settings: SettingsState,
  balance: BalanceState,
  tx: TxState,
  toaster: ToastedState,
  wallet: WalletState,
}

export type GetState = () => State
export type PromiseAction = Promise<Action>
export type Dispatch = (action: Action | Array<Action>) => any
export type Store = {
  dispatch: Dispatch,
  getState: () => State,
}

export type Navigation = {
  navigate: (screen: string, params: any) => void,
  dispatch: (action: any) => void,
  goBack: () => void,
  state: {
    params: any,
  },
}

export type OutputStrategy = {
  selectionStrategyIsUseAll: boolean,
  total: number,
  fee: number,
}

export type Balance = {
  amountAwaitingConfirmation: number,
  amountCurrentlySpendable: number,
  amountImmature: number,
  amountLocked: number,
  lastConfirmedHeight: number,
  minimumConfirmations: number,
  total: number,
}

type SlateParticipantData = {
  message: string,
}
export type Slate = {
  id: string,
  amount: number,
  fee: number,
  participant_data: Array<SlateParticipantData>,
}

export type Tx = {
  id: number,
  type: string,
  amount: number,
  confirmed: boolean,
  fee: number,
  creationTime: any,
  slateId: string,
}

// Rust structures
export type RustBalance = {
  amount_awaiting_confirmation: number,
  amount_currently_spendable: number,
  amount_immature: number,
  amount_locked: number,
  last_confirmed_height: number,
  minimum_confirmations: number,
  total: number,
}

export type RustTx = {
  amount_credited: number,
  amount_debited: number,
  confirmation_ts: number,
  confirmed: boolean,
  creation_ts: string,
  fee: number,
  id: number,
  num_inputs: number,
  num_outputs: number,
  parent_key_id: string,
  tx_hex: string,
  tx_slate_id: string,
  tx_type: string,
  stored_tx: string,
}

export type RustOutputStrategy = {
  selection_strategy_is_use_all: boolean,
  total: number,
  fee: number,
}

// Redux
export type Error = {
  code: number,
  message: string,
}

export type Step = {
  container: any,
  validate: () => any,
  onNextPress?: (event: any, next: () => void) => any,
}
