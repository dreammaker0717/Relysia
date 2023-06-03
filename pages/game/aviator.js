import React, { useState } from 'react'
import Head from 'next/head'
import NoSSR from '@/utils/noSSR'
import { useSelector } from 'react-redux'
import authSelector from '@/redux/selectors/auth'
import Loader from '../../components/loader'
import router from 'next/router'
import apiConfig from '@/config/relysiaApi'

function Aviator(props) {
  const { userData, checked } = useSelector(authSelector)
  const [isDisplay, setIsDisplay] = React.useState(false)
  const listRef = React.useRef(null)
  const [transactionData, setTransactionData] = React.useState([])

  React.useEffect(() => {
    if (userData) {
      if (document.getElementById('gameStarterAviator').value === '1') {
        document.getElementById('gameStarterAviator').setAttribute('value', '2')
        document.getElementById('gameStarterAviator').value = '2'
      }
    }
    window.axios = apiConfig
  }, [userData])
  if (!userData && checked) {
    router.push('/auth/login?redirectto=/game/aviator')
  }

  const toggelList = () => {
    setIsDisplay(!isDisplay)

    // listRef.current.scrollIntoView()
  }

  React.useEffect(() => {
    window.isDisplay = isDisplay
    if (!isDisplay) {
      setTransactionData([])
    }
    // if (isDisplay && transactionData?.length !== 0) {
    //   // var items = document.getElementsByClassName("fade-item");
    //   // for (let i = 0; i < items.length; ++i) {
    //   //   fadeIn(items[i], i * 1000)
    //   // }

    //   const div = document.getElementById('transactions')
    //   div.scrollTo({
    //     top: div.scrollHeight,
    //     behavior: 'smooth',
    //   })

    // }
  }, [isDisplay])

  React.useEffect(() => {
    if (transactionData?.length !== 0) {
      const div = document.getElementById('transactions')
      div.scrollTo({
        top: div.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, [transactionData])

  React.useEffect(() => {
    document.addEventListener('transactions', function (e) {
      // console.log(e); // Prints "Example of an event"
      setTransactionData(e.data)
    })
  }, [])

  const fadeIn = (item, delay) => {
    setTimeout(() => {
      item.classList.add('fadein')
    }, delay)
  }

  return (
    <NoSSR>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=0.9 ,maximum-scale=1.0, 
    user-scalable=0"
        />
        <title>The Aviator: The Game</title>
        <meta
          name="description"
          content="Demo of the game: The Making of 'The Aviator': Animating a Basic 3D Scene with Three.js"
        />
        <meta
          name="keywords"
          content="three.js, webgl, tutorial, game, 3d, animation, airplane, web development, javascript"
        />
        <meta name="author" content="Karim Maaloul for Codrops" />
        <link rel="shortcut icon" href="/static/aviator/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css?family=Playfair+Display:400,700,700italic"
          rel="stylesheet"
          type="text/css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="/static/aviator/css/demo.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="/static/aviator/css/game.css"
        />
        <script
          type="text/javascript"
          src="/static/aviator/js/TweenMax.min.js"
        ></script>
        <script
          type="text/javascript"
          src="/static/aviator/js/three.min.js"
        ></script>
        <script
          type="text/javascript"
          src="/static/aviator/js/game.js"
        ></script>
      </Head>
      <input id="gameStarterAviator" value={'1'} style={{ display: 'none' }} />
      {userData ? (
        <div style={{ height: 'calc(100vh - 88px)' }}>
          <div className="game-holder" id="gameHolder">
            <div className="header">
              <div className="score" id="score">
                <div className="score__content" id="level">
                  <div className="score__label">level</div>
                  <div
                    className="score__value score__value--level"
                    id="levelValue"
                  >
                    1
                  </div>
                  <svg
                    className="level-circle"
                    id="levelCircle"
                    viewbox="0 0 100 100"
                  >
                    <circle
                      id="levelCircleBgr"
                      r="20"
                      cx="50"
                      cy="50"
                      fill="none"
                      stroke="#d1b790"
                      strokeWidth="6px"
                    />
                    <circle
                      id="levelCircleStroke"
                      r="20"
                      cx="50"
                      cy="50"
                      fill="none"
                      stroke="#68c3c0"
                      strokeWidth="4px"
                      strokeDasharray="125"
                    />
                  </svg>
                </div>
                <div className="score__content" id="dist">
                  <div className="score__label">distance</div>
                  <div
                    className="score__value score__value--dist"
                    id="distValue"
                  >
                    000
                  </div>
                </div>
                <div className="score__content" id="energy">
                  <div className="score__label">energy</div>
                  <div
                    className="score__value score__value--energy"
                    id="energyValue"
                  >
                    <div className="energy-bar" id="energyBar"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="world" id="world">
              <div className="score__content" id="transactionDiv">
                <div className="score__label">Transactions</div>
                <div
                  className="score__value score__value--dist"
                  id="transactionNumber"
                  style={{ cursor: 'pointer' }}
                  onClick={() => toggelList()}
                >
                  0
                </div>
              </div>
              {/* FPS */}
              {/* <h2 id='fps'>0</h2> */}
              {transactionData?.length != 0 && (
                <div
                  ref={listRef}
                  id="transactions"
                  className="transactions"
                  style={{ display: isDisplay ? 'block' : 'none' }}
                >
                  <ul id="transactionList">
                    {transactionData?.map((x, index) => {
                      return (
                        <li key={index} className="fade-item">
                          <a
                            href={`https://whatsonchain.com/tx/${x.txId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {x.txId}
                          </a>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )}
            </div>
            <div className="message message--replay" id="replayMessage">
              Click to Replay
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </NoSSR>
  )
}

export default Aviator
