import { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from 'pages/dashboard/[id]/index.module.css'
import { useRouter } from 'next/router'
import {
  XMarkIcon,
  Bars3Icon,
  ChevronDownIcon,
} from '@heroicons/react/24/solid'
import MonitorMobile from '../../../components/icons/dashboard/MonitorMobile'
import DocumentCode from '../../../components/icons/dashboard/DocumentCode'
import SquareSend from '../../../components/icons/dashboard/SquareSend'
import DollarSquare from '../../../components/icons/dashboard/DollarSquare'
import DocumentFilter from '../../../components/icons/dashboard/DocumentFilter'
import PricingTableModal from '../../../components/pricing/PricingTableModal'

function SidebarItem({ title, link, Icon }) {
  const [selected, setSelected] = useState(false)
  const { pathname, query } = useRouter()
  useEffect(() => {
    const selected = pathname.includes(link)
    setSelected(selected)
  }, [pathname])
  return (
    <Link href={`/dashboard/${query.id}/${link}`}>
      <a
        className={`flex justify-between items-center px-6 py-4 rounded ${
          selected ? 'bg-blue-50 text-blue-500 border-l-2 border-blue-600' : ''
        }`}
      >
        <div className="flex">
          <div className="mr-4">
            {Icon ? (
              <Icon
                stroke={selected ? '#0075FF' : '#666F99'}
                fill={selected ? '#e2ecff' : undefined}
              />
            ) : null}
          </div>
          <div>{title}</div>
        </div>
        <div>
          <ChevronDownIcon className="w-6 h-6" />
        </div>
      </a>
    </Link>
  )
}

function Sidebar() {
  const items = [
    { title: 'Project', link: 'project', icon: DocumentCode },
    { title: 'Service Health', link: 'service-health', icon: SquareSend },
    { title: 'Fee Manager', link: 'fee-manager', icon: DocumentFilter },
    { title: 'Settings', link: 'settings', icon: DollarSquare },
  ]

  return (
    <div className="w-96 p-3 text-black">
      {items.map(({ title, link, icon }) => (
        <SidebarItem title={title} link={link} Icon={icon} />
      ))}
    </div>
  )
}

export default function ({ children }) {
  const [isProduction, setIsProduction] = useState(false)
  const [isSideBarOpen, setIsSideBarOpen] = useState(false)
  const [showPricingTableModal, setShowPricingTableModal] = useState(false)

  function toggleSidebar() {
    setIsSideBarOpen(!isSideBarOpen)
  }

  return (
    <div className="flex text-[#666F99] bg-white">
      <div
        className={`flex flex-col items-center h-screen bg-white border-r-2 border-gray-200 absolute transition-all z-20 lg:static ${
          isSideBarOpen ? '' : 'right-full'
        }`}
      >
        <div
          onClick={toggleSidebar}
          className="absolute right-0 top-8 translate-x-10 text-2xl lg:hidden"
        >
          {isSideBarOpen ? (
            <XMarkIcon className="w-6 h-6" />
          ) : (
            <Bars3Icon className="w-6 h-6" />
          )}
        </div>

        <Sidebar />
        <button
          className={`${styles['bg-gradient']} px-4 py-2 rounded-full text-white max-auto`}
          onClick={() => setShowPricingTableModal(true)}
        >
          Switch Plan
        </button>
        <PricingTableModal
          open={showPricingTableModal}
          onClose={() => setShowPricingTableModal(false)}
          maxWidth="lg"
          fullWidth={true}
        />
      </div>
      <div className="p-8 pt-16 lg:pt-0 text-black w-full">{children}</div>
    </div>
  )
}
