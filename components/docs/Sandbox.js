import React, { useState } from 'react'
import Link from '../common/active-link'
import { Button } from '@material-ui/core'
import Iframe from 'react-iframe'
import Head from 'next/head'

function SandboxPage(props) {
  const [selection, setselection] = useState(1)

  return (
    <section className="blog-details-area ">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 ">
            <div className="blog-details">
              <div className="article-content">
                <h2 className="docs-head"> Try Pay-button in Sandbox</h2>
                <div style={{ marginTop: 30, marginBottom: 10 }}>
                  <Button
                    onClick={() => setselection(1)}
                    color="primary"
                    variant={selection ? 'contained' : 'outlined'}
                    style={{
                      borderRadius: '4px 0px 0px 4px',
                      backgroundColor: selection ? '#44ce6f' : '',
                      borderColor: selection ? '' : '#44ce6f',
                      color: selection ? '' : '#44ce6f',
                    }}
                  >
                    React
                  </Button>
                  <Button
                    onClick={() => setselection(0)}
                    color="primary"
                    variant={selection ? 'outlined' : 'contained'}
                    style={{
                      borderRadius: '0px 4px 4px 0px',
                      backgroundColor: !selection ? '#44ce6f' : '',
                      borderColor: !selection ? '' : '#44ce6f',
                      color: !selection ? '' : '#44ce6f',
                    }}
                  >
                    Html
                  </Button>
                </div>
                <div
                  style={{ height: '80vh', minHeight: '300px', marginTop: 10 }}
                >
                  <Iframe
                    url={`https://codesandbox.io/embed/${
                      !selection
                        ? 'gracious-vaughan-4ngjp'
                        : 'upbeat-margulis-tlf18'
                    }?codemirror=1&forcerefresh=1&hidenavigation=1&editorsize=50`}
                    width="100%"
                    height="100%"
                    id="videoIframe"
                    frameBorder={0}
                    className="myClassname"
                    display="initial"
                    position="relative"
                    allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
                    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
                  />
                </div>

                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    margin: '80px 0px 10px 0px',
                    alignItems: 'center',
                  }}
                >
                  <div className="normal-button docs-footer">
                    <h6> Previous Topic</h6>
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
export default SandboxPage
