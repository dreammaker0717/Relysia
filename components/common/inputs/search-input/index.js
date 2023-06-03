import { useEffect, useState } from 'react'
import styles from './index.module.css'
import Button from '../../button'
import cn from 'classnames'

const SearchInput = ({ classNames, ...props }) => {
  const [search, setSearch] = useState('')
  return (
    <div className={cn(styles.wrapper, classNames)}>
      <div className="flex flex-row items-center flex-1">
        <input
          type="text"
          className={styles.input}
          name="search"
          value={search}
          onChange={({ target }) => setSearch(target.value)}
          {...props}
        />
        <span className={`${styles.focusWrapper} ml-2`}>
          <label className={styles.label} htmlFor={props.id}></label>
          <svg
            width="17"
            height="17"
            viewBox="0 0 17 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.svg}
          >
            <path
              d="M14.758 15.114l-4.23-4.23M6.758 12.447a5.333 5.333 0 100-10.666 5.333 5.333 0 000 10.666z"
              stroke="#4c496d"
              strokeWidth="2"
              strokeMiterlimit="10"
              strokeLinecap="square"
            />
          </svg>
        </span>
      </div>

      <span className={styles.btn}>
        <Button type="submit" appearance="primary">
          Search
        </Button>
      </span>
    </div>
  )
}

export default SearchInput
