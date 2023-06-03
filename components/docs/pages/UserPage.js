import ApiUrlContainer from '../new-component/ApiUrlContainer'
import CodeContainer from '../new-component/CodeContainer'

function UserPage() {
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
        <h2>User</h2>
      </div>
      <div style={styles.paraSpace}>
        <p>you can get user details by using our user api</p>
      </div>

      {/* get All transaction docs start from here */}

      <div style={styles.heading2Space}>
        <h4>(1.) Get User Details</h4>
      </div>
      <div style={styles.paraSpace}>
        <p>
          you can get user details by sending HTTP <b>GET</b> request to the
          user URI{' '}
        </p>
      </div>
      <ApiUrlContainer title="https://api.vaionex.com/user" />

      <div style={styles.heading2Space}>
        <h6>request</h6>
      </div>
      <ApiUrlContainer title="[GET] https://api.vaionex.com/user" />

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
          To get user details, you have to pass one header parameter{' '}
          <b>authToken</b>
        </p>
      </div>

      <div style={styles.heading2Space}>
        <h6>Example</h6>
      </div>
      <CodeContainer
        title={`

    const config ={
        method: 'post',
        url: 'https://api.vaionex.com/user',
        headers: {
            Content-Type: "application/json,
            authToken: eyJhbGciOiJSUzI1NiIsImtpZCI6ImFiMGNiMTk5Zjg3MGYyOGUyOTg5YWI0ODFjYzJlNDdlMGUyY2MxOWQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vdmFpb25leGRldiIsImF1ZCI6InZhaW9uZXhkZXYiLCJhdXRoX3RpbWUiOjE2MjI5NTYxMTksInVzZXJfaWQiOiJZSEEwMGhCbG1zTUR1RDZuZ05sNTZSczhaQTczIiwic3ViIjoiWUhBMDBoQmxtc01EdUQ2bmdObDU2UnM4WkE3MyIsImlhdCI6MTYyMjk1NjExOSwiZXhwIjoxNjIyOTU5NzE5LCJlbWFpbCI6InRlc3RhZEB0ZXN0Mi5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsidGVzdGFkQHRlc3QyLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.epFlSXumWu_aZX2vA4dJ6ubxB9394CyeytSWsB8gznX2gqey8fSTMXli - RCbUTed6mQt - OA2Kz8pq72wtVp_u1oNaesWJwjnV3tDvVGrIzlJsBCRPy40dP0js_nm - CitDfKt7VPFDlb_cAhSS_j3efGZtJ03mAOIQ - oDOZwvPp5Ryc2PG - iHSEhmsB2dw6t3oSThhAjquGOzI0FWG1jVUjEl79pT - pomvavml_n2tJL9YJl5rTzS - toaBMa2a - u4zKEaPX5Bq4ifRZvfDJN_RPlSzDK4mfEPlhUPbHyTI9rG1Bo24BIGWSLAC5y9wSbSBX6VsRjwMNW5Hgt6Yp9Ktg
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
          <b>200 OK</b> status code and user data.
        </p>
      </div>

      <CodeContainer
        title={`{
    "message": "Operation completed successfully",
    "statusCode": 200,
    "data": {
        "uid": "zbM2x3UEuDS1becelhFY2oO8g6D2",
        "email": "1235@gmail.com",
        "emailVerified": false,
        "disabled": false,
        "metadata": {
            "lastSignInTime": "Mon, 07 Jun 2021 11:16:42 GMT",
            "creationTime": "Mon, 07 Jun 2021 11:16:42 GMT"
        },
        "tokensValidAfterTime": "Mon, 07 Jun 2021 11:16:42 GMT",
        "providerData": [
            {
                "uid": "1235@gmail.com",
                "email": "1235@gmail.com",
                "providerId": "password"
            }
        ]
    }
}
                `}
      />

      {/* get user mnemonic docs start from here */}

      <div style={styles.heading2Space}>
        <h4>(2.) Get mnemonic</h4>
      </div>
      <div style={styles.paraSpace}>
        <p>
          you can get user mnemonic by sending HTTP <b>GET</b> request to the
          mnemonic URI{' '}
        </p>
      </div>
      <ApiUrlContainer title="https://api.vaionex.com/mnemonic" />

      <div style={styles.heading2Space}>
        <h6>request</h6>
      </div>
      <ApiUrlContainer title="[GET] https://api.vaionex.com/mnemonic" />

      <div style={styles.heading2Space}>
        <h6>headers</h6>
      </div>
      <CodeContainer
        title={`
    authToken: <your auth token>
    walletId: <your wallet id>
`}
      />
      <div style={styles.paraSpace}>
        <p>
          To get menomonic, you have to pass two header parameters{' '}
          <b>authToken</b> and <b>walletId</b>
        </p>
      </div>

      <div style={styles.heading2Space}>
        <h6>Example</h6>
      </div>
      <CodeContainer
        title={`

    const config ={
        method: 'get',
        url: 'https://api.vaionex.com/mnemonic',
        headers: {
            Content-Type: "application/json,
            authToken: "eyJhbGciOiJSUzI1NiIsImtpZCI6ImFiMGNiMTk5Zjg3MGYyOGUyOTg5YWI0ODFjYzJlNDdlMGUyY2MxOWQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vdmFpb25leGRldiIsImF1ZCI6InZhaW9uZXhkZXYiLCJhdXRoX3RpbWUiOjE2MjMwODEyOTYsInVzZXJfaWQiOiJ6Yk0yeDNVRXVEUzFiZWNlbGhGWTJvTzhnNkQyIiwic3ViIjoiemJNMngzVUV1RFMxYmVjZWxoRlkyb084ZzZEMiIsImlhdCI6MTYyMzA4MTI5NiwiZXhwIjoxNjIzMDg0ODk2LCJlbWFpbCI6IjEyMzVAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbIjEyMzVAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.ZgRVxWH--tJdVuBdzjl2NeABWW605z0kEub37n3nEbWQzu1BlxNV6I_MOtUXfv1g6QOzc6mgK7gpQvkGGXgprxqv0tOuaPGUjVUQKemPLbt4bWdf-fGWbAekH-4k4TQZqpI2vyfhDclc_G9B0eh7_83jE0H19KPLTj42Lmqzr5SLEIpijf5AlHOPK-9QUaQCuQo-VVSM6h2XP4jOXruZQ7VacMTiJYWHxxX2FELHGoTBiWImNQrBfPL3OXOWhq9yDwaxBxVNJuBAyGDGRp6K9zPK5YsZKKFXQBpzP5sLxg1ekUTa7u6tprWiHqa1ODyBoS2FozIWb5m8-luP6BKXIQ",
            walletId: "vaionex-wallet"
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
          <b>200 OK</b> status code and user mnemonic.
        </p>
      </div>

      <CodeContainer
        title={`{
  "statusCode": 200,
  "data": {
    "data": "elevator chef aim burst educate trophy scheme busy planet shaft earn major",
    "status": "success",
    "msg": "Operation completed successfully."
  }
}
                `}
      />

      {/* user history docs start from here */}

      <div style={styles.heading2Space}>
        <h4>(3.) Get User History</h4>
      </div>
      <div style={styles.paraSpace}>
        <p>
          you can get user History by sending HTTP <b>GET</b> request to the
          history URI{' '}
        </p>
      </div>
      <ApiUrlContainer title="https://api.vaionex.com/history" />

      <div style={styles.heading2Space}>
        <h6>request</h6>
      </div>
      <ApiUrlContainer title="[GET] https://api.vaionex.com/history" />

      <div style={styles.heading2Space}>
        <h6>headers</h6>
      </div>
      <CodeContainer
        title={`
    authToken: <your auth token>
    walletId: <your wallet id>          // optional
`}
      />
      <div style={styles.paraSpace}>
        <p>
          To get user history, you have to pass one header parameters{' '}
          <b>authtToken</b>
        </p>
      </div>

      <div style={styles.heading2Space}>
        <h6>Example</h6>
      </div>
      <CodeContainer
        title={`

    const config ={
        method: 'post',
        url: 'https://api.vaionex.com/history',
        headers: {
            Content-Type: "application/json,
            authToken: eyJhbGciOiJSUzI1NiIsImtpZCI6ImFiMGNiMTk5Zjg3MGYyOGUyOTg5YWI0ODFjYzJlNDdlMGUyY2MxOWQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vdmFpb25leGRldiIsImF1ZCI6InZhaW9uZXhkZXYiLCJhdXRoX3RpbWUiOjE2MjI5NTYxMTksInVzZXJfaWQiOiJZSEEwMGhCbG1zTUR1RDZuZ05sNTZSczhaQTczIiwic3ViIjoiWUhBMDBoQmxtc01EdUQ2bmdObDU2UnM4WkE3MyIsImlhdCI6MTYyMjk1NjExOSwiZXhwIjoxNjIyOTU5NzE5LCJlbWFpbCI6InRlc3RhZEB0ZXN0Mi5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsidGVzdGFkQHRlc3QyLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.epFlSXumWu_aZX2vA4dJ6ubxB9394CyeytSWsB8gznX2gqey8fSTMXli - RCbUTed6mQt - OA2Kz8pq72wtVp_u1oNaesWJwjnV3tDvVGrIzlJsBCRPy40dP0js_nm - CitDfKt7VPFDlb_cAhSS_j3efGZtJ03mAOIQ - oDOZwvPp5Ryc2PG - iHSEhmsB2dw6t3oSThhAjquGOzI0FWG1jVUjEl79pT - pomvavml_n2tJL9YJl5rTzS - toaBMa2a - u4zKEaPX5Bq4ifRZvfDJN_RPlSzDK4mfEPlhUPbHyTI9rG1Bo24BIGWSLAC5y9wSbSBX6VsRjwMNW5Hgt6Yp9Ktg,
            walletId: vaionex-wallet
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
          <b>200 OK</b> status code and user history.
        </p>
      </div>

      <CodeContainer
        title={`{
  "statusCode": 200,
  "data": {
    "status": "success",
    "msg": "Operation completed successfully",
    "data": {
      "balance": {
        "bsvBal": 17534,
        "dollarBal": 0.0286980155
      },
      "transctions": [
        {
          "block_id": 691790,
          "hash": "3a0d4b10f301a0ee12258732fcda6c97766837a8943842fdaa35ec36ac62b3a8",
          "time": "2021-06-15 17:56:30",
          "balance_change": -775,
          "address": "17n2JVhrCf1oYSMkZtZNjcf1deteUEKQsH"
        }
      ]
    }
  }
}
                `}
      />
    </div>
  )
}

export default UserPage
