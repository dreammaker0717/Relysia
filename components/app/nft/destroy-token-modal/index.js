import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import useRedeemToken from 'hooks/useRedeemToken'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import Spinner from 'components/common/Spinner'

export default function DestroyTokenModal({
  open,
  setOpen,
  tokenID,
  serialNumber,
  amount,
}) {
  const [value, setValue] = useState('')
  const [tokenRedeemed, setTokenRedeemed] = useState(false)
  const { redeemToken, loading, error } = useRedeemToken()
  const { push } = useRouter()

  const canDestroy = value === 'destroy'

  function closeModal() {
    setOpen(false)
  }

  async function handleRedeemToken() {
    const { error, msg } = await redeemToken(tokenID, serialNumber, amount)
    if (msg) {
      toast(msg, { type: 'success' })
      setTokenRedeemed(true)
      await push('/app/nft')
    }
    if (error)
      return toast(
        'We were unable to destroy your token. Please try again later',
        { type: 'error' },
      )
  }

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Permanently Destroy Token
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    You are about to permanently destroy this token. This action
                    is not reversible. To permanently destroy this token, type
                    "destroy" in the input below
                  </p>
                </div>

                <input
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="bg-gray-50 text-black rounded mt-6 p-2"
                  placeholder='Please type "destroy"'
                />

                <div className="mt-4">
                  {!loading && !tokenRedeemed && (
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 disabled:bg-gray-200 disabled:text-gray-600"
                      onClick={handleRedeemToken}
                      disabled={!canDestroy}
                    >
                      Permanently destroy token
                    </button>
                  )}

                  {tokenRedeemed && <div>Token destroyed</div>}
                  {loading && <Spinner />}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
