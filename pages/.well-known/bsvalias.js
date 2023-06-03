import React from 'react'
import { envMODE } from '../../config/envMode'
const data =
  envMODE === 'DEV'
    ? {
        bsvalias: '1.0',
        capabilities: {
          '6745385c3fc0': false,
          pki: 'https://api.relysia.com/v1/bsvalias/id/{alias}@{domain.tld}',
          paymentDestination:
            'https://api.relysia.com/v1/bsvalias/address/{alias}@{domain.tld}',
          a9f510c16bde:
            'https://api.relysia.com/v1/bsvalias/verifypubkey/{alias}@{domain.tld}/{pubkey}',
          '5f1323cddf31':
            'https://api.relysia.com/v1/bsvalias/receive-transaction/{alias}@{domain.tld}',
          '2a40af698840':
            'https://api.relysia.com/v1/bsvalias/p2p-payment-destination/{alias}@{domain.tld}',
        },
      }
    : {
        bsvalias: '1.0',
        capabilities: {
          '6745385c3fc0': false,
          pki: 'https://api.relysia.com/v1/bsvalias/id/{alias}@{domain.tld}',
          paymentDestination:
            'https://api.relysia.com/v1/bsvalias/address/{alias}@{domain.tld}',
          a9f510c16bde:
            'https://api.relysia.com/v1/bsvalias/verifypubkey/{alias}@{domain.tld}/{pubkey}',
          '5f1323cddf31':
            'https://api.relysia.com/v1/bsvalias/receive-transaction/{alias}@{domain.tld}',
          '2a40af698840':
            'https://api.relysia.com/v1/bsvalias/p2p-payment-destination/{alias}@{domain.tld}',
        },
      }
const Test = () => {}

export const getServerSideProps = ({ res }) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  console.log(res.json)
    res.write(JSON.stringify(data));
  res.end()

  return {
    props: {},
  }
}

export default Test
