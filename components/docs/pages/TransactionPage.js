import ApiUrlContainer from '../new-component/ApiUrlContainer'
import CodeContainer from '../new-component/CodeContainer'

function TransactionPage() {
  const styles = {
    heading1Space: {
      marginTop: '10px',
      marginBottom: '20px',
    },
    heading2Space: {
      marginTop: '40px',
      marginBottom: '20px',
    },
    paraSpace: {
      marginBottom: '15px',
    },
  }

  return (
    <div>
      <div style={styles.heading1Space}>
        <h2>User Transaction</h2>
      </div>
      <div style={styles.paraSpace}>
        <p>you can transfer and request fund useing transaction api</p>
      </div>

      {/* Send function docs start from here */}

      <div style={styles.heading2Space}>
        <h4>(1.) Send</h4>
      </div>
      <div style={styles.paraSpace}>
        <p>
          you can transfer funds to other user, by sending HTTP <b>POST</b>{' '}
          request to the send URI{' '}
        </p>
      </div>
      <ApiUrlContainer title="https://api.vaionex.com/send" />

      <div style={styles.heading2Space}>
        <h6>request</h6>
      </div>
      <ApiUrlContainer title="[POST] https://api.vaionex.com/send" />

      <div style={styles.heading2Space}>
        <h6>header</h6>
      </div>
      <CodeContainer
        title={`
    authToken: <your auth token id>
`}
      />

      <div style={styles.paraSpace}>
        <p>
          To Transfer fund to other user , you have to pass one header
          parameters <b>authtoken</b>.
        </p>
      </div>

      <div style={styles.heading2Space}>
        <h6>Body</h6>
      </div>
      <CodeContainer
        title={`
    {
    
    "type": "", // bsv or stas
    "dataArray": [ {to: "<user address or paymail id>", amount: <how much amount you want to send>} ],
    "opReturns":[<your op_return array>],        //optional
    "currency": "<In which currency you want to send>",     //optional
    "tokenId": "<user token id>",       //optional
    "walletId": "<user wallet id>"      //optional

}
`}
      />

      <div style={styles.paraSpace}>
        <p>
          To send transation to other user , you have to pass json body object
          with two required key value.
        </p>
        <p>
          <b>(1) dataArray (required)</b> - dataArray will be array object of{' '}
          <b>to</b> (user paymail or address id which you want to transfer fund)
          and <b>amount</b> (which you want to transfer){' '}
        </p>
        <p>
          <b>(2) type (required)</b> - type will be <b>STAS</b> or <b>BSV</b>{' '}
        </p>
        <p>
          <b>(3) currency (optional)</b> - curreny key value will be{' '}
          <b>USD or STAS</b> becuse we are current support only two type and by
          default currency will be <b>USD</b>
        </p>
        <p>
          <b>(4) opReturns (optional)</b> - opReturns will be array of op_return
        </p>
        <p>
          <b>(4) tokenId (optional)</b> - If your type is <b>STAS</b> then{' '}
          <b>tokenId</b> wiil be a required field and token id will be you
          transaction token id
        </p>
        <p>
          <b>(4) walletId (optional)</b> - From Which wallet you want to
          transfer fund
        </p>
      </div>

      <div style={styles.heading2Space}>
        <h6>Example</h6>
      </div>
      <CodeContainer
        title={`

    const config ={
        method: 'post',
        url: 'https://api.vaionex.com/send',
        headers: {
            Content-Type: "application/json,
            authtoken: eyJhbGciOiJSUzI1NiIsImtpZCI6ImFiMGNiMTk5Zjg3MGYyOGUyOTg5YWI0ODFjYzJlNDdlMGUyY2MxOWQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vdmFpb25leGRldiIsImF1ZCI6InZhaW9uZXhkZXYiLCJhdXRoX3RpbWUiOjE2MjMwODEyOTYsInVzZXJfaWQiOiJ6Yk0yeDNVRXVEUzFiZWNlbGhGWTJvTzhnNkQyIiwic3ViIjoiemJNMngzVUV1RFMxYmVjZWxoRlkyb084ZzZEMiIsImlhdCI6MTYyMzA4MTI5NiwiZXhwIjoxNjIzMDg0ODk2LCJlbWFpbCI6IjEyMzVAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbIjEyMzVAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.ZgRVxWH--tJdVuBdzjl2NeABWW605z0kEub37n3nEbWQzu1BlxNV6I_MOtUXfv1g6QOzc6mgK7gpQvkGGXgprxqv0tOuaPGUjVUQKemPLbt4bWdf-fGWbAekH-4k4TQZqpI2vyfhDclc_G9B0eh7_83jE0H19KPLTj42Lmqzr5SLEIpijf5AlHOPK-9QUaQCuQo-VVSM6h2XP4jOXruZQ7VacMTiJYWHxxX2FELHGoTBiWImNQrBfPL3OXOWhq9yDwaxBxVNJuBAyGDGRp6K9zPK5YsZKKFXQBpzP5sLxg1ekUTa7u6tprWiHqa1ODyBoS2FozIWb5m8-luP6BKXIQ,
        },

        data:{
        "type": "BSV",
	"dataArray":[
		{"to":"28275@moneybutton.com","amount": 3},
		{"to":"17LhJgucvA7vPsRRJwvb53rEqq6PXxGREj","amount": 2}
		],
	"currency":"USD",   // BSV or USD
	"opReturns":[]

        }
    };

    axios(config).then((res) =>{
        console.log(res);
    });


`}
      />

      <div style={styles.heading2Space}>
        <h6>Response</h6>
      </div>

      <div style={styles.paraSpace}>
        <p>
          If your request succeeds, the server responds with an HTTP{' '}
          <b>200 OK</b> status code and transaction info.
        </p>
      </div>

      <CodeContainer
        title={`
    {
    "statusCode": 200,
    "data": {
    "status": "success",
    "msg": "Tokens transferred successfully!"
    }
    }

                `}
      />

      {/* pay docs start from here */}

      <div style={styles.heading2Space}>
        <h4>(2.) Pay</h4>
      </div>
      <div style={styles.paraSpace}>
        <p>
          you can pay funds to user, by sending HTTP <b>POST</b> request to the
          URI{' '}
        </p>
      </div>
      <ApiUrlContainer title="https://api.vaionex.com/pay" />

      <div style={styles.heading2Space}>
        <h6>request</h6>
      </div>
      <ApiUrlContainer title="[POST] https://api.vaionex.com/pay" />

      <div style={styles.heading2Space}>
        <h6>header</h6>
      </div>
      <CodeContainer
        title={`
    authToken: <your auth token>
`}
      />

      <div style={styles.paraSpace}>
        <p>
          To pay funds to other user, you have to pass one header parameter{' '}
          <b>authToken</b>.
        </p>
      </div>

      <div style={styles.heading2Space}>
        <h6>body</h6>
      </div>
      <CodeContainer
        title={`
    {
        "uri": "string",
        "type": "string",
        "mainProtocol": "string",
        "outputs": [{
            "script": "string",
            "satoshis": 0
        }],
        "inputs": [{
            "txid": "string",
            "vout": 0,
            "satoshis": 0,
            "scriptSig": "string"
        }],
        "memo": "string",
        "isBSV": true,
        "peer": "string",
        "peerData": "string",
        "peerProtocol": "string"
    }
`}
      />

      <div style={styles.heading2Space}>
        <h6>Example</h6>
      </div>
      <CodeContainer
        title={`

    const config ={
        method: 'get',
        url: 'https://api.vaionex.com/URI',
        headers: {
            Content-Type: application/json,
            uri: bitcoin:1FMif2XbHJx5L2x6QWYKyWEWPpxJC1ipXw?amount=0.00123456
        },

    };

    axios(config).then((res) =>{
        console.log(res);
    });


`}
      />

      <div style={styles.heading2Space}>
        <h6>Response</h6>
      </div>

      <div style={styles.paraSpace}>
        <p>
          If your request succeeds, the server responds with an HTTP{' '}
          <b>200 OK</b> status code and transaction info.
        </p>
      </div>

      <CodeContainer
        title={`
    {
        "statusCode": 200,
        "data": {
            "status": "success",
            "msg": "Operation completed successfully",
            "data": {
                "uri": "bitcoin:1FMif2XbHJx5L2x6QWYKyWEWPpxJC1ipXw?amount=0.00123456",
                "type": "bip21",
                "mainProtocol": "bip21",
                "outputs": [{
                    "script": "76a9149d7cda4252e8f46b12fee2d14e2d731ac074330688ac",
                    "satoshis": 123456
                }],
                "inputs": [],
                "memo": "Payment to Address",
                "isBSV": false,
                "peer": null,
                "peerData": null,
                "peerProtocol": null
            }
        }
    }

                `}
      />

      {/* get uri docs start from here */}

      <div style={styles.heading2Space}>
        <h4>(3.) URI</h4>
      </div>
      <div style={styles.paraSpace}>
        <p>
          you can get data object from bit uri, by sending HTTP <b>GET</b>{' '}
          request to the URI{' '}
        </p>
      </div>
      <ApiUrlContainer title="https://api.vaionex.com/URI" />

      <div style={styles.heading2Space}>
        <h6>request</h6>
      </div>
      <ApiUrlContainer title="[GET] https://api.vaionex.com/URI" />

      <div style={styles.heading2Space}>
        <h6>header</h6>
      </div>
      <CodeContainer
        title={`
    uri: <your bit uri>
`}
      />

      <div style={styles.paraSpace}>
        <p>
          To get json object data format from bit uri , you have to pass one
          header parameters <b>uri</b>.
        </p>
      </div>

      <div style={styles.heading2Space}>
        <h6>Example</h6>
      </div>
      <CodeContainer
        title={`

    const config ={
        method: 'get',
        url: 'https://api.vaionex.com/URI',
        headers: {
            Content-Type: application/json,
            uri: bitcoin:1FMif2XbHJx5L2x6QWYKyWEWPpxJC1ipXw?amount=0.00123456
        },

    };

    axios(config).then((res) =>{
        console.log(res);
    });


`}
      />

      <div style={styles.heading2Space}>
        <h6>Response</h6>
      </div>

      <div style={styles.paraSpace}>
        <p>
          If your request succeeds, the server responds with an HTTP{' '}
          <b>200 OK</b> status code and transaction info.
        </p>
      </div>

      <CodeContainer
        title={`
    {
        "statusCode": 200,
        "data": {
            "status": "success",
            "msg": "Operation completed successfully",
            "data": {
                "uri": "bitcoin:1FMif2XbHJx5L2x6QWYKyWEWPpxJC1ipXw?amount=0.00123456",
                "type": "bip21",
                "mainProtocol": "bip21",
                "outputs": [{
                    "script": "76a9149d7cda4252e8f46b12fee2d14e2d731ac074330688ac",
                    "satoshis": 123456
                }],
                "inputs": [],
                "memo": "Payment to Address",
                "isBSV": false,
                "peer": null,
                "peerData": null,
                "peerProtocol": null
            }
        }
    }

                `}
      />
    </div>
  )
}

export default TransactionPage
