import React from 'react'
import * as Icon from 'react-feather'
import Link from 'next/link'

export default function ServicesContent() {
  return (
    <section className="services-area-two ptb-80 bg-f9f6f6">
      <div className="container">
        <div className="section-title" style={{ marginTop: 130 }}>
          <h2>Our Services</h2>
          <div className="bar"></div>
          <p>
            We make use of the Bitcoin SV infrastructure to provide you 3
            different cutting edge services.
          </p>
        </div>

        <div className="row" style={{ marginTop: 100, marginBottom: 100 }}>
          <div className="col-lg-4 col-md-6">
            <Link href="/services/database-in-blockchain">
              <div
                className="single-services-box fix-height-srvbox"
                style={{ cursor: 'pointer' }}
              >
                <div className="icon">
                  <Icon.Database />
                </div>

                <h3>Create Database in Blockchain</h3>
                <p>Set up your own database on the BSV blockchain.</p>
              </div>
            </Link>
          </div>

          <div className="col-lg-4 col-md-6">
            <Link href="/services/database-in-blockchain">
              <div
                className="single-services-box fix-height-srvbox"
                style={{ cursor: 'pointer' }}
              >
                <div className="icon">
                  <Icon.Globe />
                </div>

                <h3>
                  <Link href="/services/database-in-blockchain">
                    <a>Host websites on Blockchain</a>
                  </Link>
                </h3>
                <p>Host your own websites on the BSV blockchain.</p>
              </div>
            </Link>
          </div>

          <div className="col-lg-4 col-md-6">
            <Link href="/services/database-in-blockchain">
              <div
                className="single-services-box fix-height-srvbox"
                style={{ cursor: 'pointer' }}
              >
                <div className="icon">
                  <Icon.FileText />
                </div>

                <h3>
                  <Link href="/services/database-in-blockchain">
                    <a>Store Files on Blockchain</a>
                  </Link>
                </h3>
                <p>Quickly upload and store files on the BSV blockchain.</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
