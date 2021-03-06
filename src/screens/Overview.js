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

import React, { Component } from 'react'
import { TouchableHighlight, TouchableOpacity, RefreshControl, View } from 'react-native'
import { connect } from 'react-redux'
import styled from 'styled-components/native'
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view'
import { Text, Button } from 'components/CustomFont'
import Balance from 'components/Balance'
import RecoveryProgress from 'components/RecoveryProgress'
import HeaderSpan from 'components/HeaderSpan'
import TxListItem from 'components/TxListItem'

import {
  type Balance as BalanceType,
  type State as GlobalState,
  type Currency,
  type Tx,
  type Navigation,
} from 'common/types'
import { colors } from 'common'

import { type WalletRecoveryState } from 'modules/wallet'

//Images
import SendTXImg from 'assets/images/SendTX.png'

type Props = {
  getBalance: () => void,
  balance: BalanceType,
  txs: Array<Tx>,
  settings: {
    currency: Currency,
  },
  txCancel: (id: number, slateId: string, isResponse: boolean) => void,
  txsGet: (showLoader: boolean, refreshFromNode: boolean) => void,
  resetTxForm: () => void,
  slateShare: (id: string, isResponse: boolean) => void,
  navigation: Navigation,
  txListRefreshInProgress: boolean,
  walletRecovery: WalletRecoveryState,
  isOffline: boolean,
  firstLoading: boolean,
}

type State = {}

const Wrapper = styled.View`
  height: 100%;
`

const ActionButtonTH = styled.TouchableOpacity`
  position: absolute;
  bottom: -50;
  justify-content: center;
  align-items: center;
  width: 120;
  height: 120;
  background-color: ${() => colors.primary};
  border-radius: 60;
  align-self: center;
  opacity: ${props => (props.disabled ? '0.3' : '1')};
`

const ActionButtonIcon = styled.Image`
  width: 28;
  height: 28;
  margin-top: -40;
`
const ActionButtonText = styled(Text)`
  font-size: 16;
`

const NoTxsView = styled.View`
  padding: 16px;
`
const ActionButton = (props: any) => {
  const { title, icon } = props
  return (
    <ActionButtonTH onPress={props.onPress} disabled={props.disabled}>
      <React.Fragment>
        <ActionButtonIcon source={icon} />
        <ActionButtonText>{title}</ActionButtonText>
      </React.Fragment>
    </ActionButtonTH>
  )
}

const ListItemSeparator = styled.View`
  height: 1;
  width: 100%;
  background-color: #dedede;
`

const EmptyTxListMessage = styled(Text)`
  font-size: 18;
  text-align: center;
  color: ${() => colors.darkestGrey};
  margin-bottom: 20;
`
class Overview extends Component<Props, State> {
  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props)
  }
  componentDidMount() {
    if (!this.props.walletRecovery.inProgress) {
      this.props.getBalance()
      this.props.txsGet(false, false)
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.walletRecovery.error.message && !prevProps.walletRecovery.error.message) {
      this.props.navigation.navigate('Initial')
    }
  }
  render() {
    const {
      txListRefreshInProgress,
      txs,
      balance,
      navigation,
      getBalance,
      txCancel,
      txsGet,
      slateShare,
      settings,
      resetTxForm,
      walletRecovery,
      isOffline,
      firstLoading,
    } = this.props
    const { currency } = settings
    return (
      <Wrapper>
        <HeaderSpan bgColor={colors.primary} />

        {(walletRecovery.inProgress && <RecoveryProgress />) || (
          <Balance
            balance={balance}
            currency={currency}
            isOffline={isOffline}
            navigation={navigation}
          />
        )}
        <SwipeListView
          useFlatList
          data={txs}
          ListEmptyComponent={
            !walletRecovery.inProgress && (
              <NoTxsView>
                {(firstLoading && <EmptyTxListMessage>Loading...</EmptyTxListMessage>) || (
                  <Button onPress={() => navigation.navigate('Topup')} title="Top up balance?" />
                )}
              </NoTxsView>
            )
          }
          ItemSeparatorComponent={ListItemSeparator}
          renderItem={(data, rowMap) => (
            <SwipeRow
              disableRightSwipe
              rightOpenValue={-100}
              disableLeftSwipe={data.item.confirmed || data.item.type === 'TxFinalized'}
            >
              <View
                style={{
                  alignItems: 'center',
                  backgroundColor: 'red',
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                }}
              >
                <TouchableOpacity
                  style={{
                    height: '100%',
                    justifyContent: 'center',
                  }}
                  onPress={_ => txCancel(data.item.id, data.item.slateId, !data.item.stored_tx)}
                >
                  <Text
                    style={{
                      width: 100,
                      color: 'white',
                      textAlign: 'center',
                    }}
                  >
                    {'Cancel'}
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableHighlight
                onPress={_ => {
                  if (data.item.confirmed || data.item.type === 'TxFinalized') {
                    navigation.navigate('TxDetails', { txId: data.item.id })
                  } else {
                    slateShare(data.item.slateId, !data.item.storedTx)
                  }
                }}
                style={{
                  alignItems: 'center',
                  backgroundColor: '#fff',
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
                underlayColor={'#FBFBFB'}
              >
                <TxListItem currency={currency} tx={data.item} />
              </TouchableHighlight>
            </SwipeRow>
          )}
          contentContainerStyle={{
            paddingBottom: 110,
            backgroundColor: '#fff',
          }}
          keyExtractor={item => `${item.id}`}
          refreshControl={
            <RefreshControl
              refreshing={txListRefreshInProgress}
              onRefresh={() => {
                getBalance()
                txsGet(true, true)
              }}
            />
          }
        />
        {!walletRecovery.inProgress && (
          <ActionButton
            title="Send"
            disabled={!balance.amountCurrentlySpendable}
            icon={SendTXImg}
            onPress={() => {
              resetTxForm()
              navigation.navigate('Send')
            }}
          />
        )}
      </Wrapper>
    )
  }
}

const mapStateToProps = (state: GlobalState) => {
  return {
    balance: state.balance.data,
    txListRefreshInProgress: state.tx.list.showLoader,
    txs: state.tx.list.data,
    firstLoading: state.tx.list.lastUpdated === null,
    isOffline: state.tx.list.isOffline,
    settings: state.settings,
    walletRecovery: state.wallet.walletRecovery,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  getBalance: () => {
    dispatch({ type: 'BALANCE_REQUEST' })
  },
  txCancel: (id: number, slateId, isResponse: boolean) => {
    dispatch({ type: 'TX_CANCEL_REQUEST', id, slateId, isResponse })
  },
  txsGet: (showLoader, refreshFromNode) => {
    dispatch({ type: 'TX_LIST_REQUEST', showLoader, refreshFromNode })
  },
  slateShare: (id: string, isResponse: boolean) => {
    dispatch({ type: 'SLATE_SHARE_REQUEST', id, isResponse })
  },
  resetTxForm: () => {
    dispatch({ type: 'TX_FORM_SET_AMOUNT', amount: 0, textAmount: '' })
    dispatch({ type: 'TX_FORM_SET_MESSAGE', message: '' })
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Overview)
