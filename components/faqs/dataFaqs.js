const apiSVG = '/assets/images/docs/platform/api.svg'
const sdkSVG = '/assets/images/docs/platform/sdk.svg'
const faqSVG = '/assets/images/docs/platform/faq.svg'
const walletSVG = '/assets/images/docs/platform/wallet.svg'
const demoSVG = '/assets/images/docs/platform/demo.svg'
const transactionSVG = '/assets/images/docs/platform/transaction.svg'
export const dataFaqs = [
  {
    id: 1,
    title: 'APIs',
    content: 'In Authentication, create user, auth, send otp, verify otp',
    icon: apiSVG,
    href: '#',
  },
  {
    id: 2,
    title: 'Wallets',
    content: 'Questions about wallet usage',
    icon: sdkSVG,
    href: '#',
  },
  {
    id: 3,
    title: 'Games',
    content: 'Issues Related to Games',
    icon: demoSVG,
    href: '#',
  },
  {
    id: 4,
    title: 'Transactions',
    content: 'How does transaction works',
    icon: transactionSVG,
    href: '#',
  },
  {
    id: 5,
    title: 'Tokens',
    content: 'How does token works',
    icon: faqSVG,
    href: '#',
  },
  {
    id: 6,
    title: 'Chat & Support',
    content: 'get Help !',
    icon: walletSVG,
    href: '#',
  },
]
export const questionsFaq = [
  {
    relatedId: 2,
    id: 1,
    question: 'What is Relysia?',
    answer:
      'Relysia is both Wallet and Infrastructure offering. We think those services go hand in hand since one cannot exist without solving the other. Infrastructure helps integrating blockchain solutions into applications, wallet help utilizing those functions.',
  },
  {
    relatedId: 2,
    id: 2,
    question: 'Is Relysia self-custodial?',
    answer:
      "Yes! We don't have direct control over the keys due to encryption mechanisms. We require moreover users to store their mnemonics to prevent the loss of funds. Regardless of self custody, you should not store significant amount of value on the wallet, since there are specialised cold-wallet solutions for that.",
  },
  {
    relatedId: 6,
    id: 3,
    question: 'What tokens protocols does Relysia support?',
    answer:
      'We support in the beginning STAS and traditional Bitcoin SV, and extend it over the weeks to all relevant token protocols to let the users decide what their favourite protocol is.',
  },
  {
    relatedId: 6,
    id: 4,
    question: 'Is Relysia Peer-2-Peer based?',
    answer: `Reylsia has a native P2P wallet infrastructure that handles all UTXO's and transfers. This not only helps us supporting a variety of token protocols, but also smart contracts with instant confirmations. `,
  },
  {
    relatedId: 2,
    id: 5,
    question: 'What is the difference between Connect and Infrastructure?',
    answer:
      'Connect is for simple frontend MVPs, to quickly integrate payments into your application. Infrastructure on the other hand gives you full control over your userbase and feature functionality. ',
  },
  {
    relatedId: 6,
    id: 6,
    question: 'What is the difference between paymail and addresses?',
    answer:
      'Paymails are aliases that resolve addresses, but have the additional advantage to be transaction endpoints that enable instant p2p payments. While you can use both, we recommend using the scalable paymail solution for increased speed and privacy.',
  },
  {
    relatedId: 6,
    id: 7,
    question:
      'What is the difference between a STAS token and a Run or Bitcoin Computer token?',
    answer:
      'While L1 (STAS) and L2 (RUN, Bitcoin Computer) solutions are viable for a variety of use cases, they differ in degree of decentralization and type of enforcement. STAS token advantage is, that it does not rely on a single party to confirm the transaction, but rather relies on existing bitcoin miner infrastructure.',
  },
  {
    relatedId: 3,
    id: 8,
    question: 'How do I export my funds from the Mnemonic?',
    answer:
      'The Mnemonic phase is a HD private key that has the funds on the m44/0/0/0/{1...x} path, the standard path for wallet storage. Since we are multi address based, the HD Privatekey resolves to a variety of private keys under that path.',
  },
  {
    relatedId: 4,
    id: 9,
    question: 'Do I need Bitcoin SV to make a token transfer?',
    answer:
      'At Relysia we try our best to avoid having transaction fees for any kind of transfer. This allows users to join the ecosystem without needing to first buy the underlying bitcoin currency and use the blockchain as a pure infrastructure solution.',
  },
]
