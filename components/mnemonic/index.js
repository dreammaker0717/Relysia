import React, { useEffect, useState } from 'react'
import { Dialog, Divider, Slide } from '@material-ui/core'
import styles from './index.module.css'
import MaterialUiCustomButtom from 'components/common/materialUi-button'
import Loader from '../loader'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

function Index({ open, handleClose, mnemonics }) {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
      classes={{
        paper: `relative py-10 px-10 flex flex-col items-center max-h-[600px] 
                mb-[100px] md:mb-0 mt-[64px] md:mt-0 rounded-[26px]`,
      }}
      fullWidth
      maxWidth="sm"
    >
      {mnemonics.length ? (
        <>
          <div className={styles['mnemonic-header']}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
              />
            </svg>

            <h1 className={styles.title}>Mnemonic Phrase</h1>
          </div>
          <div className="w-full flex flex-row justify-between mt-7">
            {mnemonics.length &&
              mnemonics.slice(0, 4).map((word) => (
                <div className={styles['w-24-custom']} key={word}>
                  <div className={styles['box-bg']}>
                    <p className={styles['box-text']}>{word}</p>
                  </div>
                </div>
              ))}
          </div>
          <div className="w-full flex flex-row justify-between mt-3">
            {mnemonics.length &&
              mnemonics.slice(4, 8).map((word) => (
                <div className={styles['w-24-custom']} key={word}>
                  <div className={styles['box-bg']}>
                    <p className={styles['box-text']}>{word}</p>
                  </div>
                </div>
              ))}
          </div>
          <div className="w-full flex flex-row justify-between mt-3">
            {mnemonics.length &&
              mnemonics.slice(8, 12).map((word) => (
                <div className={styles['w-24-custom']} key={word}>
                  <div className={styles['box-bg']}>
                    <p className={styles['box-text']}>{word}</p>
                  </div>
                </div>
              ))}
          </div>
          <div className="flex flex-row w-full justify-center mt-5">
            <div className=" w-1/5">
              <Divider />
            </div>
          </div>
          <div className="w-full flex flex-row justify-center mt-8">
            <p className=" text-gray-700 w-5/5 text-center">
              Relysia is self-custodial. Please write down your mnemonic (the
              words given above), and keep it confidential to be able to recover
              your funds
            </p>
          </div>
          <div className="w-full flex flex-row justify-center mt-6">
            <MaterialUiCustomButtom
              borderRadius={22}
              onClick={handleClose}
              label="I already backed it up!"
            />
          </div>
        </>
      ) : (
        <Loader />
      )}
    </Dialog>
  )
}

export default Index
