import clsx from 'clsx'


export const LoadingChatLine = () => (
  <div className="flex min-w-full animate-pulse px-3 py-2 bg-gray-100 mb-5 rounded-lg px-3 py-2 shadow-lg ">
    <div className="flex flex-grow space-x-3">
      <div className="min-w-0 flex-1">
        <p className="font-large text-xxl text-gray-900">
          <a href="#" className="hover:underline">
            Relysia (AI)
          </a>
        </p>
        <div className="space-y-4 pt-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 h-2 rounded bg-zinc-500"></div>
            <div className="col-span-1 h-2 rounded bg-zinc-500"></div>
          </div>
          <div className="h-2 rounded bg-zinc-500"></div>
        </div>
      </div>
    </div>
  </div>
)

// util helper to convert new lines to <br /> tags
const convertNewLines = (text) =>
  text.split('\n').map((line, i) => (
    <span key={i}>
      {line}
      <br />
    </span>
  ))

export function ChatLine({ who = 'bot', message }) {
  if (!message) {
    return null
  }
  const formatteMessage = convertNewLines(message)

  return (
    <div
      className={
        who != 'bot' ? 'float-right clear-both' : 'float-left clear-both'
      }
    >
      <div className="float-right mb-5 rounded-lg px-3 py-2 shadow-lg  bg-black/70 ">
        <div className="flex space-x-3">
          <div className="flex-1 gap-4">
            <p className="font-large text-sm text-gray-400">
              <a href="#" className="hover:underline">
                {who == 'bot' ? 'Relysia (AI)' : 'You'}
              </a>
            </p>
            <p
              className={clsx(
                'text text-gray-100 ',
                who == 'bot' ? 'font-normal ' : 'text-gray-200',
              )}
            >
              {formatteMessage}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
