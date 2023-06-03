export default function NewWalletStep1({
  walletTypes,
  formData,
  index1,
  ...props
}) {
  return (
    <div>
      {walletTypes &&
        walletTypes.length > 0 &&
        walletTypes.map((element, index) => (
          <div
            className={`flex flex-row justify-between items-center cursor-pointer py-3 px-2 ${
              element.name === 'Standard'
                ? 'hover-create-wallet-steps1' : 'opacity-50 pointer-events-none'
            }`}
            onClick={() => {
              props.setIndex1(index)
              const cloneddata = { ...formData, walletType: element.name }
              props.setformData(cloneddata)
              console.log(cloneddata)
              props.forceNextStep()
            }}
            style={{
              background: index === index1 ? 'rgba(65, 65, 241, 0.3)' : '',
              zIndex: '1',
              transition: 'all .2s ease-in-out',
              width: '100%',
              minHeight: 'min-content',
              border: ' 1px solid rgba(76, 73, 109, 0.08)',
              borderRadius: 16,
              marginBottom: 16,
            }}
          >
            <div className="flex flex-row">
              {' '}
              <img
                src={element.icon}
                style={{
                  height: '75%',
                  borderRadius: '8px',
                  boxShadow: '0px 10px 10px rgba(76, 73, 109, 0.08)',
                }}
              />
              <div style={{ marginInline: 16 }}>
                <div className="font-bold" style={{ lineHeight: 1 }}>
                  {element.name}
                </div>
                <div style={{ opacity: '0.5' }}>{element.discription}</div>
              </div>
            </div>{' '}
            <img
              src="https://firebasestorage.googleapis.com/v0/b/vaionexdev.appspot.com/o/wallet_icons%2Flefticonwallet.svg?alt=media"
              style={{
                height: '85%',
                borderRadius: '8px',
                filter: element.name === 'Standard' ? '' : 'grayscale(1)' ,
              }}
            />
          </div>
        ))}
    </div>
  )
}
