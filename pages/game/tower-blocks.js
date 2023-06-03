import React from 'react'
import Head from 'next/head'
import NoSSR from '@/utils/noSSR'
import { useSelector } from 'react-redux'
import authSelector from '@/redux/selectors/auth'
import Loader from '../../components/loader'
import Router from 'next/router'
import apiConfig from '@/config/relysiaApi'

function TowerBlocks(props) {
  const { userData, checked } = useSelector(authSelector)
  React.useEffect(() => {
    window.axios = apiConfig
    if (userData) {
      document.getElementById('gameStarterTower').setAttribute('value', '2')
      document.getElementById('gameStarterTower').value = '2'
    }
  }, [userData])
  if (!userData && checked) {
    Router.push('/auth/login?redirectto=/game/tower-blocks')
  }

  return (
    <NoSSR>
      <Head>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=0.9 ,maximum-scale=1.0, 
    user-scalable=0"
          user-scalable="no"
        />
        <title>Tower Blocks | Relysia</title>
        <link rel="stylesheet" href="/static/tower-blocks/style.css" />
        <script></script>
        <script
          type="text/javascript"
          src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r83/three.min.js"
        ></script>
        <script
          type="text/javascript"
          src="https://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min.js"
        ></script>
        <script
          type="text/javascript"
          src="/static/tower-blocks/script.js"
        ></script>
      </Head>
      <div style={{ height: '100vh' }}>
        <input id="gameStarterTower" value={'1'} style={{ display: 'none' }} />
        {userData ? (
          <div id="container">
            <div id="game"></div>
            <div id="score">0</div>
            {/* <p id="level"></p> */}
            <div id="instructions">
              Click (or press the spacebar) to place the block
            </div>
            <div className="game-over">
              <h2>Game Over</h2>
              <p>You did great, you're the best.</p>
              <p>Click or spacebar to start again</p>
            </div>
            <div className="game-ready">
              <div id="start-button">Start</div>
              <div></div>
            </div>
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </NoSSR>
  )
}

export default TowerBlocks
