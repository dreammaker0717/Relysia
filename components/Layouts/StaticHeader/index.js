import Link from 'next/link'
import Logo from '../../common/logo'
import _JSXStyle from 'styled-jsx/style'

function StaticHeader() {
  return (
    <>
      <div className="row  align-items-center">
        <div className="col-12 headerWrapper">
          <div className="container py-4">
            <Logo color={`black`} />
          </div>
        </div>
      </div>
      <style jsx>
        {`

   .headerWrapper{
    background: #fff;
    z-index: 20;
    box-shadow: rgb(0 0 0 / 16%) 0px 1px 7px 0px;
}


   }
  
`}
      </style>
    </>
  )
}

export default StaticHeader
