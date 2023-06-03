export default function TokenStep1(props) {
  // console.log('somerandoms ',props.somerandoms)
  const { setSplittable } = props
  return (
    <div className="  w-full flex flex-row	 justify-evenly	 items-center py-3 px-2">
      <div>
        <h1>Choose the type of token you want to mint.</h1>
        <div className="grid fontSofiaPro grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 mt-8  auto-rows-auto gap-6  w-full">
          {props.tokensTypes &&
            props.tokensTypes.length > 0 &&
            props.tokensTypes.map((element, index) => (
              <div
                className={` col-span-1   lg:col-span-1  xl:col-span-1  w-11/12  flex flex-col justify-evenly items-start px-8`}
                onClick={() => {
                  props.setIndex1(index)
                  var cloneddata = { ...props.formData }
                  cloneddata.walletType = element.name
                  props.setformData(cloneddata)
                  setSplittable(element.name !== 'NFT')
                  props.forceNextStep()
                }}
                style={{
                  cursor: 'pointer',
                  backgroundImage: `url(/images/tokens/tokenTypebg.svg)
  ,${
    element.name === 'NFT'
      ? 'linear-gradient(314.7deg, #E70060 -4.56%, #FC8F0C 146.66%)'
      : 'linear-gradient(134.44deg, #3DB8F5 3.12%, #1F42EF 100%)'
  }`,
                  backgroundPosition: 'center,center',
                  backgroundSize: 'cover,cover',
                  backgroundRepeat: 'no-repeat,no-repeat',
                  zIndex: '1',
                  transition: 'all .2s ease-in-out',
                  width: '100%',
                  minHeight: 'min-content',
                  border: ' 1px solid rgba(76, 73, 109, 0.08)',
                  borderRadius: 19,
                  textAlign: 'start',
                  paddingTop: '8%',
                  paddingBottom: '5%',
                  color: 'white',
                }}
              >
                <div
                  className="font-bold mb-7"
                  style={{
                    lineHeight: 1,
                    fontSize: '32px',
                    fontWeight: '700',
                  }}
                >
                  {element.name}
                </div>
                <div style={{ fontSize: '16px' }}>{element.discription}</div>
                <div
                  className="font-bold mb-7 mt-7"
                  style={{
                    color: 'black',
                    width: '100%',
                    aspectRatio: '226/36',
                    background: 'white',
                    textAlign: 'center',
                    borderRadius: '25px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <div>Create</div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
