import Loader from 'components/loader'
import PropTypes from 'prop-types'

export default function FullScreenLoader({open}){
  if(!open) return null

  return <div className='fixed inset-0 bg-black/25 flex items-center justify-center z-50'>
    <Loader />
  </div>
}
FullScreenLoader.propTypes = {
  open: PropTypes.bool
}