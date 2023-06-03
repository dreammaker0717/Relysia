import ToggleSwitch from '../Toggle-switch'
const dummyImg = '/assets/images/docs/platform/wallet.svg'

function AddApplication({ registeredApp, handleClick }) {
  return (
    <>
      <div className="row  my-4 align-items-center">
        {registeredApp.length > 0 &&
          registeredApp.map((item, index) => (
            <div
              className="col-6"
              key={`wallet-${index}`}
              onClick={handleClick(item)}
            >
              <div className="row align-items-center justify-content-between mx-0 py-2 my-2 wallet">
                <div className="col">
                  <div className="form-row align-items-center">
                    <div className="col-auto">
                      <img src={dummyImg} width={'56'} height={'56'} />
                    </div>
                    <div className="col-auto">
                      <p className="font-weight-bold text-uppercase">
                        {item.name}
                      </p>
                      <p className="subHeading">{item.shortDescription}</p>
                    </div>
                  </div>
                </div>
                <div className="col-auto">
                  <ToggleSwitch checked={false} />
                </div>
              </div>
            </div>
          ))}
      </div>
      <style jsx>
        {`
          .wallet {
            background: rgba(65, 124, 241, 0.05);
            border-radius: 16px;
            cursor: pointer;
          }
          .subHeading {
            color: #666f99;
          }
        `}
      </style>
    </>
  )
}

export default AddApplication
