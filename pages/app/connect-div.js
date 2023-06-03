import React, { useEffect } from 'react'
import NoSSR from '@/utils/noSSR'
import Head from 'next/head'
import DashboardSidebar from '../../components/Layouts/DashboardSidebar'
import Router from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { getRegisteredAppList } from '@/redux/actions/registeredApp/action'
import WalletIcon from '../../static/images/dashboard/connect-wallet.png'
import AddApplication from '../../components/wallet/add-application'
import appsSelector from '@/redux/selectors/apps'
import WithAuthProtection from '@/hooks/authProtection'

function AddApp() {
  const { data } = useSelector(appsSelector)
  const dispatch = useDispatch()
  useEffect(() => {
    getRegisteredAppList(dispatch)
  }, [])

  const handleAppClick = (item) => () => {
    const route = item ? `/app/connected-app/${item.id}` : '/app/dashboard'
    Router.push(route)
  }

  return (
    <NoSSR>
      <div>
        <DashboardSidebar>
          <>
            <div className="md:flex justify-center height-full items-center wrapper mx-4 mt-5">
              <div className="row mx-0">
                <div className="col-11 ">
                  <div className="row mx-0">
                    <div className="col-12 py-2  addApplication">
                      <div className="row align-items-center justify-content-between">
                        <div className="col-auto">
                          <img src={WalletIcon} />
                        </div>
                        <div className="col-auto">
                          <div
                            className="row mx-0 align-items-center py-3 applicationBtn"
                            onClick={handleAppClick()}
                          >
                            <div className="col addHeading">
                              Add Application
                            </div>
                            <div className="col-auto pl-0">
                              <span className="plusSign">+</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <AddApplication
                    registeredApp={data}
                    handleClick={handleAppClick}
                  />
                </div>
              </div>
              {/* <div className="app-name bg-gray-200" onClick={handleAppClick()}><div><p>+</p> <p> Create new app</p></div></div> */}
              {/* {props.registeredApp.map((item) => <div className="app-name bg-gray-200" onClick={handleAppClick(item)}>{item.name}</div>)} */}
            </div>
          </>
        </DashboardSidebar>
      </div>
      <Head>
        <title>Dashboard</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=0.9 ,maximum-scale=1.0, 
    user-scalable=0"
        />
      </Head>
      <style jsx>
        {`
          .addApplication {
            background: #0075ff;
            border-radius: 16px;
          }
          .applicationBtn {
            background: #ffffff;
            border-radius: 12px;
            cursor: pointer;
          }
          .plusSign {
            background: #0075ff;
            opacity: 0.4;
            padding: 0px 6px 6px;
            border-radius: 5px;
            color: white;
          }
          .addHeading {
            color: #0075ff;
            text-transform: uppercase;
            font-size: 14px;
            font-weight: bold;
          }
        `}
      </style>
    </NoSSR>
  )
}

export default WithAuthProtection(AddApp)
