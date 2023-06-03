import DashboardLayout from 'pages/dashboard/[id]/DashboadLayout'
import styles from 'pages/dashboard/[id]/index.module.css'
import dynamic from 'next/dynamic'
import { useState } from 'react'


const ResponsivePie = dynamic(() =>
  import('@nivo/pie').then((mod) => mod.ResponsivePie),
  {
    ssr:false
  }
)
const ResponsiveLine = dynamic(() =>
    import('@nivo/line').then((mod) => mod.ResponsiveLine),
  {
    ssr:false
  }
)


function Pie({data}){
  return <div className='flex flex-col flex-1 w-full h-full items-center shadow-lg rounded-lg p-8 h-96'>
    <div className='mb-8 font-bold'>Wallet Created</div>
    <ResponsivePie data={data} innerRadius={0.85} enableArcLinkLabels={false} enableArcLabels={false} margin={{right: 20, left: 20, bottom: 60}}
       arcLabelsTextColor='white'
      colors={{ scheme: 'set1' }}
      legends={[
       {
         anchor: 'bottom',
         direction: 'row',
         itemWidth: 80,
         itemHeight: 0,
         translateY: 30,
         itemTextColor: '#999',
         itemDirection: 'left-to-right',
         symbolShape: 'circle',
       }
      ]}
    />
  </div>
}

function Line({data}){
  return <div className='flex flex-col w-full h-full items-start shadow-lg rounded-lg pt-8 h-96' >
    <div className='mb-8 ml-8 font-bold'>API Calls</div>
    <ResponsiveLine
      data={data}
      curve="cardinal"
      enableGridX={false}
      margin={{left: 60, right: 40, bottom: 40}}
      colors={{ scheme: 'category10' }}
      axisLeft={{
        orient: 'left',
        tickSize: 4,
        tickPadding: 5,
        legend: 'API Calls',
        legendOffset: -40,
        legendPosition: 'middle'
      }}
    />
  </div>
}

export default function (){
  const [wallet, setWallet] = useState([{id: 'Standard', value: 9}, {id: 'Escrow', value: 3}, {id: 'Secure', value: 5}, {id: 'Shared', value: 1}])
  const apiCalls = [
    {
      id: "1",
      data: Array(10).fill(0).map((item, i) => ({x: i, y: Math.random()}))
    }
    ]

  const bgGradient = styles['bg-gradient']
  return <DashboardLayout>
    <div className='flex flex-col flex-1 gap-8'>
      <div className='flex flex-col xl:flex-row gap-8'>
        <div className='flex flex-1 h-96'>
          <Pie data={wallet} />
        </div>
        <div className='flex flex-1 h-96'>
          <Pie data={wallet} />
        </div>
        <div className='flex flex-1 h-96'>
          <Pie data={wallet} />
        </div>
      </div>
      <div className='flex flex-col lg:flex-row gap-8'>
        <div className='flex flex-1 h-96'>
          <Line data={apiCalls} />
        </div>
        <div className='flex flex-1 h-96'>
          <Line data={apiCalls} />
        </div>
      </div>
    </div>

  </DashboardLayout>
}