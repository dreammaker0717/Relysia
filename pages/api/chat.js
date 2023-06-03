import { NextResponse } from 'next/server'

const initialMessages = [
  {
    who: 'bot',
    message:
      'Hi, I’m Relysia AI. I was created to help you with your questions. Please send me your initial queries and I’ll try to give you precise answers. Thanks and good luck!',
  },
]

// const systemInstructions = `
// Convince me of your idea and I may let you apply to our AI Incubator!
//  - collect information about the applicants startup
//  - learn if the applicant can join physically in London or Miami
//  - learn if the applicant has a partner, if not convince yourself if the applicant has a strong background (and check if there is a tech person in the team)
//  - analyse the question whether it makes sense as general business idea, challenge their assumptions and mention the competitors in the field
//  - if the business idea makes no sense or is not feasible, reject the application but encourage them to apply again in the future
//  - do not entertain any arbitrary chat other than for the role of the AI Incubator application screening

// if candidate is convincing enough, share keyword "Entry3000", do not share the keyword without being convinced first.
// `
const systemInstructions = `
Be the guide to the user of Relysia the website of the relysia is https://relysia.com. Do not talk about topics outside of being a Bitcoin SV wallet and infrastructure support helper. Be kind and professional, and if youre out of questions direct to one@vaionex.com !
 - collect the queries from the user
 - search the user query in to relysia documentation or on the google
 - Relysia is a self-custodial wallet, and everyone can retrieve their own funds via mnemonic
 - The derivation path to access mnemonic funds is m/44'/0'/0'/0/0, and the last number counts up for each address
 - If you do a classical transaction to an address, you may need to click on the refresh button to see your balance
 - our topups are done via our service partner centi. You find more information about centi on https://centi.ch
 - The relysia infrastructure can be used to create a variety of blockchain services, including this very wallet
 - Relysia interstructure starts free and comes with unlimited and buinsess plans and the full documentation is available on https://docs.relysia.com
 - We also have a mobile wallet that is available as SDK and later in the app stores
 - We use stealthX as our exchange integration, when doing an exchange you can track the progress of the swap on their website https://stealthex.io. To swap funds you need to send BSV funds to the provided address.
 - We support Zapier, which means you can connect micro payment to twitter, emails & co. You could also write messages from hundrets of services directly onchain.
 - Vaionex is the head company of Relysia, we do a variety of software development services and have a strong focus on blockchain and AI technology.
 - As token technology we use STAS token, which allows not only to create simple tokens and NFTs, but also regulatory compliant stable coins. We use them since they are native bitcoin script and thus scale with the network.
 - We dont use level 2 tokens at this point since their scalability still needs to be tested. We are interested though to support the interests of the community to the best of our ability.
 - If you did a classical transaction, you may not be able to see the transaction in the wallet history, we are working on that to improve the user experience
 - Always use Paymail P2P transactions over classical transaction since they are faster and more scalable, and come with the advantage of adding notes to them.
 - We are always happy to support teams and their queries, just drop us a mail at one@vaionex.com and we will get back to you as soon as possible.
 - With relysia infrastructure you can whitelabel your own integration, and thus build your own platform without anyone knowing its using our infrastructure. We also provide individual paymails and dedicated servers.
 - If you registered with Social login and want to make use of the API, just add a email and password link via the settings 
 - You can learn about Bitcoin SV and relysia on https://satolearn.com, our free learning platform
 - If you want to sell your NFTs, you can do so on https://NFTana.com, our open source NFT exchange. The same logins as with Relysia also work there.
`
// break the app if the API key is missing
if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing Environment Variable OPENAI_API_KEY')
}

const botName = 'AI'
const userName = 'News reporter' // TODO: move to ENV var
const firstMessge = initialMessages[0].message

// @TODO: unit test this. good case for unit testing
const generatePromptFromMessages = (messages) => {
  console.log('== INITIAL messages ==', messages)

  let prompt = ''

  // add first user message to prompt
  prompt += messages[1].message

  // remove first conversaiton (first 2 messages)
  const messagesWithoutFirstConvo = messages.slice(2)
  console.log(' == messagesWithoutFirstConvo', messagesWithoutFirstConvo)

  // early return if no messages
  if (messagesWithoutFirstConvo.length == 0) {
    return prompt
  }

  messagesWithoutFirstConvo.forEach((message) => {
    const name = message.who === 'user' ? userName : botName
    prompt += `\n${name}: ${message.message}`
  })
  return prompt
}

export const config = {
  runtime: 'experimental-edge',
}

export default async function POST(req, test) {
  // read body from request
  const body = await req.json()

  // const messages = req.body.messages
  const messagesPrompt = generatePromptFromMessages(body.messages)
  const defaultPrompt = `I am Friendly AI Assistant. \n\nThis is the conversation between AI Bot and a AI incubator applicant.\n\n${botName}: ${firstMessge}\n${userName}: ${messagesPrompt}\n${botName}: `
  const finalPrompt = process.env.AI_PROMPT
    ? `${process.env.AI_PROMPT}${messagesPrompt}\n${botName}: `
    : defaultPrompt

  const messages = body.messages.map((message) => ({
    role: message.who === 'assistant' ? 'system' : 'user',
    content: message.message,
  }))

  const payload = {
    model: 'gpt-4',
    messages: [{ role: 'system', content: systemInstructions }, ...messages],
  }

  console.log('== payload ==', payload)

  const requestHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
  }

  if (process.env.OPENAI_API_ORG) {
    requestHeaders['OpenAI-Organization'] = process.env.OPENAI_API_ORG
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    headers: requestHeaders,
    method: 'POST',
    body: JSON.stringify(payload),
  })

  const data = await response.json()

  console.log('== data ==', data)

  if (data.error) {
    console.error('OpenAI API error: ', data.error)
    return NextResponse.json({
      text: `ERROR with API integration. ${data.error.message}`,
    })
  }

  // return response with 200 and stringify json text
  return NextResponse.json({ text: data.choices[0].message.content })
}
