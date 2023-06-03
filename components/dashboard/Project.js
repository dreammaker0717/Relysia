import { Cog6ToothIcon, TrashIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'

export default function Project({ id, title, onDelete }) {
  function handleDelete() {
    // deleteService(id).then(response => onDelete(id))
  }

  return (
    <li
      className="col-span-1 text-white rounded-lg shadow divide-y divide-gray-500"
      style={{ backgroundColor: 'var(--customInput)' }}
    >
      <Link href={`/dashboard/${id}`}>
        <a className="w-full flex items-center justify-between p-6 space-x-6">
          <div className="flex-1 truncate">
            <div className="flex items-center space-x-3">
              <h3 className="text-gray-100 text-xl font-medium truncate">
                {title}
              </h3>
            </div>
          </div>
        </a>
      </Link>
      <div>
        <div className="-mt-px flex divide-x divide-gray-500">
          <div className="w-0 flex-1 flex">
            <Link href={`/dashboard/${id}`}>
              <a className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-200 font-medium border border-transparent rounded-bl-lg hover:text-gray-500">
                <Cog6ToothIcon
                  className="w-5 h-5 text-gray-400"
                  aria-hidden="true"
                />
                <span className="ml-3">Settings</span>
              </a>
            </Link>
          </div>
          <div className="-ml-px w-0 flex-1 flex">
            <a
              className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-200 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
              onClick={handleDelete}
            >
              <TrashIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
              <span className="ml-3">Delete</span>
            </a>
          </div>
        </div>
      </div>
    </li>
  )
}
