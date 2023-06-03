import React from 'react'
import styles from './footerlink.module.css'
import Link from 'next/link'

const FooterLink = ({data,pathname}) => {
  return (
    <div className={styles.column}>
    <div>
      <h1
        style={{
          letterSpacing: '-0.32px',
          marginBottom: '1.5rem',
          color: pathname.includes('app/') ? 'black' : 'white',
          fontSize: "1.5rem",
          lineHeight: "1.5rem"
        }}
      >
        {data?.heading}
      </h1>
      <ul>
      {data?.sub_menu?.map(sublinks=>(
        <li className={styles.linkItem}>
          <Link href={sublinks?.href}>
            <a>{sublinks.nav_title}</a>
          </Link>
        </li>

      ))}
      </ul>
    </div>
  </div>
  )
}

export default FooterLink