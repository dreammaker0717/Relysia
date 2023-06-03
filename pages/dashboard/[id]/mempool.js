import DashboardLayout from 'pages/dashboard/[id]/DashboadLayout'
import styles from 'pages/dashboard/[id]/index.module.css'
import Cube from 'components/icons/dashboard/Cube'
import {Tooltip} from 'antd'

function Status({status}){
  const colors = {
    mined: "#8BC34A",
    pending: "#F9A825",
    closed: "#FF1744",
  }

  const color = colors[status] || 'blue'

  return <div className='flex items-center rounded-full p-1 pr-2 w-24 uppercase' style={{color, borderColor: color, borderWidth: 1}}>
    <div className='w-4 h-4 mr-2 rounded-full' style={{backgroundColor: color}} />
    <div className='text-xs'>{status}</div>
  </div>
}

export default function (){
  const bgGradient = styles['bg-gradient']
  const columns = ['Broadcast time', 'Hash', 'Status', 'App', 'Memtime', 'Nonce', 'Fee', 'Block No.', 'To Address', 'Value']
  const statuses = ['mined', 'pending', 'closed']
  return <DashboardLayout>
    <div className='mb-8'>
      <h1 className='text-black text-4xl'>Mempool Watcher</h1>
      <h2 className='text-black text-lg font-light'>View the real-time state of transactions in the Mempool in order to identify delayed, stuck or dropped transactions.</h2>
    </div>

    <div className='overflow-scroll'>
    <table className='w-full overflow-scroll'>
      <thead className={`${bgGradient} text-white rounded overflow-hidden`}>
        <tr>
          {columns.map(column => <th className='py-4 font-light text-sm first:rounded-l-lg last:rounded-r-lg'>{column}</th>
          )}
        </tr>
      </thead>
      <tbody className='text-sm text-[#666F99]'>
      {
        Array(12).fill(0).map((_, i) => <tr className='even:bg-blue-50'>
          <td className='text-center rounded-l-lg p-4'>Mon, 12 Mar, 2022</td>
          <td className='text-center p-4'>
            <Tooltip title="View on chain" placement='top' overlayStyle={{borderRadius: 10}}>
            <a href='pages/dashboard/[id]/mempool#' className='text-blue-400 hover:underline'>0x4b7c938fc535</a>
            </Tooltip>
          </td>
          <td className='text-center p-4'><Status status={statuses[i % 3]} /> </td>
          <td className='flex items-center text-center p-4 gap-1'><Cube stroke='#0075FF' />Frost Wallet</td>
          <td className='text-center p-4'>00:00:6</td>
          <td className='text-center p-4'>5596439</td>
          <td className='text-center p-4'>50 sats</td>
          <td className='text-center p-4'>9855359</td>
          <td className='text-center p-4'>0x4b7c938fc535</td>
          <td className='text-center rounded-r-lg p-4'>0</td>
        </tr>)
      }
      </tbody>
    </table>
    </div>
  </DashboardLayout>
}