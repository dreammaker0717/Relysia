import ApiUrlContainer from '../new-component/ApiUrlContainer'
import CodeContainer from '../new-component/CodeContainer'

function WalletsPage() {
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
        <h2>Wallets</h2>
      </div>
      <div style={styles.paraSpace}>
        <p>you can get all wallet related api</p>
      </div>

      {/* get address docs start from here */}

      <div style={styles.heading2Space}>
        <h4>(1.) Get Address</h4>
      </div>
      <div style={styles.paraSpace}>
        <p>
          you can get user address by sending HTTP <b>GET</b> request to the
          address URI{' '}
        </p>
      </div>
      <ApiUrlContainer title="https://api.vaionex.com/address" />

      <div style={styles.heading2Space}>
        <h6>request</h6>
      </div>
      <ApiUrlContainer title="[GET] https://api.vaionex.com/address" />

      <div style={styles.heading2Space}>
        <h6>headers</h6>
      </div>
      <CodeContainer
        title={`
    authToken: <your auth token>
    walletId: <your wallet id>      //optional
`}
      />
      <div style={styles.paraSpace}>
        <p>
          To get address of wallet, you have to pass two header parameters one
          is <b>authToken</b> and second <b>walletId</b>.
        </p>
      </div>

      <div style={styles.heading2Space}>
        <h6>Example</h6>
      </div>
      <CodeContainer
        title={`

    const config ={
        method: 'get',
        url: 'https://api.vaionex.com/address',
        headers: {
            Content-Type: "application/json,
            authToken: "eyJhbGciOiJSUzI1NiIsImtpZCI6ImFiMGNiMTk5Zjg3MGYyOGUyOTg5YWI0ODFjYzJlNDdlMGUyY2MxOWQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vdmFpb25leGRldiIsImF1ZCI6InZhaW9uZXhkZXYiLCJhdXRoX3RpbWUiOjE2MjMwODEyOTYsInVzZXJfaWQiOiJ6Yk0yeDNVRXVEUzFiZWNlbGhGWTJvTzhnNkQyIiwic3ViIjoiemJNMngzVUV1RFMxYmVjZWxoRlkyb084ZzZEMiIsImlhdCI6MTYyMzA4MTI5NiwiZXhwIjoxNjIzMDg0ODk2LCJlbWFpbCI6IjEyMzVAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbIjEyMzVAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.ZgRVxWH--tJdVuBdzjl2NeABWW605z0kEub37n3nEbWQzu1BlxNV6I_MOtUXfv1g6QOzc6mgK7gpQvkGGXgprxqv0tOuaPGUjVUQKemPLbt4bWdf-fGWbAekH-4k4TQZqpI2vyfhDclc_G9B0eh7_83jE0H19KPLTj42Lmqzr5SLEIpijf5AlHOPK-9QUaQCuQo-VVSM6h2XP4jOXruZQ7VacMTiJYWHxxX2FELHGoTBiWImNQrBfPL3OXOWhq9yDwaxBxVNJuBAyGDGRp6K9zPK5YsZKKFXQBpzP5sLxg1ekUTa7u6tprWiHqa1ODyBoS2FozIWb5m8-luP6BKXIQ",
            walletId: "vaionex-wallet"
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
          <b>200 OK</b> status code and address data.
        </p>
      </div>

      <CodeContainer
        title={`{
  "statusCode": 200,
  "data": {
    "status": "success",
    "msg": "Operation completed successfully",
    "addresses": "17n2JVhrCf1oYSMkZtZNjcf1deteUEKQsH",
    "paymail": "string"
  }
}
                `}
      />

      {/* get address docs start from here */}

      <div style={styles.heading2Space}>
        <h4>(2.) Get All Addresses</h4>
      </div>
      <div style={styles.paraSpace}>
        <p>
          you can get user all addresses by sending HTTP <b>GET</b> request to
          the allAddresses URI{' '}
        </p>
      </div>
      <ApiUrlContainer title="https://api.vaionex.com/allAddresses" />

      <div style={styles.heading2Space}>
        <h6>request</h6>
      </div>
      <ApiUrlContainer title="[GET] https://api.vaionex.com/allAddresses" />

      <div style={styles.heading2Space}>
        <h6>headers</h6>
      </div>
      <CodeContainer
        title={`
    authToken: <your auth token>
    walletId: <your wallet id>      //optional
`}
      />
      <div style={styles.paraSpace}>
        <p>
          To get all addressess of wallet, you have to pass two header
          parameters one is <b>authToken</b> and second <b>walletId</b>.
        </p>
      </div>

      <div style={styles.heading2Space}>
        <h6>Example</h6>
      </div>
      <CodeContainer
        title={`

    const config ={
        method: 'get',
        url: 'https://api.vaionex.com/allAddresses',
        headers: {
            Content-Type: "application/json,
            authToken: "eyJhbGciOiJSUzI1NiIsImtpZCI6ImFiMGNiMTk5Zjg3MGYyOGUyOTg5YWI0ODFjYzJlNDdlMGUyY2MxOWQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vdmFpb25leGRldiIsImF1ZCI6InZhaW9uZXhkZXYiLCJhdXRoX3RpbWUiOjE2MjMwODEyOTYsInVzZXJfaWQiOiJ6Yk0yeDNVRXVEUzFiZWNlbGhGWTJvTzhnNkQyIiwic3ViIjoiemJNMngzVUV1RFMxYmVjZWxoRlkyb084ZzZEMiIsImlhdCI6MTYyMzA4MTI5NiwiZXhwIjoxNjIzMDg0ODk2LCJlbWFpbCI6IjEyMzVAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbIjEyMzVAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.ZgRVxWH--tJdVuBdzjl2NeABWW605z0kEub37n3nEbWQzu1BlxNV6I_MOtUXfv1g6QOzc6mgK7gpQvkGGXgprxqv0tOuaPGUjVUQKemPLbt4bWdf-fGWbAekH-4k4TQZqpI2vyfhDclc_G9B0eh7_83jE0H19KPLTj42Lmqzr5SLEIpijf5AlHOPK-9QUaQCuQo-VVSM6h2XP4jOXruZQ7VacMTiJYWHxxX2FELHGoTBiWImNQrBfPL3OXOWhq9yDwaxBxVNJuBAyGDGRp6K9zPK5YsZKKFXQBpzP5sLxg1ekUTa7u6tprWiHqa1ODyBoS2FozIWb5m8-luP6BKXIQ",
            walletId: "vaionex-wallet"
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
          <b>200 OK</b> status code and all addresses data.
        </p>
      </div>

      <CodeContainer
        title={`{
  "statusCode": 200,
  "data": {
    "status": "success",
    "msg": "Operation completed successfully",
    "addresses": [
      "17n2JVhrCf1oYSMkZtZNjcf1deteUEKQsH"
    ],
    "paymail": "string"
  }
}
                `}
      />

      {/* get balance docs start from here */}

      <div style={styles.heading2Space}>
        <h4>(3.) Get Balance</h4>
      </div>
      <div style={styles.paraSpace}>
        <p>
          you can get user balance by sending HTTP <b>POST</b> request to the
          balance URI{' '}
        </p>
      </div>
      <ApiUrlContainer title="https://api.vaionex.com/balance" />

      <div style={styles.heading2Space}>
        <h6>request</h6>
      </div>
      <ApiUrlContainer title="[GET] https://api.vaionex.com/balance" />

      <div style={styles.heading2Space}>
        <h6>headers</h6>
      </div>
      <CodeContainer
        title={`
    authToken: <your auth token>
    currency: <which type of balance you want to get>           //defalt value is "USD".,
    walletID: <your wallet id>                                  // default value is "vaionex-wallet"
    type: <which type of coins you want to display>            // type will be 'BSV or STAS'
`}
      />
      <div style={styles.paraSpace}>
        <p>
          To get balance, you have to pass four header parameters one is{' '}
          <b>authToken</b> which is required , second <b>type</b>. type key
          value should be <b>BSV</b> or <b>STAS</b>, third <b>walletID</b>. by
          default walletID will be <b>vaionex-wallet</b> and fourth{' '}
          <b>currency</b>. currency by defalt will be <b>USD</b>
        </p>
      </div>

      <div style={styles.paraSpace}>
        <p>
          To get balance, you have to pass array string of your wallet id to
          body and key will be <b>walletId</b>{' '}
        </p>
      </div>

      <div style={styles.heading2Space}>
        <h6>Example</h6>
      </div>
      <CodeContainer
        title={`

    const config ={
        method: 'get',
        url: 'https://api.vaionex.com/balance',
        headers: {
            Content-Type: "application/json,
            authToken: "eyJhbGciOiJSUzI1NiIsImtpZCI6ImFiMGNiMTk5Zjg3MGYyOGUyOTg5YWI0ODFjYzJlNDdlMGUyY2MxOWQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vdmFpb25leGRldiIsImF1ZCI6InZhaW9uZXhkZXYiLCJhdXRoX3RpbWUiOjE2MjMwODEyOTYsInVzZXJfaWQiOiJ6Yk0yeDNVRXVEUzFiZWNlbGhGWTJvTzhnNkQyIiwic3ViIjoiemJNMngzVUV1RFMxYmVjZWxoRlkyb084ZzZEMiIsImlhdCI6MTYyMzA4MTI5NiwiZXhwIjoxNjIzMDg0ODk2LCJlbWFpbCI6IjEyMzVAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbIjEyMzVAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.ZgRVxWH--tJdVuBdzjl2NeABWW605z0kEub37n3nEbWQzu1BlxNV6I_MOtUXfv1g6QOzc6mgK7gpQvkGGXgprxqv0tOuaPGUjVUQKemPLbt4bWdf-fGWbAekH-4k4TQZqpI2vyfhDclc_G9B0eh7_83jE0H19KPLTj42Lmqzr5SLEIpijf5AlHOPK-9QUaQCuQo-VVSM6h2XP4jOXruZQ7VacMTiJYWHxxX2FELHGoTBiWImNQrBfPL3OXOWhq9yDwaxBxVNJuBAyGDGRp6K9zPK5YsZKKFXQBpzP5sLxg1ekUTa7u6tprWiHqa1ODyBoS2FozIWb5m8-luP6BKXIQ",
            currency: "CHF"             // default is USD
            type: "BSV"                 // default will be all type
            wallletID: "vaionex-wallet"         // default value will be "vaionex-wallet"
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
          <b>200 OK</b> status code and balance data.
        </p>
      </div>

      <CodeContainer
        title={`{
  "statusCode": 200,
  "data": {
    "status": "success",
    "msg": "Operation completed successfully",
    "balances": {
      "totalBalance": {
        "currency": "CHF",
        "balance": "0.13992795037688774"
      },
      "coins": [
        {
          "protocol": "BSV",
          "dollarBal": 0.1523433989,
          "balance": 104797
        },
        {
          "protocol": "STAS",
          "tokenId": "d658f6e8177d7fbb5ee516df5cee50daddda19ac",
          "ticker": "test 9908",
          "iconURL": "test",
          "balance": 1
        },
        {
          "protocol": "STAS",
          "tokenId": "00fdb2cbc10dfd3fb8f3dcbf97ac272f90b29d16",
          "ticker": "test 9908",
          "iconURL": "test.me",
          "balance": 0
        },
        {
          "protocol": "STAS",
          "tokenId": "9852fae231d3ac46c70be4f40f0c5cbab4bb74e0",
          "ticker": "stas1",
          "iconURL": "https://cdn.searchenginejournal.com/wp-content/uploads/2019/12/how-to-execute-a-link-conversion-strategy-5df792498b991-760x400.png",
          "balance": 100
        },
        {
          "protocol": "STAS",
          "tokenId": "4fb1f80e37c4739ef80f3e3d171da2e2e1b05632",
          "ticker": "test 9908",
          "iconURL": "test",
          "balance": 1
        }
      ]
    }
  }
}
                `}
      />

      {/* get metrics docs start from here */}

      <div style={styles.heading2Space}>
        <h4>(4.) Get metrics</h4>
      </div>
      <div style={styles.paraSpace}>
        <p>
          you can get user metrics by sending HTTP <b>GET</b> request to the
          metrics URI{' '}
        </p>
      </div>
      <ApiUrlContainer title="https://api.vaionex.com/metrics" />

      <div style={styles.heading2Space}>
        <h6>request</h6>
      </div>
      <ApiUrlContainer title="[GET] https://api.vaionex.com/metrics" />

      <div style={styles.heading2Space}>
        <h6>headers</h6>
      </div>
      <CodeContainer
        title={`
    authToken: <your auth token>
`}
      />
      <div style={styles.paraSpace}>
        <p>
          To get user metrics, you have to pass header parameter{' '}
          <b>authToken</b>
        </p>
      </div>

      <div style={styles.heading2Space}>
        <h6>Example</h6>
      </div>
      <CodeContainer
        title={`

    const config ={
        method: 'get',
        url: 'https://api.vaionex.com/metrics',
        headers: {
            Content-Type: "application/json,
            authToken: "eyJhbGciOiJSUzI1NiIsImtpZCI6ImFiMGNiMTk5Zjg3MGYyOGUyOTg5YWI0ODFjYzJlNDdlMGUyY2MxOWQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vdmFpb25leGRldiIsImF1ZCI6InZhaW9uZXhkZXYiLCJhdXRoX3RpbWUiOjE2MjMwODEyOTYsInVzZXJfaWQiOiJ6Yk0yeDNVRXVEUzFiZWNlbGhGWTJvTzhnNkQyIiwic3ViIjoiemJNMngzVUV1RFMxYmVjZWxoRlkyb084ZzZEMiIsImlhdCI6MTYyMzA4MTI5NiwiZXhwIjoxNjIzMDg0ODk2LCJlbWFpbCI6IjEyMzVAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbIjEyMzVAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.ZgRVxWH--tJdVuBdzjl2NeABWW605z0kEub37n3nEbWQzu1BlxNV6I_MOtUXfv1g6QOzc6mgK7gpQvkGGXgprxqv0tOuaPGUjVUQKemPLbt4bWdf-fGWbAekH-4k4TQZqpI2vyfhDclc_G9B0eh7_83jE0H19KPLTj42Lmqzr5SLEIpijf5AlHOPK-9QUaQCuQo-VVSM6h2XP4jOXruZQ7VacMTiJYWHxxX2FELHGoTBiWImNQrBfPL3OXOWhq9yDwaxBxVNJuBAyGDGRp6K9zPK5YsZKKFXQBpzP5sLxg1ekUTa7u6tprWiHqa1ODyBoS2FozIWb5m8-luP6BKXIQ",
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
          <b>200 OK</b> status code and user metrics data.
        </p>
      </div>

      <CodeContainer
        title={`{
  "statusCode": 200,
  "data": {
    "msg": "Operation completed successfully",
    "utxos": [
      {
        "txid": "3a0d4b10f301a0ee12258732fcda6c97766837a8943842fdaa35ec36ac62b3a8",
        "vout": 1,
        "value": "11725",
        "height": 691790,
        "confirmations": 232,
        "scriptPubKey": "76a9144a548f3da5526d1e2f8b5c3584ebb9739edfbe3b88ac"
      }
    ]
  }
}
                `}
      />

      {/* create wallet docs start from here */}

      <div style={styles.heading2Space}>
        <h4>(5.) CreateWallet</h4>
      </div>
      <div style={styles.paraSpace}>
        <p>
          you can create wallet by sending HTTP <b>GET</b> request to the
          createWallet URI{' '}
        </p>
      </div>
      <ApiUrlContainer title="https://api.vaionex.com/createWallet" />

      <div style={styles.heading2Space}>
        <h6>request</h6>
      </div>
      <ApiUrlContainer title="[GET] https://api.vaionex.com/createWallet" />

      <div style={styles.heading2Space}>
        <h6>headers</h6>
      </div>
      <CodeContainer
        title={`
    authToken: <your auth token>
    walletId: < your wallet id >
    walletPassword: < wallet password >
    walletTitle: < wallet title >
    walletLogo: < wallet logo >     //optional
`}
      />
      <div style={styles.paraSpace}>
        <p>
          To create wallets, you have to pass five header parameters{' '}
          <b>authToken</b>, <b>walletId</b>, <b>walletPassword</b>,{' '}
          <b>walletTitle</b> and <b>walletLogo</b>
        </p>
      </div>

      <div style={styles.heading2Space}>
        <h6>Example</h6>
      </div>
      <CodeContainer
        title={`

    const config ={
        method: 'get',
        url: 'https://api.vaionex.com/metrics',
        headers: {
            Content-Type: "application/json,
            authToken: "eyJhbGciOiJSUzI1NiIsImtpZCI6ImFiMGNiMTk5Zjg3MGYyOGUyOTg5YWI0ODFjYzJlNDdlMGUyY2MxOWQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vdmFpb25leGRldiIsImF1ZCI6InZhaW9uZXhkZXYiLCJhdXRoX3RpbWUiOjE2MjMwODEyOTYsInVzZXJfaWQiOiJ6Yk0yeDNVRXVEUzFiZWNlbGhGWTJvTzhnNkQyIiwic3ViIjoiemJNMngzVUV1RFMxYmVjZWxoRlkyb084ZzZEMiIsImlhdCI6MTYyMzA4MTI5NiwiZXhwIjoxNjIzMDg0ODk2LCJlbWFpbCI6IjEyMzVAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbIjEyMzVAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.ZgRVxWH--tJdVuBdzjl2NeABWW605z0kEub37n3nEbWQzu1BlxNV6I_MOtUXfv1g6QOzc6mgK7gpQvkGGXgprxqv0tOuaPGUjVUQKemPLbt4bWdf-fGWbAekH-4k4TQZqpI2vyfhDclc_G9B0eh7_83jE0H19KPLTj42Lmqzr5SLEIpijf5AlHOPK-9QUaQCuQo-VVSM6h2XP4jOXruZQ7VacMTiJYWHxxX2FELHGoTBiWImNQrBfPL3OXOWhq9yDwaxBxVNJuBAyGDGRp6K9zPK5YsZKKFXQBpzP5sLxg1ekUTa7u6tprWiHqa1ODyBoS2FozIWb5m8-luP6BKXIQ",
            walletId: "vaionex-wallet",
            walletPassword: "vaionexwallet",
            walletTitle: "vaionexwallet",
            walletLogo: "https://firebasestorage.googleapis.com/v0/b/vaionexdev.appspot.com/o/wallet_icons%2FWalletUUUIcon.svg?alt=media",
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
          <b>200 OK</b> status code and wallet data.
        </p>
      </div>

      <CodeContainer
        title={`{
  "statusCode": 200,
  "data": {
    "status": "success",
    "msg": "Wallet created successfully",
    "data": {
      "id": "vaionex-wallet",
      "bsvBal": 0,
      "dollerBal": 0,
      "title": "vaionex wallet",
      "walletLogo": null,
      "address": [
        "Q3G6EawHeG4kAhGBWDzCRYd3y6f8WU73X"
      ],
      "publicKey": "02fd399b51fb5e2bb120322c0baf67e9cc4e22f3515d3194efe52863da3075ef09",
      "hdPublicKey": "02fd399b51fb5e2bb120322c0baf67e9cc4e22f3515d3194efe52863da3075ef09",
      "hdPrivateKey": "U2FsdGVkX19tdNTc6EPIMgprYV2WbO3xIJiDvVLYx1HEkTf50K3Y6EUGXlkL45+6ab1dDhUTXUiNOlrBdjw2WrgK4dG4G6N5sgit51cY3kJCCdFM+TJR8Dm90XtkOhvKM3tXD5rb9m0S22w+NnuYAudhJrv9in9vcXvTRYHtomY=",
      "mnemonic": "congress until during wet calm claw saddle target black bike"
    }
  }
  
                `}
      />
    </div>
  )
}

export default WalletsPage
