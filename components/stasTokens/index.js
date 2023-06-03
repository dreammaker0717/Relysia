import React from 'react'
import { useDispatch } from 'react-redux'
import Icon from '@ant-design/icons/lib/components/Icon'
import { useRouter } from 'next/router'
import { makeStyles } from '@material-ui/core/styles'
import { tokenmanageIcon } from '../wallet/icons'
import Link from 'next/link'
import 'firebase/firestore'
import { IconButton } from '@material-ui/core'
import useTokens from '../../hooks/useTokens'
import InfiniteScroll from 'react-infinite-scroll-component'
import Loader from '../loader'

const useStyles = makeStyles((theme) => ({
  abutton: {
    color: 'white',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingInline: 18,
    height: 45,
    aspectRatio: '2.825',
    borderRadius: 12,
    boxShadow: '0px 20px 40px rgba(65, 124, 241, 0.15)',
    transition: 'all .20s linear',
    '&:hover': {
      filter: 'brightness(.9) saturate(.7)',
      boxShadow: '0px 20px 40px rgba(65, 124, 241, 0.45)',
      transform: 'translateY(-7px)',
    },
  },
  largeAvatar: {
    aspectRatio: '1/1',
    width: 'calc(100%*25/144)',
    marginTop: '7%',
    boxShadow: '0px 20px 20px rgba(65, 124, 241, .09)',
    marginLeft: '10%',
  },
  boxContainer: {
    fontSize: '14px',
    color: 'rgba(62, 60, 85, 1)',
    paddingBottom: '10px',
    borderRadius: '16px',
    transition: 'all .2s ease-in-out',
    '&:hover': {
      backgroundColor: 'rgba(65, 124, 241, .7878)',
    },
  },
}))

function StasTokenComponent(props) {
  const dispatch = useDispatch()
  const router = useRouter()
  const classes = useStyles()

  const { tokens, canLoadMore, loadMore, loading } = useTokens()

  function LoadMoreSection() {
    if (loading && tokens.length == 0) return <Loader />
    return null
  }

  return (
    <section
      style={{ color: 'rgba(62, 60, 85, 1)' }}
      className="py-3 md:py-8 fontSofiaPro"
    >
      <div className="container customize-con">
        <div className="stas-view-con">
          <div className="stas-head" style={{ position: 'relative' }}>
            <h1
              className="text-center	 md:text-left w-full"
              style={{ fontWeight: '700', fontSize: '32px' }}
            >
              Manage
            </h1>
            <div
              className="block md:hidden"
              style={{ position: 'absolute', left: '-4%' }}
            >
              <IconButton onClick={() => router.back()}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </IconButton>
            </div>
            <div
              className="hidden md:block"
              style={{ position: 'absolute', right: '16%' }}
            >
              <button
                onClick={(e) => {
                  e.preventDefault()
                  router.push('/app/mint', undefined, { scroll: false })
                }}
                className={classes.abutton}
                style={{
                  backgroundImage:
                    'linear-gradient(113deg, rgba(231,0,96,1) 0%, rgba(252,143,12,1) 100%)',
                }}
              >
                <div style={{ fontSize: 16, fontWeight: '600', width: 120 }}>
                  CREATE TOKEN
                </div>
                <div style={{ paddingLeft: 6, marginBottom: 5 }}>
                  {' '}
                  <Icon component={tokenmanageIcon} />
                </div>
              </button>
            </div>
          </div>
          <LoadMoreSection />

          <InfiniteScroll
            dataLength={tokens.length}
            next={loadMore}
            hasMore={canLoadMore}
            loader={
              <div className="py-3">
                <div className="dots-loader"></div>
              </div>
            }
            scrollThreshold={0.9}
            style={{ overflowY: 'hidden' }}
          >
            <div
              className="stas-tokenDetails grid fontSofiaPro grid-cols-1  lg:grid-cols-2 xl:grid-cols-3 		 gap-6  "
              style={{ maxWidth: '90%' }}
            >
              {tokens &&
                tokens.map((ele, index) => {
                  const isToken = ele.sn == 0
                  return (
                    <Link href={`/app/nft/${ele.tokenId}?sn=${ele.sn}`}>
                      <div
                        style={{
                          cursor: 'pointer',
                          width: '100%',
                          aspectRatio: '5/1',
                          backgroundColor: 'rgba(65, 124, 241, 0.03)',
                          borderRadius: 16,
                        }}
                        key={'stas-token' + index}
                      >
                        <div className={classes.boxContainer}>
                          <div
                            style={{
                              position: 'relative',
                              cursor: 'pointer',
                              display: 'flex',
                              flexDirection: 'row',
                              alignItems: 'center',
                              marginBottom: 20,
                            }}
                          >
                            <div className={classes.largeAvatar}>
                              <img
                                alt={ele.symbol}
                                src={ele.image}
                                onError={({ currentTarget }) => {
                                  currentTarget.onerror = null // prevents looping
                                  currentTarget.src =
                                    'https://firebasestorage.googleapis.com/v0/b/vaionexdev.appspot.com/o/setting_page%2FbitcoinSv.svg?alt=media'
                                }}
                                style={{
                                  width: '100%',
                                  height: '100%',
                                  borderRadius: '10px',
                                }}
                              />
                            </div>
                            <p
                              style={{
                                position: 'absolute',
                                top: '5%',
                                right: '7%',
                              }}
                            >
                              {!ele.sn
                                ? ele.amount
                                : ele.sn[0] + '/' + ele.supply}
                            </p>
                          </div>
                          <p
                            style={{
                              cursor: 'pointer',
                              marginLeft: '10%',
                              fontWeight: 'bolder',
                            }}
                          >
                            {ele.totalSupply}
                          </p>
                          <p style={{ fontWeight: '400', marginLeft: '10%' }}>
                            {ele.symbol}
                          </p>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              {!loading && tokens.length === 0 && (
                <div>
                  {' '}
                  <p style={{ marginLeft: 20 }}>
                    You don't have any tokens yet,
                    <Link href="/app/mint">
                      <span className="link"> Create One!</span>
                    </Link>
                  </p>
                </div>
              )}
            </div>
          </InfiniteScroll>
        </div>
      </div>
    </section>
  )
}

export default StasTokenComponent
