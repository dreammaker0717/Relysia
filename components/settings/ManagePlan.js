import React, { useState, useEffect } from 'react'
import { getMnemonicfromApi } from '../../axios-connect/wallet'
import MaterialUiCustomButtom from '../common/materialUi-button'
import { Divider } from 'antd'
import { IconButton } from '@material-ui/core'
import CopyToClipboard from 'react-copy-to-clipboard'
import { toast } from 'react-toastify'
import { firebaseDB } from '@/config/init'
import {
  doc,
  getDoc,
  query,
  getDocs,
  addDoc,
  onSnapshot,
  collection,
  where,
} from 'firebase/firestore'
import PricingTableModal from 'components/pricing/PricingTableModal'
import moment from 'moment'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { httpsCallable } from 'firebase/functions'
import { firebaseFunctions } from '@/config/init'

function ManagePlanSettings(props) {
  const [userPlan, setuserPlan] = useState('free')
  const [loadingUserPlan, setloadingUserPlan] = useState(true)
  const [userPlanData, setuserPlanData] = useState(null)
  const [pricingPlanModalOpen, setPricingPlanModalOpen] = useState(false)
  const [invoices, setinvoices] = useState(null)

  useEffect(() => {
    if (props.userData && props.userData.uid) {
      getUserSubscription(props.userData.uid)
      getInvoices(props.userData.uid)
    }
  }, [props.userData])

  const getInvoices = async (uid) => {
    let lInvoicesArr = []
    const q = query(collection(firebaseDB, 'customers', uid, 'payments'))

    const querySnapshot1 = await getDocs(q)
    querySnapshot1.forEach((doc) => {
      if (doc.data()) {
        lInvoicesArr.push({ ...doc.data(), id: doc.id })
      }
    })
    setinvoices(lInvoicesArr)
  }

  const getUserSubscription = async (uid) => {
    try {
      setloadingUserPlan(true)
      let subscriptionsArr = []
      const q = query(
        collection(firebaseDB, 'customers', uid, 'subscriptions'),
        where('status', '==', 'active'),
      )

      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        if (doc.data()?.role) {
          subscriptionsArr.push({ ...doc.data(), id: doc.id })
        }
      })

      if (subscriptionsArr && subscriptionsArr[0] && subscriptionsArr[0].role) {
        setuserPlan(subscriptionsArr[0].role)
        setuserPlanData(subscriptionsArr[0])
      }
      setloadingUserPlan(false)
    } catch (err) {
      setloadingUserPlan(false)
    }
  }

  const sendToCustomerPortal = async () => {
    try {
      const funcRef = httpsCallable(
        firebaseFunctions,
        'ext-firestore-stripe-subscriptions-createPortalLink',
      )
      let funcRes = await funcRef({
        returnUrl: window.location.origin,
      })
    } catch (err) {
      console.log('err', err)
    }
  }

  return (
    <>
      <div
        className={`animate__animated transition-all duration-300 ease-in-out	 fontSofiaPro w-full flex flex-col pr-2 pl-2  md:pr-10 md:pl-6`}
      >
        <h5>MANAGE PLAN</h5>
        <h5 className="text-sm	opacity-50	">Update your plan</h5>

        <Divider />
        {!loadingUserPlan && (
          <>
            <h6>Current plan</h6>
            <p className="	opacity-80	">
              {userPlan ? userPlan.toUpperCase() : '-'}
            </p>

            {!userPlanData && (
              <div className="mt-6">
                <MaterialUiCustomButtom
                  label="View Plans"
                  disablefullWidth={true}
                  onClick={() => setPricingPlanModalOpen(true)}
                />
              </div>
            )}

            {userPlanData && (
              <>
                <div className="w-full mt-6">
                  <h6>Subscription date</h6>
                  <p className="opacity-80	">
                    {moment(
                      moment.duration({
                        seconds: userPlanData.created.seconds,
                      }),
                    ).format('DD MMM YYYY')}
                  </p>
                </div>

                <div className="w-full mt-6">
                  <h6>Invoices</h6>

                  <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell className="font-bold">DATE</TableCell>
                          <TableCell className="font-bold">
                            INVOICE NUMBER
                          </TableCell>
                          {/* <TableCell className="font-bold">Amount</TableCell> */}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {invoices &&
                          invoices.map((row, indx) => (
                            <TableRow key={'invoice' + indx}>
                              <TableCell component="th" scope="row">
                                {moment(
                                  moment.duration({ seconds: row.created }),
                                ).format('DD MMM YYYY')}
                              </TableCell>
                              <TableCell>
                                {row.invoice.slice(0, 15)}...
                              </TableCell>
                              {/* <TableCell>
                                {row.currency.toUpperCase()} {row.amount}
                              </TableCell> */}
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>

                <div className="mt-6">
                  <MaterialUiCustomButtom
                    label="Cancel subscription"
                    disablefullWidth={true}
                    onClick={sendToCustomerPortal}
                  />
                </div>
              </>
            )}
          </>
        )}
      </div>

      <PricingTableModal
        open={pricingPlanModalOpen}
        onClose={() => setPricingPlanModalOpen(false)}
        maxWidth="lg"
        fullWidth={true}
      />
    </>
  )
}

export default ManagePlanSettings
