import styles from './index.module.css'

const Loader = () => {
  return (
    <div className={styles.loader}>
      <svg className={styles.spinner} viewBox="0 0 120 120">
        <circle
          className={styles.path1}
          cx="60"
          cy="60"
          r="50"
          fill="none"
          strokeWidth="8"
        ></circle>
        <circle
          className={styles.path}
          cx="60"
          cy="60"
          r="50"
          fill="none"
          strokeWidth="8"
        ></circle>
      </svg>
    </div>
  )
}

export default Loader
