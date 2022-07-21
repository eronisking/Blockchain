import React, { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { useSelector } from 'react-redux'
import { colors, Icon } from '@blockchain-com/constellation'
import { IconMoreHorizontal } from '@blockchain-com/icons'
import { CombinedState } from 'redux'
import styled from 'styled-components'

import { Text } from 'blockchain-info-components'
import { selectors } from 'data'
import { SWAP_ACCOUNTS_SELECTOR } from 'data/coins/model/swap'
import { getCoinAccounts } from 'data/coins/selectors'

import { SwitchAccount } from '../SwitchAccount'

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 40px;
`

const WalletWapper = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 3px 10px;
  background-color: ${colors.smoke800};
  border-radius: 8px;
  border: none;
  outline: none;
  cursor: pointer;
`

const Wallet = styled(Text)`
  color: ${(props) => props.theme.grey400};
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  letter-spacing: 0em;
  text-align: left;
`

const AssetWrapper = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  padding: 0 10px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.exchangeLogin};
`

const StatusLabel = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: ${colors.green500};
`

const SettingsButton = styled.button`
  background: none;
  border: none;
  outline: none;
`

const Header = () => {
  const [isSwitchAccountVisible, setIsSwitchAccountVisible] = useState(false)
  const [selectedAccountIndex, setSelectedAccountIndex] = useState<number>(0)
  const coins = useSelector(selectors.components.swap.getCoins)
  const balance = useSelector(selectors.balances.getTotalWalletBalance)
  const accounts = useSelector((state) =>
    getCoinAccounts(state as CombinedState<any>, { coins, ...SWAP_ACCOUNTS_SELECTOR })
  )

  const switchAccounts = [accounts.ETH, accounts.BTC, accounts.BCH, accounts.XLM, accounts.STX]
  const activeAccountCoin =
    switchAccounts[selectedAccountIndex] && switchAccounts[selectedAccountIndex][0].baseCoin
  const setSwitchAccountVisibility = () => {
    setIsSwitchAccountVisible(true)
  }

  return (
    <header>
      <HeaderWrapper>
        <WalletWapper onClick={setSwitchAccountVisibility}>
          <Wallet>
            <FormattedMessage
              id='scenes.plugin.coinslist.private_key_wallet'
              defaultMessage='Private Key Wallet'
            />
          </Wallet>
          <AssetWrapper>
            <Wallet>{activeAccountCoin}</Wallet>
            <StatusLabel />
          </AssetWrapper>
        </WalletWapper>
        <SettingsButton>
          <Icon label='IconMore' size='md'>
            <IconMoreHorizontal />
          </Icon>
        </SettingsButton>
      </HeaderWrapper>
      {isSwitchAccountVisible && (
        <SwitchAccount
          balance={balance}
          coins={coins}
          accounts={switchAccounts}
          setIsSwitchAccountVisible={setIsSwitchAccountVisible}
          selectedAccountIndex={selectedAccountIndex}
          setSelectedAccountIndex={setSelectedAccountIndex}
        />
      )}
    </header>
  )
}

export default Header
