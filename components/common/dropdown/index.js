import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { Tooltip } from 'antd'
import {
  ChevronDownIcon,
  AdjustmentsHorizontalIcon,
} from '@heroicons/react/20/solid'

export default function FilterDropdown({ children }) {
  return (
    <div className="top-16 text-right">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button aria-label='Transaction Details' className="inline-flex w-full justify-center rounded-md bg-white bg-opacity-20  text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            <Tooltip placement="top" title="Transaction Details">
              <AdjustmentsHorizontalIcon
                className="h-6 w-6 text-gray-600 "
                aria-hidden="true"
              />
            </Tooltip>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute -left-14 mt-2 w-36 origin-top-right divide-y divide-gray-100 rounded-md bg-white z-20 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>{({ active }) => <>{children}</>}</Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}

function EditInactiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 13V16H7L16 7L13 4L4 13Z"
        fill="#EDE9FE"
        stroke="#A78BFA"
        strokeWidth="2"
      />
    </svg>
  )
}

function EditActiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 13V16H7L16 7L13 4L4 13Z"
        fill="#8B5CF6"
        stroke="#C4B5FD"
        strokeWidth="2"
      />
    </svg>
  )
}
