import ApiUrlContainer from '../new-component/ApiUrlContainer'
import CodeContainer from '../new-component/CodeContainer'

function TokensPage() {
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
        <h2>Tokens</h2>
      </div>
      <div style={styles.paraSpace}>
        <p>you can get all tokens related api</p>
      </div>

      {/* get stats token details docs start from here */}

      <div style={styles.heading2Space}>
        <h4>(1.) Get TokenDetails</h4>
      </div>
      <div style={styles.paraSpace}>
        <p>
          you can get user TokenDetails by sending HTTP <b>GET</b> request to
          the details URI{' '}
        </p>
      </div>
      <ApiUrlContainer title="https://api.vaionex.com/details" />

      <div style={styles.heading2Space}>
        <h6>request</h6>
      </div>
      <ApiUrlContainer title="[GET] https://api.vaionex.com/details" />

      <div style={styles.heading2Space}>
        <h6>header</h6>
      </div>
      <CodeContainer
        title={`
    tokenID: <your stas token id>
`}
      />
      <div style={styles.paraSpace}>
        <p>
          To get user StasTokenDetails, you have to pass one header parameter{' '}
          <b>tokenID</b>
        </p>
      </div>

      <div style={styles.heading2Space}>
        <h6>Example</h6>
      </div>
      <CodeContainer
        title={`
    var config = {
        method: "get",
        url: "https://api.relysia.com/details",
        headers: {
            Content-Type: "application/json",
            tokenID: "eyJhbGciOiJSUzI1NiIsImtpZCI6ImFiMGNiMTk5Zjg3MGYyOGUyOTg5YWI0ODFjYzJlNDdlMGUyY2MxOWQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vdmFpb25leGRldiIsImF1ZCI6InZhaW9uZXhkZXYiLCJhdXRoX3RpbWUiOjE2MjMwNzE3MDMsInVzZXJfaWQiOiJ6Yk0yeDNVRXVEUzFiZWNlbGhGWTJvTzhnNkQyIiwic3ViIjoiemJNMngzVUV1RFMxYmVjZWxoRlkyb084ZzZEMiIsImlhdCI6MTYyMzA3MTcwMywiZXhwIjoxNjIzMDc1MzAzLCJlbWFpbCI6IjEyMzVAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbIjEyMzVAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.bqz1wdiBCg7P9LaH9NNtx4nYFLTpcCRz7O7gtzhjENGrHCkXSOoKdWnVkw-6NBZRW3nscCcnHeMQMq4VloZ_1f7_matcmAjbfPyjZ4h6PGlrrSKwusU-nxph6Xi89uOABXkHFQPYIMzz_ZooGqFK6jhINJgAnMvCd9tWXyY3Md5gd6_OcTc4_TMIQI1WvcdGTskcHHc3yP7l63yv8mOPwC1EQY8MXLwfqv6HXrSehY6qduunsXz1Au86v5N5wCia62JT4o1mmFHqVDicnsPUKDiSNQOHW4qGoKd5p4TTre_g5N5H2wyzvOYrZqC4_drjXO4r_9AllI_P4Bl89v703A"
        }
    };

    axios(config).then( (res)=> {
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
          <b>200 OK</b> status code and stats token details.
        </p>
      </div>

      <CodeContainer
        title={`{
  "statusCode": 200,
  "data": {
    "status": "success",
    "msg": "Operation completed successfully",
    "data": {
      "token": {
        "token_id": "4fccddaa796a723df11684b2bda7af9069db5b81",
        "protocol": "STAS",
        "ticker": "test 9908"
      }
    }
  }
}
                `}
      />

      {/* issue docs start from here */}

      <div style={styles.heading2Space}>
        <h4>(2.) issue</h4>
      </div>
      <div style={styles.paraSpace}>
        <p>
          you can issue token by sending HTTP <b>POST</b> request to the issue
          URI{' '}
        </p>
      </div>
      <ApiUrlContainer title="https://api.vaionex.com/issue" />

      <div style={styles.heading2Space}>
        <h6>request</h6>
      </div>
      <ApiUrlContainer title="[POST] https://api.vaionex.com/issue" />

      <div style={styles.heading2Space}>
        <h6>header</h6>
      </div>
      <CodeContainer
        title={`
    authToken: <your auth token>
    protocol: < In which protocol you want to issue Token>      // default STAS
`}
      />
      <div style={styles.paraSpace}>
        <p>
          To generate token, you have to pass two header parameters, one is{' '}
          <b>authToken</b> and second is <b>protocol</b> by default protocol
          will be <b>STAS</b>
        </p>
      </div>

      <div style={styles.heading2Space}>
        <h6>body</h6>
      </div>
      <CodeContainer
        title={`
    {
        "tokenSupply": 1,
        "destinationAddress": "1GakMzjx1jFXTPHNT2dmFvi1r7tfJE6mn4",
        "tokenDetails": {
            "tokenName": "test 9908",
            "tickerSymbol": "test 9908",
            "icon": "test",
            "tokenDescription": "test",
            "issuerName": "test",
            "issuerEmail": "test",
            "schemaId": "test",
            "terms": "test"
        }

    }
`}
      />
      <div style={styles.paraSpace}>
        <p>
          To generate token, you have to pass json object to body with three key
        </p>
        <p>
          <b>1. tokenSupply -</b>Token supply will be the STAS token amount{' '}
        </p>
        <p>
          <b>2. destinationAddress -</b> which user you want to send this token{' '}
        </p>
        <p>
          <b>3. tokenDetails -</b>tokenDetails will be an object of 8 key
        </p>

        <pre>
          <b> (I) tokenName -</b>
        </pre>
        <pre>
          <b> (II) tickerSymbol -</b>
        </pre>
        <pre>
          <b> (III) icon -</b>
        </pre>
        <pre>
          <b> (IV) tokenDescription -</b>
        </pre>
        <pre>
          <b> (V) issuerName -</b>
        </pre>
        <pre>
          <b> (VI) issuerEmail -</b>
        </pre>
        <pre>
          <b> (VII) schemaId -</b>
        </pre>
        <pre>
          <b> (VIII) terms -</b>
        </pre>
      </div>

      <div style={styles.heading2Space}>
        <h6>Example</h6>
      </div>
      <CodeContainer
        title={`
    var config = {
        method: "post",
        url: "https://api.relysia.com/issue",
        headers: {
            Content-Type: "application/json",
            authToken: "eyJhbGciOiJSUzI1NiIsImtpZCI6ImFiMGNiMTk5Zjg3MGYyOGUyOTg5YWI0ODFjYzJlNDdlMGUyY2MxOWQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vdmFpb25leGRldiIsImF1ZCI6InZhaW9uZXhkZXYiLCJhdXRoX3RpbWUiOjE2MjMwNzE3MDMsInVzZXJfaWQiOiJ6Yk0yeDNVRXVEUzFiZWNlbGhGWTJvTzhnNkQyIiwic3ViIjoiemJNMngzVUV1RFMxYmVjZWxoRlkyb084ZzZEMiIsImlhdCI6MTYyMzA3MTcwMywiZXhwIjoxNjIzMDc1MzAzLCJlbWFpbCI6IjEyMzVAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbIjEyMzVAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.bqz1wdiBCg7P9LaH9NNtx4nYFLTpcCRz7O7gtzhjENGrHCkXSOoKdWnVkw-6NBZRW3nscCcnHeMQMq4VloZ_1f7_matcmAjbfPyjZ4h6PGlrrSKwusU-nxph6Xi89uOABXkHFQPYIMzz_ZooGqFK6jhINJgAnMvCd9tWXyY3Md5gd6_OcTc4_TMIQI1WvcdGTskcHHc3yP7l63yv8mOPwC1EQY8MXLwfqv6HXrSehY6qduunsXz1Au86v5N5wCia62JT4o1mmFHqVDicnsPUKDiSNQOHW4qGoKd5p4TTre_g5N5H2wyzvOYrZqC4_drjXO4r_9AllI_P4Bl89v703A"
            protocol: "STAS"        // default will be "STAS"
        },
        data: {
        "tokenSupply": 1,
        "destinationAddress": "1GakMzjx1jFXTPHNT2dmFvi1r7tfJE6mn4",
        "tokenDetails": {
            "tokenName": "test 9908",
            "tickerSymbol": "test 9908",
            "icon": "test",
            "tokenDescription": "test",
            "issuerName": "test",
            "issuerEmail": "test",
            "schemaId": "test",
            "terms": "test"
        }

      }
    };

    axios(config).then( (res)=> {
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
          <b>200 OK</b> status code and issue toekn details.
        </p>
      </div>

      <CodeContainer
        title={`{
    "statusCode": 200,
    "data": {
        "status": "success",
        "msg": "Contract created successfully",
        "tokenId": "abce2ed3d54e2fb84fcf5414c818352690054fa8"
    }
}
                `}
      />
    </div>
  )
}

export default TokensPage
