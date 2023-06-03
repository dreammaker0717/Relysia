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

function HTMLPage(props) {
  const classes = useStyles()

  return (
    <section className="blog-details-area ">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 ">
            <div className="blog-details">
              <div className="article-content">
                <h2 className="docs-head">HTML</h2>
                <p>
                  The easiest way to add a Pay Button to a website is with the
                  HTML Pay Button. When the document finishes loading, our
                  script looks around the document for {'<div>'} elements with
                  the <span className="docs-bold">pay-button-root</span> ID and
                  certain required attributes. Every {'<div>'} that matches the
                  search is transformed into a Pay Button component. First, add
                  this script to your HTML somewhere:
                </p>
                <div style={{ width: '100%', overflow: 'auto', marginTop: 20 }}>
                  <SyntaxHighlighter
                    language="html"
                    style={tomorrowNightBright}
                  >
                    {`
 <!DOCTYPE html>
 <html lang="en">
   <head>
     <meta charset="UTF-8" />
     <meta name="viewport" content="width=device-width, initial-scale=0.9 ,maximum-scale=1.0, 
    user-scalable=0" />
     <title>Document</title>
   </head>
   <body>
     <div id="pay-button-root" amount='[20,30]' to='["address1GoesHere","address2GoesHere"]' token="token_id"></div>
     <script src="https://firebasestorage.googleapis.com/v0/b/pay-button-vaionexdev/o/js%2Findex.js?alt=media"></script>
   </body>
 </html>
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
                  US $, user can transfer amount to multiple users at the same
                  time by including the amount need to transfer with specific
                  address, <span className="docs-bold">to</span> argument will
                  contain the{' '}
                  <span className="docs-bold">
                    public address(amount and to argument length should be same)
                  </span>
                  where the amount will be sent.
                </p>
                <div style={{ width: '100%', overflow: 'auto', marginTop: 20 }}>
                  <SyntaxHighlighter
                    language="html"
                    style={tomorrowNightBright}
                  >
                    {`
 <div id="pay-button-root" amount='[20,30]' to='["address1GoesHere","address2GoesHere"]'></div>
        `}
                  </SyntaxHighlighter>
                </div>

                <p>
                  In the case of transferring tokens, the user needs to pass the{' '}
                  <span className="docs-bold">amount</span> argument that will
                  contain the number of tokens to be transferred, user can
                  transfer tokens to multiple users at the same time by
                  including the tokens quantity need to transfer to the specific
                  publickey, the <span className="docs-bold">to</span> argument
                  will contain the <span className="docs-bold">public-key</span>{' '}
                  where the tokens will be sent,{' '}
                  <span className="docs-bold">token</span> argument will contain
                  the ID of specific token that will be transferred from user
                  account (amount and to argument length should be same). Tokens
                  will be only transferred if the user owns does specific
                  tokens.
                </p>

                <div style={{ width: '100%', overflow: 'auto', marginTop: 20 }}>
                  <SyntaxHighlighter
                    language="html"
                    style={tomorrowNightBright}
                  >
                    {`
 <div id="pay-button-root" amount='["20"]' to='["publicKeyGoesHere"]' token="token_id"></div>
        `}
                  </SyntaxHighlighter>
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
                    <Link href={`/docs/?topic=overview`}>
                      <a>
                        <button>Relysia Button Overview</button>
                      </a>
                    </Link>
                  </div>
                  <div className="normal-button docs-footer docs-footer-next">
                    <h6> Next Topic</h6>
                    <Link href={`/docs/?topic=react`}>
                      <a>
                        <button>Integrating With React</button>
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
        <meta name="viewport" content="  " />
      </Head>
    </section>
  )
}

const detailsArray = [
  {
    prop: 'amount',
    type: `STRING`,
    desc: `'tokens quantity' if transferring tokens , 'amount in US $' if transferring Bsvs.
    `,
  },
  {
    prop: 'to',
    type: `STRING`,
    desc: `'public-key' if transferring tokens , 'wallet-address' if transferring Bsvs
    `,
  },
  {
    prop: 'token',
    type: `STRING`,
    desc: `'token-id' if transferring tokens , 'BSV'(default) if transferring Bsvs
    `,
  },
  {
    prop: 'currency',
    type: `STRING`,
    desc: `'USD'(default) or 'BSV'
    `,
  },
  {
    prop: 'allowMultipleWallets',
    type: `STRING`,
    desc: `true(default), display aselect wallet option, if(false) vaionex-wallet will be used
    `,
  },
]
export default HTMLPage
