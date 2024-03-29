export default async function bsvalias(req, res) {
    res.setHeader('Content-Type','application/json')
  return res.status(200).json({
    bsvalias: '1.0',
    capabilities: {
      "6745385c3fc0" : false,
      "pki": 'https://api.relysia.com/v1/bsvalias/id/{alias}@{domain.tld}',
      "paymentDestination":
        'https://api.relysia.com/v1/bsvalias/address/{alias}@{domain.tld}',
      "a9f510c16bde":
        'https://api.relysia.com/v1/bsvalias/verifypubkey/{alias}@{domain.tld}/{pubkey}',
      "5f1323cddf31":
        'https://api.relysia.com/v1/bsvalias/receive-transaction/{alias}@{domain.tld}',
      '2a40af698840':
        'https://api.relysia.com/v1/bsvalias/p2p-payment-destination/{alias}@{domain.tld}',
    },
  })
}
