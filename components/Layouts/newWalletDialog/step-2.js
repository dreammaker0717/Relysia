import InputwithIcon from '../../common/inputs/InputwithIcon'
import InputwithPassword from '../../common/inputs/InputwithPassword'

export default function NewWalletStep2({
  walletName,
  walletPassword,
  mnemonicPhrase,
  ...props
}) {
  function setwalletName(e) {
    props.setwalletName(e.target.value)
  }
  function setMnemonicPhrase(e) {
    props.setMnemonicPhrase(e.target.value)
  }
  function setwalletPassword(e) {
    props.setwalletPassword(e.target.value)
  }

  return (
    <div>
      <div className="w-full mt-6">
        <InputwithIcon
          onChange={setwalletName}
          name="wallet name*"
          iconState="wallet"
          //  helperText="Please Enter Email"
          value={walletName}
        />
      </div>
      <div className="w-full mt-6">
        <InputwithIcon
          onChange={setMnemonicPhrase}
          name="Restore Mnemonic Phrase (optional)"
          iconState="wallet"
          //  helperText="Please Enter Email"
          value={mnemonicPhrase}
        />
      </div>
      {props.index === 1 && (
        <div className="w-full mt-6 mb-6">
          <InputwithPassword
            onChange={setwalletPassword}
            name="password"
            inputProps={{ minlength: '4', maxlength: '25' }}
            //  helperText="Please Enter Email"
            value={walletPassword}
          />{' '}
        </div>
      )}
    </div>
  )
}
