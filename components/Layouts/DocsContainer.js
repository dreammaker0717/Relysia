import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { Layout } from 'antd'
import RelysiaOverviewPage from '../docs/Overview'
import HTMLPage from '../docs/Html'
import SandboxPage from '../docs/Sandbox'
import ReactPage from '../docs/React'
import useMediaQuery from '@material-ui/core/useMediaQuery'

const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
    '& > * + *': {
      marginTop: theme.spacing(3),
    },
  },
  inputFieldStyle: {
    color: '#0e314c',

    '& .MuiFilledInput-root': {
      color: '#0e314c',
    },
  },
  mainTextfieldRoot: {
    borderBottom: 'none !important',
    marginTop: 4,
    marginBottom: 4,
    marginLeft: 4,
  },

  roottab: {
    flexGrow: 1,
  },
  padding: {
    padding: theme.spacing(3),
  },
  tabRoot: {
    backgroundColor: theme.palette.background.paper,
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    [theme.breakpoints.down(700)]: {
      flexDirection: 'column',
    },
  },
  demo2: {
    backgroundColor: '#2e1534',
  },
}))

function DocsContainer(props) {
  const classes = useStyles()
  const router = useRouter()
  const smmatches = useMediaQuery('(min-width:700px)')

  const [value, setValue] = React.useState(0)

  useEffect(() => {
    if (router.query.topic === 'html') {
      setValue(1)
    } else if (router.query.topic === 'react') {
      setValue(2)
    } else if (router.query.topic === 'sandbox') {
      setValue(3)
    } else {
      setValue(0)
    }
  }, [router.query.topic])

  const handleChange = (event, newValue) => {
    if (newValue === 0) {
      router.push('/docs/?topic=overview')
    } else if (newValue === 1) {
      router.push('/docs/?topic=html')
    } else if (newValue === 2) {
      router.push('/docs/?topic=react')
    } else if (newValue === 3) {
      router.push('/docs/?topic=sandbox')
    }
    setValue(newValue)
  }

  return (
    <section
      className="about-area ptb-80 more-top-padding"
      style={{ paddingBottom: 0 }}
    >
      <Layout
        style={{
          minHeight: '100vh',
          backgroundColor: '#ffffff',
          borderTop: '#eaeaea 0.7px solid',
        }}
      >
        <Layout className="site-layout" style={{ backgroundColor: '#ffffff' }}>
          <div
            className="page-head1 icon-btn-no-outline tabViewCon"
            style={{ textAlign: 'left' }}
          >
            <div className="settings-con1 icon-btn-no-outline">
              <h2>Relysia Button Docs</h2>
              <section className="domain-search-area ">
                <div className={classes.tabRoot}>
                  <div>
                    <AntTabs
                      value={value}
                      onChange={handleChange}
                      aria-label="ant example"
                      orientation={smmatches ? 'vertical' : ''}
                    >
                      <AntTab label="Relysia Button Overview" />
                      <AntTab label="HTML" />
                      <AntTab label="React" />
                      <AntTab label="Sandbox" />
                    </AntTabs>
                  </div>
                  <div
                    className="container"
                    style={{
                      marginBottom: 50,
                      paddingLeft: !smmatches ? 0 : 15,
                      paddingRight: !smmatches ? 0 : 15,
                      paddingTop: smmatches ? 0 : 25,
                    }}
                  >
                    <TabPanel value={value} index={0}>
                      <RelysiaOverviewPage />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                      <HTMLPage />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                      <ReactPage />
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                      <SandboxPage />
                    </TabPanel>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </Layout>
      </Layout>
    </section>
  )
}

const AntTabs = withStyles({
  root: {
    borderRight: '1px solid #e8e8e8',
    marginTop: '20px',
  },
  indicator: {
    backgroundColor: '#f48665',
  },
})((props) => <Tabs {...props} variant="scrollable" scrollButtons="auto" />)

const AntTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    minWidth: 72,
    fontWeight: 600,
    marginRight: theme.spacing(4),
    color: '#6084a4',

    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: '#f48665',
      opacity: 1,
    },
    '&$selected': {
      color: '#f48665',
      fontWeight: 600,
    },
    '&:focus': {
      color: '#f48665',
    },
  },
  selected: {},
}))((props) => <Tab {...props} />)

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  )
}

export default DocsContainer
