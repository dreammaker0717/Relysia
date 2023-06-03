import React, { useState } from 'react'
import Link from '../common/active-link'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { tomorrowNightBright } from 'react-syntax-highlighter/dist/cjs/styles/hljs'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import Head from 'next/head'

const useStyles = makeStyles((theme) => ({
  tableHead: {
    backgroundColor: '#00152921',
  },
}))

function ReactPage(props) {
  const classes = useStyles()

  return (
    <section className="blog-details-area ">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 ">
            <div className="blog-details">
              <div className="article-content">
                <h2 className="docs-head">React</h2>
                <p>
                  The React version of Pay Button is what we use throughout the
                  main Pay Button app and every other app we build. It is very
                  similar to and is based on the pure javascript version of Pay
                  Button. In fact, it is simply a wrapper for the pure
                  javascript version.
                </p>
                <p>
                  How to install the React component (
                  <a
                    href="https://www.npmjs.com/package/vionex-pay-button"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="link">npm package</span>
                  </a>
                  )
                </p>
                <div style={{ width: '100%', overflow: 'auto', marginTop: 20 }}>
                  <SyntaxHighlighter
                    language="html"
                    style={tomorrowNightBright}
                  >
                    {`
 npm install vionex-pay-button
        `}
                  </SyntaxHighlighter>
                </div>

                <p>How to use it in your react project:</p>
                <div style={{ width: '100%', overflow: 'auto', marginTop: 20 }}>
                  <SyntaxHighlighter
                    language="html"
                    style={tomorrowNightBright}
                  >
                    {`
import PayButton from 'vionex-pay-button'
import 'vionex-pay-button/dist/index.css'
        `}
                  </SyntaxHighlighter>
                </div>

                <p>
                  Pay Button can used in 2 different ways. Pay Button can be
                  used either for transferring
                  <span className="docs-bold">BSVs</span> or{' '}
                  <span className="docs-bold">Tokens</span> at a time. To
                  transfer BSVs user needs to pass the{' '}
                  <span className="docs-bold">token</span> argument with a
                  <span className="docs-bold">'BSV'</span> value (which is the
                  default value), the <span className="docs-bold">amount</span>{' '}
                  argument will contain the{' '}
                  <span className="docs-bold">amount</span> to be transferred in
                  US $, if you need to transfer bsvs to multiple addresses then
                  add multiple amounts in array,{' '}
                  <span className="docs-bold">to</span> argument will contain
                  the <span className="docs-bold">public addresses</span>
                  where the amount will be sent (array length of amount and to
                  props should be same).
                </p>

                <div style={{ width: '100%', overflow: 'auto', marginTop: 20 }}>
                  <SyntaxHighlighter
                    language="html"
                    style={tomorrowNightBright}
                  >
                    {`
import React from 'react'
import PayButton from 'vionex-pay-button'
import 'vionex-pay-button/dist/index.css'

const App = () => {
  const getRes = (res) => {
    console.log('res', res)
  }

   return (
    <PayButton
      amount={[20,30]}
      to={['address1GoesHere','address2GoesHere']}
      responseCallback={getRes}
    />
 )
}

export default App
        `}
                  </SyntaxHighlighter>{' '}
                </div>

                <p>
                  In the case of transferring tokens, the user needs to pass the{' '}
                  <span className="docs-bold">amount</span> argument that will
                  contain the number of tokens to be transferred, the{' '}
                  <span className="docs-bold">to</span> argument will contain
                  the <span className="docs-bold">public-key</span> where the
                  tokens will be sent,if you need to transfer tokens to multiple
                  addresses then add multiple tokens in array,{' '}
                  <span className="docs-bold">token</span> argument will contain
                  the ID of specific token that will be transferred from user
                  account. Tokens will be only transferred if the user owns does
                  specific tokens (array length of amount and to props should be
                  same).
                </p>

                <div style={{ width: '100%', overflow: 'auto', marginTop: 20 }}>
                  <SyntaxHighlighter
                    language="html"
                    style={tomorrowNightBright}
                  >
                    {`
import React from 'react'
import PayButton from 'vionex-pay-button'
import 'vionex-pay-button/dist/index.css'

const App = () => {
  const getRes = (res) => {
    console.log('res', res)
  }

  return (
    <PayButton
      token='token_id'
      amount={['20']}
      to={['addressGoesHere']}
      responseCallback={getRes}
    />
  )
}

export default App
 `}
                  </SyntaxHighlighter>{' '}
                </div>

                <p>
                  A Pay Button <span className="docs-bold">{'<div>'}</span> can
                  take the following attributes:
                </p>

                <TableContainer
                  component={Paper}
                  style={{ margin: '10px 0px 35px 0px', overflow: 'auto' }}
                >
                  <Table className={classes.table} aria-label="simple table">
                    <TableHead
                      classes={{
                        root: classes.tableHead,
                      }}
                    >
                      <TableRow>
                        <TableCell style={{ minWidth: 160 }}>Prop</TableCell>
                        <TableCell style={{ minWidth: 160 }}>Type</TableCell>
                        <TableCell>Description</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {detailsArray.map((row, index) => {
                        return (
                          <TableRow key={index + 'detailTable'} hover>
                            <TableCell component="th" scope="row">
                              {row.prop}
                            </TableCell>
                            <TableCell>{row.type}</TableCell>
                            <TableCell>{row.desc}</TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>

                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    margin: '80px 0px 10px 0px',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <div className="normal-button docs-footer">
                    <h6> Previous Topic</h6>
                    <Link href={`/docs/?topic=html`}>
                      <a>
                        <button>Integrating With HTML</button>
                      </a>
                    </Link>
                  </div>
                  <div className="normal-button docs-footer docs-footer-next">
                    <h6> Next Topic</h6>
                    <Link href={`/docs/?topic=sandbox`}>
                      <a>
                        <button>Sandbox Example</button>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Head>
        <title>Overview | REST APIs | Relysia</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=0.9 ,maximum-scale=1.0, 
    user-scalable=0"
        />
      </Head>
    </section>
  )
}

const detailsArray = [
  {
    prop: 'amount',
    type: 'ARRAY',
    desc: "'tokens quantity' if transferring tokens , 'amount in US $' if transferring Bsvs",
  },
  {
    prop: 'to',
    type: 'ARRAY',
    desc: "'public-key' if transferring tokens , 'wallet-address' if transferring Bsvs",
  },
  {
    prop: 'token',
    type: 'STRING',
    desc: "'token-id' if transferring tokens , 'BSV'(default) if transferring Bsvs",
  },
  {
    prop: 'currency',
    type: 'STRING',
    desc: "'USD'(default) or 'BSV'",
  },
  {
    prop: 'allowMultipleWallets',
    type: 'BOOLEAN',
    desc: "if 'true'(default), display select wallet option, if(false) vaionex-wallet will be used for transction",
  },
  {
    prop: 'onLoad',
    type: 'FUNCTION',
    desc: 'Callback after the pay-button gets loaded',
  },
  {
    prop: 'onTransactionStart',
    type: 'FUNCTION',
    desc: 'Callback before starting the transaction',
  },
  {
    prop: 'onError',
    type: 'FUNCTION',
    desc: 'Callback when the error occurs',
  },
  {
    prop: 'responseCallback',
    type: 'FUNCTION',
    desc: 'Callback when API response is received',
  },
  {
    prop: 'onSuccess',
    type: 'FUNCTION',
    desc: 'Callback when transaction get succeeded',
  },
]
export default ReactPage
