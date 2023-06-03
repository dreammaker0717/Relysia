import DashboardLayout from 'pages/dashboard/[id]/DashboadLayout'
import { useMemo, useState } from 'react'
import Switch from 'react-switch'
import Setting from 'pages/dashboard/[id]/Setting'
import styles from 'pages/dashboard/[id]/index.module.css'
const bgHighlight = styles['bg-highlight']
const label = 'uppercase font-bold text-sm'


function ToggleSection({title, subtext, img, enabled, onToggle}){
  const bgHighlight = styles['bg-highlight']

  return <div className={`${bgHighlight} flex justify-between items-center rounded-lg p-4 `}>
    <div className='flex'>
      <div className='bg-white rounded h-10 w-10 mr-4'>
        {img && <img src={img} /> }
      </div>
      <div>
        <div className={`${label}`}>{title}</div>
        <div className='text-sm font-semibold opacity-50'>{subtext}</div>
      </div>
    </div>
    <Switch checked={enabled} onChange={() => onToggle(title)} checkedIcon={false} uncheckedIcon={false} onColor='#0075FF' offColor='#DFE5EC' height={24} width={48} handleDiameter={16}/>
  </div>
}

function CopySection({title, text}){
  const bgHighlight = styles['bg-highlight']

  return <div>
    <div className='font-bold uppercase mb-2'>{title}</div>
          <div className={`${bgHighlight} flex justify-between items-center rounded-lg p-4 `}>
            <div className='text-sm font-semibold opacity-50'>{text}</div>
            <img src='/assets/images/copy.svg' />
          </div>
        </div>
}

function SectionTitle({title, img}){
  const bgHighlight = styles['bg-highlight']

  return <div className={`${bgHighlight} flex items-center rounded-lg p-4 `}>
      <div className='flex justify-center items-center bg-blue-600 rounded-full h-10 w-10 mr-4'>
        {img && <img src={img} /> }
      </div>
      <div className='uppercase text-sm font-bold text-blue-600'>{title}</div>
  </div>
}

function Section({title, text}){
  return <div>
    <div className={`${label} mb-4`}>{title}</div>
    <div>{text}</div>
  </div>
}


export default function (){
  const [enabled, setEnabled] = useState(true)
  const [settings, setSettings] = useState([
    {title: 'Classical', subtext: 'Let users pay for transaction fees with BSV', img: '/assets/images/money-send.svg', enabled: true},
    {title: 'Miner', subtext: 'User a miner api to cover your costs (e.g TAAL)', img: '/assets/images/bitcoin-card.svg', enabled: true},
    {title: 'Dynamic', subtext: 'Cover the costs of your users to a certain limit (Fee Manager)', img: '/assets/images/setting-3.svg', enabled: true},
  ])

  function handleToggle(title){
    const temp = [...settings]
    const index = temp.findIndex(setting => setting.title === title)
    if(index < 0) return
    temp[index].enabled = !temp[index].enabled
    setSettings(temp)
  }

  return <DashboardLayout>
   <ToggleSection enabled={enabled} onToggle={() => setEnabled(!enabled)} title='Frost Wallet' subtext='Development'/>
   <div className='flex w-full gap-16 my-8 flex-col sm:flex-row'>
     <div className='flex-1'>
       <CopySection title='Secret ID'  text='sdjafdksjfal' />
     </div>
     <div className='flex-1'>
       <CopySection title='Secret ID'  text='sdjafdksjfal' />
     </div>
   </div>

    <div className='flex gap-16 flex-col sm:flex-row'>
      <div className='flex flex-1 flex-col gap-8'>
        <SectionTitle title='App Details' img='/assets/images/mobile.svg' />
        <Section title='App Name' text='FROST WALLET APP' />
        <Section title='Email' text='frost@wallet.app' />
        <Section title='Publisher' text='Development' />
        <Section title='Description' text='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' />
      </div>
      <div className='flex flex-1 flex-col gap-8'>
        <SectionTitle title='Redirection URLs' img='/assets/images/send-square-2.svg' />
        <Section title='Authorize Origin URL' text='frost@wallet.app' />
        <Section title='URL Decline Redirect' text='frost@wallet.app' />

        <SectionTitle title='App Permissions' img='/assets/images/security-safe.svg'/>
        {settings.map(setting => <Setting {...setting} onToggle={handleToggle} />)}
      </div>
    </div>
  </DashboardLayout>
}