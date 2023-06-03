import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { pageListData } from '../../../components/docs/data/DocsPageList'
import MainBackButton from '../../..//components/docs/new-component/MainBackButton'
import GoBackAndNextButton from '../../../components/docs/new-component/GoBackAndfNextButton'
import PageNotFoundPage from '../../../components/docs/pages/404'
import { Layout } from 'antd'
import NoSSR from '@/utils/noSSR'
import { listData } from '../../../components/docs/data/DocsListData'

function index() {
  const router = useRouter()
  let { id } = router.query
  const [value, setValue] = React.useState(null)

  useEffect(() => {
    if (id === 'authentication') {
      setValue(0)
    } else if (id === 'user') {
      setValue(1)
    } else if (id === 'wallet') {
      setValue(2)
    } else if (id === 'transactions') {
      setValue(3)
    } else if (id === 'tokens') {
      setValue(4)
    } else {
      setValue(null)
    }
  }, [id])

  return (
    <NoSSR>
      <div>
        <section
          className="about-area ptb-80 more-top-padding"
          style={{ paddingBottom: 0 }}
        >
          <Layout
            style={{
              minHeight: '100vh',
              backgroundColor: '#ffffff',
              borderTop: '#eaeaea 0.7px solid',
            }}
          >
            <Layout
              className="site-layout"
              style={{ backgroundColor: '#ffffff' }}
            >
              <div className="mt-4">
                <div className="page-container">
                  <MainBackButton
                    title={`${
                      value === null ? 'page not found' : listData[value].title
                    }`}
                  />

                  {value === null ? (
                    <PageNotFoundPage />
                  ) : (
                    pageListData[value === null ? 0 : value]
                  )}

                  <div
                    style={{ display: `${value === null ? 'none' : 'block'}` }}
                  >
                    <GoBackAndNextButton data={{ listData, value }} />
                  </div>
                </div>
              </div>
            </Layout>
          </Layout>
        </section>
      </div>
    </NoSSR>
  )
}

export default index
