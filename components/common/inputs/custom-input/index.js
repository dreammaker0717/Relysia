import styles from './index.module.css'
import PropTypes from 'prop-types'
import { twMerge } from 'tailwind-merge'

const CustomInput = ({
  icon,
  inputType,
  forId,
  label,
  customStyle,
  ...props
}) => {
  const renderInput = () => {
    if (inputType === 'checkbox') {
      return (
        <div className={twMerge(styles.wrapperCh, customStyle)}>
          <input
            id={forId}
            type={inputType}
            className={styles.checkbox}
            {...props}
          />
          <label className={styles.label} htmlFor={forId}>
            {label}
          </label>
        </div>
      )
    }

    return (
      <div className={styles.wrapper}>
        <img src={icon} alt="input-icon" className={styles.icon} />
        <input type={inputType} className={styles.input} {...props} />
      </div>
    )
  }

  return renderInput()
}

CustomInput.propTypes = {
  inputType: PropTypes.string.isRequired,
  // icon: PropTypes.string,
  forId: PropTypes.string,
  label: PropTypes.string,
}

CustomInput.defaultProps = {
  inputType: 'text',
}

export default CustomInput
