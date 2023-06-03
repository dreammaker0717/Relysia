import { Button, useMediaQuery } from '@material-ui/core'
import { Divider } from 'antd'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/solid'
const MaterialUiCustomButtom = dynamic(() => import('../materialUi-button'))

import { toast } from 'react-toastify'
import Image from 'next/image'
import dynamic from 'next/dynamic'
export default function StepsPagesComponent(props) {
  const [steps, setSteps] = useState(0)
  const isLarge = useMediaQuery('(min-width:1280px)')
  const isMobile = useMediaQuery('(max-width:700px)')

  function backStep() {
    if (steps !== 0) {
      if (props.data[steps].backFunction) {
        props.data[steps].backFunction()
      }
      setSteps(steps - 1)
    }
  }

  function nextStep(event) {
    if (event) {
      event.preventDefault()
    }
    if (props.data[steps].validateFunction) {
      const isValid = props.data[steps].validateFunction()
      if (!isValid) {
        return
      }
    }
    if (steps < props.data.length - 1) {
      if (props.data[steps].nextFunction) {
        props.data[steps].nextFunction()
      }
      if (steps == 1 && props.name == '') {
        toast.error('Please enter wallet name', {
          position: 'bottom-left',
          autoClose: 10000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        })
      } else {
        setSteps(steps + 1)
      }
    } else {
      props.submitAction()
    }
  }
  // function getMobileorDesk(index) {
  //   if (!isMobile) {
  //     return true
  //   } else {
  //     if (index === steps) return true
  //   }
  // }
  return (
    <div className="w-full">
      <div className="grid fontSofiaPro grid-cols-1  lg:grid-cols-1 xl:grid-cols-12  auto-rows-auto mt-5  w-full">
        <div
          className="flex flex-row justify-between col-span-1   md:col-span-8 lg:col-span-8  xl:col-span-8  px-4 "
        //  style={{ width: props.stepsWidth ? `${props.stepsWidth}` : '70%' }}
        >
          {props.data &&
            props.data.map((stepData, index) => (
              <>
                {!isMobile && index > 0 && (
                  <Divider
                    type="vetical"
                    style={{
                      height: 36,
                      borderRight: '1px solid rgba(76, 73, 109, 0.08)',
                      marginRight: 15,
                    }}
                    key={`divider-${index}`}
                  />
                )}
                {(!isMobile || index === steps) && (
                  <div
                    className={`flex flex-row ${steps !== index
                      ? 'filter grayscale flex-grow-0 '
                      : 'flex-grow '
                      } py-3 fontSofiaPro transition-all duration-200 ease-in-out`}
                  >
                    <Image
                      width={49}
                      height={48}
                      alt={stepData.name}
                      key={`imgg-${index}`}
                      src={stepData.icon}
                    />
                    <div
                      key={`texttt-${index}`}
                      className="steps-textmint"
                      style={{
                        marginInline: 16,
                        width:
                          steps === index
                            ? stepData.description.length * 15
                            : isMobile
                              ? stepData.description.length * 10
                              : 0,
                      }}
                    >
                      <div className="text-blue-600 ">
                        {stepData.description}
                      </div>
                      <div className="font-bold">{stepData.name}</div>
                    </div>
                  </div>
                )}
              </>
            ))}
        </div>
      </div>

      <div className="grid fontSofiaPro grid-cols-1 xl:grid-cols-12  auto-rows-auto mt-5 w-full mb-[15vh] md:mb-[2vh] ">
        <div className=" col-span-1  md:col-span-8 px-4 ">
          {props.data.map(
            (tabPanel, index) => (
              //   steps === index && (
              <TabPanel value={steps} index={index}>
                <form onSubmit={nextStep}>
                  {React.cloneElement(tabPanel.component, {
                    forceNextStep: nextStep,
                  })}
                  {!tabPanel.hideActionBottums && (
                    <div
                      key={`${index}-buttomsdownbackforth`}
                      className="w-full grid grid-cols-1  lg:grid-cols-4 mt-12 px-1"
                    >
                      <div className="col-span-1 my-[13px]">
                        {' '}
                        {steps !== 0 && (
                          <MaterialUiCustomButtom
                            label="Back"
                            onClick={backStep}
                            background="rgba(255, 204, 208, 0.3)"
                            color="rgba(255, 145, 153, 1)"
                            leftIcon={<ChevronLeftIcon className="h-6 w-6 " />}
                            disabled={props.loading}
                          />
                        )}
                      </div>
                      <div className="col-span-2"></div>
                      <div className="col-span-1 my-[13px]">
                        <MaterialUiCustomButtom
                          label={
                            steps === props.data.length - 1 ? 'submit' : 'Next'
                          }
                          type="submit"
                          loading={props.loading}
                          disabled={props.loading}
                          rightIcon={<ChevronRightIcon className="h-6 w-6 " />}
                        />
                      </div>
                    </div>
                  )}
                </form>
              </TabPanel>
            ),
            //   ),
          )}
        </div>
      </div>
    </div>
  )
}
function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      // hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      key={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      style={{
        height: value !== index && 0,
        overflow: 'hidden',
        opacity: value === index ? '1' : '0',
        transition: 'opacity 0.3s ease-in-out',
      }}
    >
      <div>{children}</div>
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
}
