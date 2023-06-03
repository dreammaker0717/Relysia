import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import UpdateProfile from './updateProfile'
import GeneralSettings from './General'
import ManagePlanSettings from './ManagePlan'
import UpdatePassword from './updatePassword'
import UpdateEmail from './updateEmail'
import UpdatePaymail from './updatePaymail'
import UpdatePhone from './updatePhone'
import DeleteAccount from './DeleteAccount'
import VerticalTabsWithPages from '../common/VerticalTabswithPages/verticalTabswithPage'
import walletSelector from '@/redux/selectors/wallet'
import authSelector from '@/redux/selectors/auth'

function SettingsPage(props) {
  const { userData } = useSelector(authSelector)
  const [currentWallet, setCurrentWallet] = useState(null)
  const { currentWalletId, walletData } = useSelector(walletSelector)
  const data = [
    {
      name: 'Update Profile & username',
      component: <UpdateProfile userData={userData} />,
      icon: '/images/settings/profile.svg',
    },
    {
      name: 'Update Email',
      component: <UpdateEmail userData={userData} />,
      icon: '/images/settings/email.svg',
    },
    {
      name: 'Update Paymail',
      component: <UpdatePaymail userData={userData} />,
      icon: '/images/settings/paymail.svg',
    },
    {
      name: 'Update Password',
      component: <UpdatePassword userData={userData} />,
      icon: '/images/settings/password.svg',
    },
    {
      name: '2-Factor Authentication',
      component: <UpdatePhone userData={userData} />,
      icon: '/images/settings/phone.svg',
    },
    {
      name: 'Wallet Settings',
      component: (
        <GeneralSettings
          walletData={props.walletData && props.walletData}
          setwalletData={props.setwalletData}
          userDataRedux={userData}
          currentWallet={currentWallet}
        />
      ),
      icon: '/images/settings/wallet.svg',
    },
    {
      name: 'Manage Your Plan',
      component: <ManagePlanSettings userData={userData} />,
      icon: '/images/settings/email.svg',
    },
    {
      name: 'Delete Account',
      component: <DeleteAccount />,
      icon: '/images/settings/delete.svg',
    },
  ]

  useEffect(() => {
    const currentW =
      walletData && currentWalletId
        ? Object.values(walletData)?.find(
            (wallet) => wallet.walletID === currentWalletId,
          )
        : undefined
    setCurrentWallet(currentW)
  }, [walletData, currentWalletId])

  return (
    <div className="mt-8 px-12">
      <VerticalTabsWithPages data={data} title="Settings" />
    </div>
  )
}

export default SettingsPage
