import React, { useState } from 'react'
import Link from '../common/active-link'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { tomorrowNightBright } from 'react-syntax-highlighter/dist/cjs/styles/hljs'
import Head from 'next/head'

function RelysiaOverviewPage(props) {
  return (
    <section className="blog-details-area ">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 ">
            <div className="blog-details">
              <div className="article-content">
                <h2 className="docs-head">Relysia Button Overview</h2>
                <p>
                  Pay Button is an API and a UI/UX layer for the Bitcoin SV
                  blockchain. It is very easy to add a Pay Button to websites
                  and apps to accept payments and tokens. In a few lines of
                  code, you can accept tips or display content behind a pay
                  wall.
                </p>
                <p>
                  There is built-in token payments, authentication, smart
                  contracts, support for multiple outputs, and the ability to
                  write invoices to the blockchain. We use bsv library, through
                  which one can build sophisticated full-featured on-chain apps.
                  Our technical mission is to support every feature of Bitcoin
                  SV in a manner that is as easy to use as possible, both for
                  developers and end-users. Using our unique token payment
                  solution sites can recieve specific tokens from there users in
                  few clicks.
                </p>
                <p>
                  The easiest way to use Pay Button is to click around on the
                  config page and copy and paste the HTML into your website. For
                  users who wish to do sophisticated things, we provide two
                  primary ways to create a Pay Button in a webapp. The first is
                  HTML and the second is React. In HTML version you can pass the
                  required params and pay button will work.
                </p>
                <p> The simplest Pay Button in HTML looks like this:</p>
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
    <div id="pay-button-root" amount='["20"]' to='["publicKey for token transfer/walletaddress for BSV transfer"]' token="token_id or 'BSV' incase of transferring Bsvs"></div>
    <script src="https://firebasestorage.googleapis.com/v0/b/pay-button-vaionexdev/o/js%2Findex.js?alt=media"></script>
  </body>
</html>
        `}
                  </SyntaxHighlighter>
                </div>

                <p>
                  The HTML version of Pay Button is the easiest one to use, but
                  it is somewhat limited in that it is impossible to dynamically
                  update an HTML Pay Button. Sometimes you want to update a Pay
                  Button dynamically, like when the price changes, or when the
                  users chooses an action in a video game, or when they edit the
                  text they want to post to the blockchain. Therefore we
                  invented a pure React version of Pay Button that can be
                  updated dynamically.
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
       token="token_id or 'BSV' incase of transferring Bsvs"
       amount={['20']}
       to={["'publicKey' incase of transferring tokens or 'wallet-address' incase of transferring Bsvs"]}
       responseCallback={getRes}
     />
  )
 }

 export default App
          `}
                  </SyntaxHighlighter>
                </div>
                <p>
                  Thank you for reading this overview. Please explore the rest
                  of the documentation to learn more about all the features of
                  Pay Button.
                </p>

                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    margin: '80px 0px 10px 0px',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <div className="normal-button docs-footer docs-footer-next">
                    <h6> Next Topic</h6>

                    <Link href={`/docs/?topic=html`}>
                      <a>
                        <button>Integrating With HTML</button>
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

export default RelysiaOverviewPage
