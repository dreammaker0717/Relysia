import DashboardLayout from 'pages/dashboard/[id]/DashboadLayout'
import styles from 'pages/dashboard/[id]/index.module.css'
import Link from 'next/link'
import Switch from "react-switch";
import { useState } from 'react'


function App({title, img, enabled, onToggle}){
  const bgHighlight = styles['bg-highlight']

  return <div className={`${bgHighlight} flex justify-between items-center rounded-lg p-4 `}>
    <Link href='/dashboard/[id]/apps-manager/app'>
          <a className='flex hover:text-blue-600'>
            <div className='bg-white rounded h-10 w-10 mr-4'>
              {img && <img src={img} /> }
            </div>
            <div>
              <div className='uppercase text-sm font-bold'>{title}</div>
              <div className='text-sm font-semibold opacity-50'>Type of connection</div>
            </div>
          </a>
    </Link>
          <Switch checked={enabled} onChange={() => onToggle(title)} checkedIcon={false} uncheckedIcon={false} onColor='#0075FF' offColor='#DFE5EC' height={24} width={48} handleDiameter={16}/>
        </div>
}

export default function (){
  const [apps, setApps] = useState([
    {title: 'Frost Wallet App', enabled: false},
    {title: 'Rocket Wallet', enabled: false},
    {title: 'Cloudpaper', enabled: false},
    {title: 'Dompetku', enabled: false},
    {title: 'MonkeyWallet', enabled: false},
    {title: 'WinterCrypto', enabled: false},

  ])
  const bgHighlight = styles['bg-highlight']


  function handleToggle(title){
    const temp = [...apps]
    const index = temp.findIndex(app => app.title === title)
    if(index < 0) return
    temp[index].enabled = !temp[index].enabled
    setApps(temp)
  }

  return <DashboardLayout>
    <div className='flex justify-end w-full p-6 bg-blue-600 rounded-lg '>
      <Link href='/dashboard/[id]/apps-manager/add'>
      <a className='flex justify-center items-center px-4 py-2 pr-2 bg-white rounded-lg text-blue-600 text-base font-bold'>
        ADD APPLICATION <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className='ml-2'>
        <path opacity="0.4" d="M21.588 2.66675H10.4146C5.5613 2.66675 2.66797 5.56008 2.66797 10.4134V21.5734C2.66797 26.4401 5.5613 29.3334 10.4146 29.3334H21.5746C26.428 29.3334 29.3213 26.4401 29.3213 21.5867V10.4134C29.3346 5.56008 26.4413 2.66675 21.588 2.66675Z" fill="#0075FF"/>
        <path d="M24 15H17V8C17 7.45333 16.5467 7 16 7C15.4533 7 15 7.45333 15 8V15H8C7.45333 15 7 15.4533 7 16C7 16.5467 7.45333 17 8 17H15V24C15 24.5467 15.4533 25 16 25C16.5467 25 17 24.5467 17 24V17H24C24.5467 17 25 16.5467 25 16C25 15.4533 24.5467 15 24 15Z" fill="#0075FF"/>
      </svg>
      </a>
      </Link>
    </div>

    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl-grid-cols-4 mt-16 gap-4'>
      {
        apps.map(({title, enabled}) => <App title={title} enabled={enabled} onToggle={handleToggle} /> )
      }
    </div>
  </DashboardLayout>
}