import { Tab } from '@headlessui/react'

export default function TransactionTabs({ transactions }) {
  return (
    <Tab.Group>
      <Tab.List className="border-b">
        {transactions.map((_, i) => (
          <Tab
            className={({ selected }) =>
              `${
                selected
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500'
              } font-medium py-4 px-1`
            }
          >
            T{i}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels>
        {transactions.map((tx) => (
          <Tab.Panel className="pt-5 text-gray-500 break-words">{tx}</Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  )
}
