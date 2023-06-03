// import {
//   CloudOneSVG,
//   CloudTwoSVG,
//   CloudThreeSVG,
// } from '../../components/common/svgs/clouds'
import HomeMain from '../../components/home'

const Home = ({allPost}) => {
  return (
    <>
{/* <CloudOneSVG /> 
      <CloudTwoSVG />  */}
      {/* <CloudThreeSVG top="30%" opacity="0.2" />
      <CloudThreeSVG top="65%" /> */}
      <HomeMain allPost={allPost} />
    </>
  )
}

export default Home
