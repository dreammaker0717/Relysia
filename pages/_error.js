import React from 'react'

const Error = ({ statusCode }) => {
  return (
    <div>
      <section className="error-area">
        <div className="d-table">
          <div className="d-table-cell">
            <div className="container">
              <div className="error-content">
                <div className="notfound-404">
                  <h1>Oops!</h1>
                </div>
                <h3>
                  {statusCode
                    ? `An error ${statusCode} occurred on server`
                    : 'An error occurred on client'}
                </h3>
                <p>
                  The page you are looking for might have been removed had its
                  name changed or is temporarily unavailable.
                </p>
                <a className="btn btn-primary" href="/">
                  Go to Homepage
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error
