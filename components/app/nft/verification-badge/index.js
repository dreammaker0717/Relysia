import { CheckBadgeIcon } from '@heroicons/react/24/solid'

export default function VerificationBadge({ verified }) {
  return (
    <div
      className={`${
        verified ? 'bg-blue-50 text-blue-500' : 'bg-gray-100 text-gray-500'
      } rounded-full py-1 px-3 flex items-center gap-1`}
      style={{ width: 'fit-content' }}
    >
      {verified ? (
        <CheckBadgeIcon variant="Bold" className="w-4 h-4" />
      ) : (
        <div className={`bg-gray-400 rounded-full w-2 h-2`} />
      )}
      {verified ? 'Verified' : 'Other'}
    </div>
  )
}
