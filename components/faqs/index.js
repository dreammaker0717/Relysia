import Container from '../common/container'
import styles from './index.module.css'
import Title from '../common/title'
import Itemsjs from 'itemsjs'
import { useSelector } from 'react-redux'
import walletSelector from '@/redux/selectors/wallet'
import authSelector from '@/redux/selectors/auth'
import router from 'next/router'
import { debounce } from 'lodash'

import CardPlatformGray from '../common/cards/card-platform-gray'
import CustomInput from '../common/inputs/custom-input'
import { dataFaqs as data, questionsFaq } from './dataFaqs'
import AccordionComponent from '../common/accordion'
import { useState } from 'react'
const graphsSVG = '/assets/images/docs/graphs.svg'
const searchIcon = '/assets/images/searchIcon.svg'

var configuration = {
  searchableFields: ['question', 'answer', 'relatedId'],
  aggregations: {
    relatedId: {
      title: 'relatedId',
      size: 100,
    },
  },
}

const FaqsHome = () => {
  const [faqsData, setFaqsData] = useState(questionsFaq)
  const { userData, checked } = useSelector(authSelector)
  const { walletData } = useSelector(walletSelector)
  const searchRequest = debounce((input) => {
    const search = itemjs.search({
      query: input,
      per_page: 100,
      filters: [],
    })

    if (
      search &&
      search.data &&
      search.data.items &&
      search.data.items.length !== 0
    ) {
      setFaqsData(search.data.items)
    } else {
      setFaqsData([
        {
          relatedId: 2,
          id: 1,
          question: `Not finding what you're looking for ?`,
          answer: 'Contact support now',
        },
      ])
    }
  }, 100)
  function onSearch(e) {
    var input = e.target.value
    if (!input || input === '') {
      return setFaqsData(questionsFaq)
    }
    input = input.toLowerCase()
    searchRequest(input)
  }
  function onSelect(e) {
    var input = e
    if (!input || input === '') {
      return setFaqsData(questionsFaq)
    }
    const search = itemjs.search({
      // query: input,
      per_page: 100,
      filters: {
        relatedId: [input],
      },
    })
    // console.log(search)
    if (
      search &&
      search.data &&
      search.data.items &&
      search.data.items.length !== 0
    ) {
      setFaqsData(search.data.items)
    } else {
      setFaqsData([
        {
          relatedId: 2,
          id: 1,
          question: `Not finding what you're looking for ?`,
          answer: 'Contact support now',
        },
      ])
    }
  }
  const handleClick = (e) => {
    e.preventDefault()
    // console.log(e.currentTarget.value)
    if (e.currentTarget.value) {
      if (userData && checked) {
        if (!walletData || (walletData && !Object.values(walletData).length)) {
          return router.push('/app/new-wallet')
        } else {
          window.location.href = `/game/${e.currentTarget.value}`
        }
      } else {
        router.push(`/auth/login?redirectto=/game/${e.currentTarget.value}`)
      }
    }
  }

  var itemjs = Itemsjs(questionsFaq, configuration)
  return (
    <section className={styles.base}>
      <img src={graphsSVG} alt="Graph" className={styles.graphSVG} />
      <Container classNames="-mt-1/4">
        <Title heading="h2" classNames="text-center max-w-3xl m-auto mt-8 ">
          Frequently Asked Questions
        </Title>
        <Title heading="h1" classNames="text-center max-w-3xl m-auto  mb-20">
          Hello, How can we help you ?
        </Title>
        <CustomInput
          icon={searchIcon}
          placeholder="Search"
          onChange={onSearch}
          type="text"
        />
        {faqsData && faqsData.length === 0 ? (
          <div className={`${styles.cards} mt-16`}>
            {data.map((card) => (
              <CardPlatformGray
                // onClick={()=>onSelect(card.id)}
                functionOnclick={onSelect}
                key={card.id}
                relatedId={card.id}
                title={card.title}
                p={card.content}
                icon={card.icon}
                href={'#'}
                btnFill={
                  card.id % 2 === 0 ? 'var(--relGreen)' : 'var(--relPink)'
                }
                shadow={
                  card.id % 2 === 0
                    ? 'shadow-platformCardIconGreen'
                    : 'shadow-platformCardIconPink'
                }
              />
            ))}
          </div>
        ) : (
          <>
            {faqsData.map((faq) => (
              <AccordionComponent
                key={`${faq.id}-accordIoncomponent`}
                faqId={faq.id}
                heading={faq.question}
                details={faq.answer}
              />
            ))}
          </>
        )}
      </Container>
    </section>
  )
}

export default FaqsHome
