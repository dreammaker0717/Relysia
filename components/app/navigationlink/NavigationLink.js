import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const NavigationLink = ({data}) => {
  const router = useRouter()

  return (
    <Link scroll={false} href={data.href}>
        <div className="sidebarCardContainerGrid">
            <div className={`sidebarCardGrid  `}>
                {React.cloneElement(data.icon, { activeState: router.pathname.includes(data.condition) ? true : false })}
            </div>
            <div className="sidebarCardText">{data.text}</div>
        </div>
    </Link>
  )
}

export default NavigationLink