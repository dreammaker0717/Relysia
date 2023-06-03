import NextLink from 'next/link'
import { ArrowRightIcon } from '@heroicons/react/24/solid'

export default function ProjectGridItem({ id, name, description = '' }) {
  return (
    <div className="bg-white rounded-lg shadow-lg">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="w-14 h-14 bg-gray-100 rounded mr-5 flex-shrink-0"></div>
          <div
            className="font-medium truncate"
            style={{ color: 'var(--third)' }}
          >
            {name}
          </div>
        </div>
        <div className="text-sm text-gray-500 font-medium">{description}</div>
      </div>
      <NextLink href={{ pathname: '/dashboard/[id]', query: { id } }}>
        <a className="flex items-center justify-end px-5 py-4 border-t text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors">
          Open project <ArrowRightIcon className="w-5 h-5 ml-2 -rotate-45" />
        </a>
      </NextLink>
    </div>
  )
}
