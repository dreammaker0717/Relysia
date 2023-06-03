import { Fragment } from 'react'
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/solid'

const tiers = [
  {
    name: 'Basic',
    href: '#',
    priceMonthly: 0,
    description: 'Quis suspendisse ut fermentum neque vivamus non tellus.',
  },
  {
    name: 'Essential',
    href: '#',
    priceMonthly: 100,
    description: 'Quis eleifend a tincidunt pellentesque. A tempor in sed.',
    highlighted: true,
  },
  {
    name: 'Premium',
    href: '#',
    priceMonthly: 200,
    description:
      'Orci volutpat ut sed sed neque, dui eget. Quis tristique non.',
  },
]
const features = [
  {
    name: 'All limited links',
    tiers: { Basic: true, Essential: true, Premium: true },
  },
  {
    name: 'Own analytics platform',
    tiers: { Basic: true, Essential: true, Premium: true },
  },
  {
    name: 'Chat support',
    tiers: { Basic: true, Essential: true, Premium: true },
  },
  {
    name: 'Number of users.',
    tiers: { Basic: '1 user', Essential: '3 users', Premium: 'Unlimited' },
  },
  {
    name: 'Next-gen NFTs',
    tiers: { Basic: true, Essential: true, Premium: true },
  },
  {
    name: 'Account Manager',
    tiers: { Basic: false, Essential: true, Premium: true },
  },
  {
    name: 'Number of data stores',
    tiers: { Basic: false, Essential: false, Premium: true },
  },
  {
    name: 'Satisfaction guaranteed',
    tiers: { Basic: true, Essential: true, Premium: true },
  },
]

export default function Pricing() {
  return (
    <div className="text-white">
      <div className="max-w-7xl mx-auto  py-16 sm:py-24 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between items-start mb-24 md:flex-row p-8 sm:p-0 ">
          <div>
            <div className="font-bold text-5xl mb-6">
              Simple, transparent pricing
            </div>
            <div className="text-gray-500">No contracts. No surprise fees.</div>
          </div>
          <div className="flex text-xl uppercase overflow-hidden mt-4 md:mt-0">
            <div className="p-2 bg-red-500 text-white rounded-l-xl">
              Monthly
            </div>
            <div className="p-2 text-gray-400 border-t border-b border-r border-gray-700 rounded-r-xl">
              Yearly
            </div>
          </div>
        </div>

        {/* xs to lg */}
        <div className="max-w-2xl mx-auto space-y-16 lg:hidden">
          {tiers.map((tier, tierIdx) => (
            <section key={tier.name}>
              <div className="px-4 mb-8">
                <h2 className="text-lg leading-6 font-medium">{tier.name}</h2>
                <p className="mt-4">
                  <span className="text-4xl font-extrabold">
                    ${tier.priceMonthly}
                  </span>{' '}
                  <span className="text-base font-medium">/mo</span>
                </p>
              </div>

              <table className="w-full">
                <thead>
                  <tr>
                    <th className="sr-only" scope="col">
                      Feature
                    </th>
                    <th className="sr-only" scope="col">
                      Included
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {features.map((feature) => (
                    <tr key={feature.name}>
                      <th
                        className="py-5 px-4 text-sm font-normal text-left"
                        scope="row"
                      >
                        {feature.name}
                      </th>
                      <td className="py-5 pr-4">
                        {typeof feature.tiers[tier.name] === 'string' ? (
                          <span className="block text-sm text-right">
                            {feature.tiers[tier.name]}
                          </span>
                        ) : (
                          <>
                            {feature.tiers[tier.name] === true ? (
                              <CheckIcon
                                className="ml-auto h-5 w-5 text-green-500"
                                aria-hidden="true"
                              />
                            ) : (
                              <XMarkIcon
                                className="ml-auto h-5 w-5 text-red-400"
                                aria-hidden="true"
                              />
                            )}

                            <span className="sr-only">
                              {feature.tiers[tier.name] === true ? 'Yes' : 'No'}
                            </span>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div>
                <a
                  href={tier.href}
                  className={`border border-red-500 rounded-full w-32 py-2 flex justify-center items-center mx-auto ${
                    tier.highlighted ? 'bg-white text-red-500' : ''
                  }`}
                >
                  Choose plan
                </a>
              </div>
            </section>
          ))}
        </div>

        {/* lg+ */}
        <div className="relative hidden lg:block">
          <div className="absolute inset-0 grid grid-flow-col z-10">
            <div></div>
            <div></div>
            <div
              className="rounded-xl transform scale-y-110"
              style={{
                background:
                  'linear-gradient(36.39deg, #ED2869 8.63%, #DE5E34 80.96%)',
              }}
            ></div>
            <div></div>
          </div>

          <table className="relative w-full h-px table-fixed z-20">
            <caption className="sr-only">Pricing plan comparison</caption>
            <thead>
              <tr>
                <th
                  className="pb-4 px-6 text-sm font-medium text-left"
                  scope="col"
                ></th>
                {tiers.map((tier) => (
                  <th
                    key={tier.name}
                    className="w-1/4 pb-4 px-6 text-lg leading-6 font-medium text-center"
                    scope="col"
                  >
                    {tier.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <th
                  className="py-8 px-6 text-sm font-medium text-left align-top"
                  scope="row"
                ></th>
                {tiers.map((tier) => (
                  <td key={tier.name} className="h-full py-8 px-6 align-top">
                    <div className="relative h-full">
                      <div className="flex justify-center items-end">
                        <span className="text-4xl font-extrabold">
                          ${tier.priceMonthly}
                        </span>{' '}
                        <span className="text-base font-medium">/mo</span>
                      </div>
                    </div>
                  </td>
                ))}
              </tr>

              <Fragment>
                {features.map((feature) => (
                  <tr key={feature.name}>
                    <th
                      className="py-5 px-6 text-sm font-normal text-left"
                      scope="row"
                    >
                      {feature.name}
                    </th>
                    {tiers.map((tier) => (
                      <td key={tier.name} className="py-5 px-6">
                        {typeof feature.tiers[tier.name] === 'string' ? (
                          <span className="block text-sm">
                            {feature.tiers[tier.name]}
                          </span>
                        ) : (
                          <>
                            {feature.tiers[tier.name] === true ? (
                              <CheckIcon
                                className={`h-5 w-5 ${
                                  tier.highlighted
                                    ? 'text-white'
                                    : 'text-green-500'
                                }`}
                                aria-hidden="true"
                              />
                            ) : (
                              <XMarkIcon
                                className={`h-5 w-5  ${
                                  tier.highlighted
                                    ? 'text-white'
                                    : 'text-red-500'
                                }`}
                                aria-hidden="true"
                              />
                            )}

                            <span className="sr-only">
                              {feature.tiers[tier.name] === true
                                ? 'Included'
                                : 'Not included'}{' '}
                              in {tier.name}
                            </span>
                          </>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </Fragment>
            </tbody>
            <tfoot>
              <tr>
                <th className="sr-only" scope="row">
                  Choose your plan
                </th>
                {tiers.map((tier) => (
                  <td key={tier.name} className="pt-5 px-6 ">
                    <a
                      href={tier.href}
                      className={`border border-red-500 rounded-full w-32 py-2 flex justify-center items-center mx-auto ${
                        tier.highlighted ? 'bg-white text-red-500' : ''
                      }`}
                    >
                      Choose plan
                    </a>
                  </td>
                ))}
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  )
}
