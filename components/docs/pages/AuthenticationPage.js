import ApiUrlContainer from '../new-component/ApiUrlContainer'
import CodeContainer from '../new-component/CodeContainer'

function AuthenticationPage() {
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
        <h2>User Authentication</h2>
      </div>
      <div style={styles.paraSpace}>
        <p>
          you can create account and login to our App using api which is written
          below
        </p>
      </div>

      {/* create user docs start from here */}

      <div style={styles.heading2Space}>
        <h4>(1.) Create User</h4>
      </div>
      <div style={styles.paraSpace}>
        <p>
          you can create account for our app by sending HTTP <b>GET</b> request
          to the createUser URI{' '}
        </p>
      </div>
      <ApiUrlContainer title="https://api.vaionex.com/createUser" />

      <div style={styles.heading2Space}>
        <h6>request</h6>
      </div>
      <ApiUrlContainer title="[GET] https://api.vaionex.com/createUser" />

      <div style={styles.heading2Space}>
        <h6>headers</h6>
      </div>
      <CodeContainer
        title={`{
    email: test@gmail.com,
    password: 123456
}`}
      />
      <div style={styles.paraSpace}>
        <p>
          To Create account you have to pass two headers parameters <b>email</b>{' '}
          and <b>password</b>
        </p>
      </div>

      <div style={styles.heading2Space}>
        <h6>Example</h6>
      </div>
      <CodeContainer
        title={`

    const config ={
        method: 'get',
        url: 'https://api.vaionex.com/createUser',
        headers: {
            Content-Type: "application/json,
            email: test@gmail.com,
            password: "123456"
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
  "message": "User created successfully",
  "status": 200,
  "data": {
    "token": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImFiMGNiMTk5Zjg3MGYyOGUyOTg5YWI0ODFjYzJlNDdlMGUyY2MxOWQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vdmFpb25leGRldiIsImF1ZCI6InZhaW9uZXhkZXYiLCJhdXRoX3RpbWUiOjE2MjI5NTYxMTksInVzZXJfaWQiOiJZSEEwMGhCbG1zTUR1RDZuZ05sNTZSczhaQTczIiwic3ViIjoiWUhBMDBoQmxtc01EdUQ2bmdObDU2UnM4WkE3MyIsImlhdCI6MTYyMjk1NjExOSwiZXhwIjoxNjIyOTU5NzE5LCJlbWFpbCI6InRlc3RhZEB0ZXN0Mi5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsidGVzdGFkQHRlc3QyLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.epFlSXumWu_aZX2vA4dJ6ubxB9394CyeytSWsB8gznX2gqey8fSTMXli-RCbUTed6mQt-OA2Kz8pq72wtVp_u1oNaesWJwjnV3tDvVGrIzlJsBCRPy40dP0js_nm-CitDfKt7VPFDlb_cAhSS_j3efGZtJ03mAOIQ-oDOZwvPp5Ryc2PG-iHSEhmsB2dw6t3oSThhAjquGOzI0FWG1jVUjEl79pT-pomvavml_n2tJL9YJl5rTzS-toaBMa2a-u4zKEaPX5Bq4ifRZvfDJN_RPlSzDK4mfEPlhUPbHyTI9rG1Bo24BIGWSLAC5y9wSbSBX6VsRjwMNW5Hgt6Yp9Ktg",
    "userId": "YHA00hBlmsMDuD6ngNl56Rs8ZA",
    "status": "success"
  }
}
                `}
      />

      {/* auth or login docs start from here */}

      <div style={styles.heading2Space}>
        <h4>(2.) Login User</h4>
      </div>
      <div style={styles.paraSpace}>
        <p>
          you can Authenticate user account for our app by sending HTTP{' '}
          <b>GET</b> request to the Auth URI{' '}
        </p>
      </div>
      <ApiUrlContainer title="https://api.vaionex.com/auth" />

      <div style={styles.heading2Space}>
        <h6>request</h6>
      </div>
      <ApiUrlContainer title="[GET] https://api.vaionex.com/auth" />

      <div style={styles.heading2Space}>
        <h6>header</h6>
      </div>
      <CodeContainer
        title={`
    email: test@gmail.com,
    password: 123456
`}
      />
      <div style={styles.paraSpace}>
        <p>
          To Authenticate or Login your account, you have to pass two header
          parameters <b>email</b> and <b>password</b>
        </p>
      </div>

      <div style={styles.heading2Space}>
        <h6>Example</h6>
      </div>
      <CodeContainer
        title={`

    const config ={
        method: 'get',
        url: 'https://api.vaionex.com/auth',
        headers: {
            Content-Type: "application/json,
            email: test@gmail.com,
            password: 123456
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
  "status": 200,
  "data": {
    "token": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImFiMGNiMTk5Zjg3MGYyOGUyOTg5YWI0ODFjYzJlNDdlMGUyY2MxOWQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vdmFpb25leGRldiIsImF1ZCI6InZhaW9uZXhkZXYiLCJhdXRoX3RpbWUiOjE2MjI5NTc1MjMsInVzZXJfaWQiOiJZSEEwMGhCbG1zTUR1RDZuZ05sNTZSczhaQTczIiwic3ViIjoiWUhBMDBoQmxtc01EdUQ2bmdObDU2UnM4WkE3MyIsImlhdCI6MTYyMjk1NzUyMywiZXhwIjoxNjIyOTYxMTIzLCJlbWFpbCI6InRlc3RhZEB0ZXN0Mi5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsidGVzdGFkQHRlc3QyLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.IncXnmKxzRTzT66WSDkvx8i-eEHBpGBymLVWlAoZLjwhH7I2U7WHgmYz7AW8ts5G_6FE7zUdcyD_7P1tZvCRUvrKFBURPklzzGco6rRa5dEvWqgIDH0rwMZuAdw-vb_Jr6c628HLJB2ambMVuGbJn7o9jXU1XhNr1H2SNbQcbF88OUm_n8Tzu1Wq-hHi-9Gj02D8TsXrBJI8BQpT63bmMQN1AgXXqC8ChGDQ1cOdV6zcmOxScLSMsNpOTs2ffDIYovKQPOiIUVjds3H8uVfMAu3HZx_vu5xMFmEJ6R2sWCNip0tZyWJr76_7g4AmDZmAugc3b3i-O-mdS5oFoosa",
    "status": "success",
    "msg": "Operation completed successfully"
  }
}
                `}
      />

      {/* send otp docs start from here */}

      <div style={styles.heading2Space}>
        <h4>(3.) Send OTP</h4>
      </div>
      <div style={styles.paraSpace}>
        <p>
          In Now days,To validate genuine users most of apps uses otp
          validation. you can also validate by sending HTTP <b>GET</b> request
          to sendOTP URI
        </p>
      </div>
      <ApiUrlContainer title="https://api.vaionex.com/sendOTP" />

      <div style={styles.heading2Space}>
        <h6>request</h6>
      </div>
      <ApiUrlContainer title="[GET] https://api.vaionex.com/sendOTP" />

      <div style={styles.heading2Space}>
        <h6>header</h6>
      </div>
      <CodeContainer
        title={`
    authToken: eyJhbGciOiJSUzI1NiIsImtpZCI6ImFiMGNiMTk5Zjg3MGYyOGUyOTg5YWI0ODFjYzJlNDdlMGUyY2MxOWQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vdmFpb25leGRldiIsImF1ZCI6InZhaW9uZXhkZXYiLCJhdXRoX3RpbWUiOjE2MjI5NTc1MjMsInVzZXJfaWQiOiJZSEEwMGhCbG1zTUR1RDZuZ05sNTZSczhaQTczIiwic3ViIjoiWUhBMDBoQmxtc01EdUQ2bmdObDU2UnM4WkE3MyIsImlhdCI6MTYyMjk1NzUyMywiZXhwIjoxNjIyOTYxMTIzLCJlbWFpbCI6InRlc3RhZEB0ZXN0Mi5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsidGVzdGFkQHRlc3QyLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.IncXnmKxzRTzT66WSDkvx8i - eEHBpGBymLVWlAoZLjwhH7I2U7WHgmYz7AW8ts5G_6FE7zUdcyD_7P1tZvCRUvrKFBURPklzzGco6rRa5dEvWqgIDH0rwMZuAdw - vb_Jr6c628HLJB2ambMVuGbJn7o9jXU1XhNr1H2SNbQcbF88OUm_n8Tzu1Wq - hHi - 9 Gj02D8TsXrBJI8BQpT63bmMQN1AgXXqC8ChGDQ1cOdV6zcmOxScLSMsNpOTs2ffDIYovKQPOiIUVjds3H8uVfMAu3HZx_vu5xMFmEJ6R2sWCNip0tZyWJr76_7g4AmDZmAugc3b3i - O - mdS5oFoosa9Q,
    phoneNumber: 8215441111
`}
      />
      <div style={styles.paraSpace}>
        <p>
          To generate otp, you have to pass two header parameters{' '}
          <b>authToken</b> and <b>phoneNumber</b>
        </p>
      </div>

      <div style={styles.heading2Space}>
        <h6>Example</h6>
      </div>
      <CodeContainer
        title={`

    const config = {
        method: 'get',
        url: 'https://api.vaionex.com/sendOT',
        headers: {
            Content-Type: application/json,
            authToken: eyJhbGciOiJSUzI1NiIsImtpZCI6ImFiMGNiMTk5Zjg3MGYyOGUyOTg5YWI0ODFjYzJlNDdlMGUyY2MxOWQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vdmFpb25leGRldiIsImF1ZCI6InZhaW9uZXhkZXYiLCJhdXRoX3RpbWUiOjE2MjI5NTc1MjMsInVzZXJfaWQiOiJZSEEwMGhCbG1zTUR1RDZuZ05sNTZSczhaQTczIiwic3ViIjoiWUhBMDBoQmxtc01EdUQ2bmdObDU2UnM4WkE3MyIsImlhdCI6MTYyMjk1NzUyMywiZXhwIjoxNjIyOTYxMTIzLCJlbWFpbCI6InRlc3RhZEB0ZXN0Mi5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsidGVzdGFkQHRlc3QyLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.IncXnmKxzRTzT66WSDkvx8i - eEHBpGBymLVWlAoZLjwhH7I2U7WHgmYz7AW8ts5G_6FE7zUdcyD_7P1tZvCRUvrKFBURPklzzGco6rRa5dEvWqgIDH0rwMZuAdw - vb_Jr6c628HLJB2ambMVuGbJn7o9jXU1XhNr1H2SNbQcbF88OUm_n8Tzu1Wq - hHi - 9 Gj02D8TsXrBJI8BQpT63bmMQN1AgXXqC8ChGDQ1cOdV6zcmOxScLSMsNpOTs2ffDIYovKQPOiIUVjds3H8uVfMAu3HZx_vu5xMFmEJ6R2sWCNip0tZyWJr76_7g4AmDZmAugc3b3i - O - mdS5oFoosa9Q,
            phoneNumber: 8215441111
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
          <b>200 OK</b> status code and success message.
        </p>
      </div>

      <CodeContainer
        title={`{
  "message": "Verification code has been sent to your phone.",
  "statusCode": 200,
  "data": {
    "status": "success",
    "msg": "Verification code has been sent to your phone."
  }
}
                `}
      />

      {/* validate otp docs start from here */}

      <div style={styles.heading2Space}>
        <h4>(4.) validate OTP</h4>
      </div>
      <div style={styles.paraSpace}>
        <p>
          In Now days,To validate genuine users most of apps uses otp
          validation. you can also validate by sending HTTP <b>GET</b> request
          to validateOTP URI
        </p>
      </div>
      <ApiUrlContainer title="https://api.vaionex.com/validateOTP" />

      <div style={styles.heading2Space}>
        <h6>request</h6>
      </div>
      <ApiUrlContainer title="[GET] https://api.vaionex.com/validateOTP" />

      <div style={styles.heading2Space}>
        <h6>header</h6>
      </div>
      <CodeContainer
        title={`
    phoneNumber: 8215441111
    otp: 123456
`}
      />
      <div style={styles.paraSpace}>
        <p>
          To verify otp, you have to pass two header parameters{' '}
          <b>phoneNumber</b> and <b>otp</b>
        </p>
      </div>

      <div style={styles.heading2Space}>
        <h6>Example</h6>
      </div>
      <CodeContainer
        title={`

    const config ={
        method: 'get',
        url: 'https://api.vaionex.com/validateOTP',
        headers: {
            Content-Type: "application/json,
            phoneNumber: 8215441111,
            otp: 123456
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
  "message": "Phone number verified successfully.",
  "statusCode": 200,
  "data": {
    "status": "success",
    "msg": "Phone number verified successfully."
  }
}
                `}
      />
    </div>
  )
}

export default AuthenticationPage
