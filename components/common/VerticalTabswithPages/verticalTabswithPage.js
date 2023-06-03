import { useMediaQuery, ButtonBase } from '@material-ui/core'
import { MuiThemeProvider } from '@material-ui/core'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { ChevronRightIcon } from '@heroicons/react/24/solid'
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  makeStyles,
} from '@material-ui/core'
import 'animate.css'

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      id={`vertical-tabpanel-${value}`}
      key={`vertical-tabpanel-${value}`}
      aria-labelledby={`vertical-tab-${value}`}
      {...other}
      style={{
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

function VerticalTabsWithPages({ data, title }) {
  const isMobile = useMediaQuery('(max-width:700px)')
  const router = useRouter()
  const { current } = router.query
  const useStyles = makeStyles((theme) => ({
    elevation: {
      boxShadow: 'none',
    },
    accordionRoot: {
      boxShadow: 'none',
      '&.MuiPaper-elevation1': {
        boxShadow: 'none',
      },
      '&.MuiPaper-elevation0': {
        boxShadow: 'none',
      },
    },
    summaryRoot: {
      boxShadow: 'none',
      padding: '0px 0px',
      '&.MuiPaper-elevation1 ': {
        boxShadow: 'none',
      },
      '&.Mui-expanded': {
        maxHeight: isMobile && 40,
      },
    },
    summarycontent: {
      margin: '0px 0px',
    },
    buttonRoot: {
      padding: '20px 12px',

      position: 'relative',
      minWidth: '100%',
      minHeight: '100%',
    },
    roottab: {
      flexGrow: 1,
    },
    padding: {
      padding: theme.spacing(3),
    },
    antCustomStyle: {
      backgroundColor: theme.palette.background.paper,
    },
    tabs: {
      width: '100%',
      minHeight: '100%',
      position: 'relative',
      maxWidth: !isMobile ? '100%' : '100%',
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'nowrap',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  }))
  const classes = useStyles()
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!isMobile && !value) {
      setValue(0)
    }
  }, [value, isMobile])

  const handleAccChange = (panel) => () => {
    if (panel === value) {
      if (isMobile) {
        return setValue(false)
      } else {
        return
      }
    }
    router.push(`/app/settings?current=${panel}`)
  }

  useEffect(() => {
    if (current) {
      setValue(current)
    }
  }, [current])

  return (
    <MuiThemeProvider>
      <div className="grid fontSofiaPro grid-cols-1  md:grid-cols-12    auto-rows-auto gap-2  w-full">
        <div className="col-span-1 md:col-span-4 lg:col-span-4 xl:col-span-4 mb-24">
          {title && (
            <div className="fontSofiaPro text-4xl	font-bold mb-6">{title}</div>
          )}{' '}
          {data.map((tab, index) => (
            <Accordion
              id={`accordion-page-main-${index}`}
              expanded={isMobile && value == index}
              value={index}
              key={`${index}-accordionmain`}
              className="w-full"
              elevation={0}
              PaperProps={{ classes: { elevation: classes.elevation } }}
              classes={{
                root: classes.accordionRoot,
                elevation: classes.elevation,
                elevation1: classes.elevation,
              }}
            >
              <AccordionSummary
                key={`${index}-accordionsummary`}
                aria-controls="panel1a-content"
                id="panel1a-header"
                classes={{
                  root: classes.summaryRoot,
                  content: classes.summarycontent,
                }}
              >
                <ButtonBase
                  onClick={handleAccChange(index)}
                  value={index}
                  classes={{ root: classes.buttonRoot }}
                >
                  <div className={classes.tabs}>
                    <div className="flex items-center">
                      <img
                        className={`transition-all duration-[0.3s] ease-in-out mr-2  ${
                          value != index ? 'grayscale(1)' : 'grayscale(0)'
                        }`}
                        src={tab.icon}
                      />
                      <div
                        className={value != index ? 'font-normal' : 'font-bold'}
                      >
                        {tab.name}
                      </div>
                    </div>

                    <ChevronRightIcon className="h-3 w-3 text-gray-700 flex-shrink-0 stroke-2" />
                  </div>
                </ButtonBase>
              </AccordionSummary>
              <AccordionDetails value={index} key={`${index}-accordiondetails`}>
                {tab.component}
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
        <div className="col-span-1"></div>
        {!isMobile && (
          <div className="col-span-1 md:col-span-7 lg:col-span-7 xl:col-span-7">
            <TabPanel value={value}>{data[value].component}</TabPanel>
          </div>
        )}
      </div>
    </MuiThemeProvider>
  )
}
export default VerticalTabsWithPages
