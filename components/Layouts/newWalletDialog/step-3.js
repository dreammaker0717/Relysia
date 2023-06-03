export default function NewWalletStep3({
  walletIconIndex,
  walletDefaultTokens,
  ...props
}) {
  function setwalletIndex(e) {
    // console.log(e.currentTarget.getAttribute('value'))
    props.setwalletIconIndex(e.currentTarget.getAttribute('value'))
  }
  return (
    <div>
      <div style={{ marginBottom: 10, marginLeft: 10 }}>Choose Wallet Icon</div>
      <div className="grid  grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3 lg:gap-5">
        {walletDefaultTokens.map((icon, index1) => {
          return (
            <div
              className="col-span-1   lg:col-span-1  xl:col-span-1 flex flex-row justify-between aspect-w-1 aspect-h-1 "
              style={{
                borderRadius: '32px',
                background:
                  walletIconIndex == index1
                    ? 'rgba(65, 65, 241, 0.1)'
                    : 'rgba(65, 65, 241, 0.06)',
              }}
              onClick={setwalletIndex}
              value={index1}
              key={index1 + 'wallet-div'}
            >
              <div
                style={{
                  aspectRatio: '1/1',
                  position: 'relative',
                  width: '100%',
                }}
              >
                {walletIconIndex == index1 && (
                  <div
                    style={{
                      position: 'absolute',
                      right: '10%',
                      top: '10%',
                      width: '15%',
                      height: '15%',
                      backgroundImage:
                        'url(https://firebasestorage.googleapis.com/v0/b/vaionexdev.appspot.com/o/wallet_icons%2Fcheckedmark.svg?alt=media)',
                      backgroundPosition: 'center',
                      backgroundSize: 'cover',
                      backgroundRepeat: 'no-repeat',
                    }}
                  ></div>
                )}

                <div className="WalletsCreateIcon">
                  <div
                    className="WalletsIconsContainers"
                    style={{
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundImage: `url(${icon})`,
                    }}
                  >
                    {' '}
                  </div>
                  {/* <img src = {'https://firebasestorage.googleapis.com/v0/b/vaionexdev.appspot.com/o/wallet_icons%2FcreatenewwallsetIcon.svg?alt=media' } /> */}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
