import { Fragment, useState, useEffect } from 'react'
import { CheckIcon, MinusIcon } from '@heroicons/react/24/solid'
import { firebaseDB } from '@/config/init'
import { firebaseAuthFunc } from '@/config/init'
import FullScreenLoader from 'components/ui/FullScreenLoader'
import {
  query,
  getDocs,
  addDoc,
  onSnapshot,
  collection,
  where,
} from 'firebase/firestore'
import { useSelector } from 'react-redux'
import authSelector from '@/redux/selectors/auth'
import { Skeleton } from 'antd'

const tiers = [
  {
    name: 'Free',
    href: '#',
    priceMonthly: 0,
    description:
      'The standard plan with a variety of features that cover for basic needs.',
  },
  {
    name: 'Unlimited',
    href: '#',
    priceMonthly: 30,
    description:
      'Power users that want more bandwidth and/or their own dedicated server.',
    monthlyPriceId: 'price_1LAXLcI7q0zfaJFpeuxCrodm',
    yearlyPriceId: 'price_1LAXLcI7q0zfaJFpZRpA8PEO',
  },
  {
    name: 'Business',
    href: '#',
    priceMonthly: 120,
    description:
      'Companies and teams that want to build complex apps and exchanges.',
    monthlyPriceId: 'price_1LAXKpI7q0zfaJFpgyvfyg7p',
    yearlyPriceId: 'price_1LAXKpI7q0zfaJFpt1dmlZAz',
  },
]

const sections = [
  {
    name: 'Features',
    features: [
      {
        name: 'Wallet',
        tiers: { Free: true, Unlimited: true, Business: true },
      },
      { name: 'Post', tiers: { Free: true, Unlimited: true, Business: true } },
      {
        name: 'Upload',
        tiers: { Free: true, Unlimited: true, Business: true },
      },
      {
        name: 'Token Issuance',
        tiers: { Free: 'up to 3', Unlimited: true, Business: true },
      },
      {
        name: 'Swaps',
        tiers: { Free: false, Unlimited: true, Business: true },
      },
    ],
  },
  {
    name: 'Reporting',
    features: [
      {
        name: 'Fee Coverage.',
        tiers: { Free: false, Unlimited: true, Business: true },
      },
      {
        name: 'Transaction Data.',
        tiers: { Free: false, Unlimited: '~50 MB', Business: '~300 MB' },
      },
      {
        name: 'Max Transactions.',
        tiers: { Free: '10,000', Unlimited: '500,000', Business: '3,000,000' },
      },
    ],
  },
  {
    name: 'Dedicated Server',
    features: [
      {
        name: 'Dedicated DB.',
        tiers: { Basic: false, Unlimited: true, Business: true },
      },
      {
        name: 'Project Paymail',
        tiers: { Free: false, Unlimited: true, Business: true },
      },
      {
        name: 'Dashboard',
        tiers: { Free: false, Unlimited: true, Business: true },
      },
      {
        name: 'Unlimited Users',
        tiers: { Free: false, Unlimited: true, Business: true },
      },
      {
        name: 'UTXO Storage',
        tiers: { Free: false, Unlimited: '250 MB', Business: '1 GB' },
      },
    ],
  },
  {
    name: 'Support',
    features: [
      {
        name: 'Support',
        tiers: { Free: 'Community', Unlimited: 'Community', Business: true },
      },
    ],
  },
]

export default function () {
  const { userData } = useSelector(authSelector)

  const [isYearly, setIsYearly] = useState(true)
  const [loading, setLoading] = useState(false)
  const [userPlan, setuserPlan] = useState('free')
  const [loadingUserPlan, setloadingUserPlan] = useState(true)

  useEffect(() => {
    if (userData && userData.uid) {
      getUserSubscription(userData.uid)
    }
  }, [userData])

  function purchase(priceId) {
    setLoading(true)
    const ref = collection(
      firebaseDB,
      'customers',
      firebaseAuthFunc.currentUser.uid,
      'checkout_sessions',
    )
    addDoc(ref, {
      price: priceId,
      success_url: window.location.href,
      cancel_url: window.location.origin,
      allow_promotion_codes: true,
    }).then((doc) => {
      onSnapshot(doc, (snap) => {
        const { error, url } = snap.data()
        if (error) {
          setLoading(false)
          alert(`An error occured: ${error.message}`)
        }
        if (url) {
          // We have a Stripe Checkout URL, let's redirect.
          window.location.assign(url)
        }
      })
    })
  }

  const getUserSubscription = async (uid) => {
    try {
      setloadingUserPlan(true)
      let subscriptionsArr = []
      const q = query(
        collection(firebaseDB, 'customers', uid, 'subscriptions'),
        where('status', '==', 'active'),
      )

      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        if (doc.data()?.role) {
          subscriptionsArr.push({ ...doc.data(), id: doc.id })
        }
      })

      if (subscriptionsArr && subscriptionsArr[0] && subscriptionsArr[0].role) {
        setuserPlan(subscriptionsArr[0].role)
      }

      setloadingUserPlan(false)
    } catch (err) {
      setloadingUserPlan(false)
    } finally {
      setloadingUserPlan(false)
    }
  }

  return (
    <div className="bg-white">
      <FullScreenLoader open={loading} />
      <div
        className="flex mx-auto border-2 border-black p-1 rounded text-lg"
        style={{ width: 'fit-content' }}
      >
        <div
          className={`p-2 rounded cursor-pointer ${
            !isYearly ? 'bg-black text-white' : ''
          }`}
          onClick={() => setIsYearly(false)}
        >
          Monthly
        </div>
        <div
          className={`p-2 rounded cursor-pointer ${
            isYearly ? 'bg-black text-white' : ''
          }`}
          onClick={() => setIsYearly(true)}
        >
          Yearly
        </div>
      </div>
      <div className="max-w-7xl mx-auto bg-white py-16 sm:py-24 sm:px-6 lg:px-8">
        {/* xs to lg */}
        <div className="max-w-2xl mx-auto space-y-16 lg:hidden">
          {tiers.map((tier, tierIdx) => (
            <section key={tier.name}>
              <div className="px-4 mb-8">
                <h2 className="text-lg leading-6 font-medium text-gray-900">
                  {tier.name}
                </h2>
                <p className="mt-4">
                  <span className="text-4xl font-extrabold text-gray-900">
                    ${(isYearly ? 0.8 : 1) * tier.priceMonthly}
                  </span>{' '}
                  <span className="text-base font-medium text-gray-500">
                    /mo
                  </span>
                </p>
                <p className="mt-4 text-sm text-gray-500">{tier.description}</p>

                {/* //skeleton */}
                {loadingUserPlan ? (
                  <span className="mt-6 block border rounded-md w-full py-2 text-sm font-semibold text-white text-center">
                    <Skeleton.Button
                      active={true}
                      size="default"
                      shape="default"
                      block={true}
                      className="border rounded-md w-full text-sm font-semibold text-white text-center"
                    />
                  </span>
                ) : (
                  <>
                    {tier?.name &&
                    userPlan.toLowerCase() === tier.name.toLowerCase() ? (
                      <span className="mt-6 block border border-green-800 rounded-md bg-green-600 w-full py-2 text-sm font-semibold text-white text-center">
                        Current Plan
                      </span>
                    ) : (
                      <a
                        onClick={() => {
                          if (tier.name !== 'Free') {
                            purchase(
                              isYearly
                                ? tier.yearlyPriceId
                                : tier.monthlyPriceId,
                            )
                          }
                        }}
                        href={tier.href}
                        className="mt-6 block border border-gray-800 rounded-md bg-gray-800 w-full py-2 text-sm font-semibold text-white text-center hover:bg-gray-900"
                      >
                        {tier.name === 'Free'
                          ? `Move To ${tier.name} Version`
                          : `Buy ${tier.name}`}
                      </a>
                    )}
                  </>
                )}
              </div>

              {sections.map((section) => (
                <table key={section.name} className="w-full">
                  <caption className="bg-gray-50 border-t border-gray-200 py-3 px-4 text-sm font-medium text-gray-900 text-left">
                    {section.name}
                  </caption>
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
                  <tbody className="divide-y divide-gray-200">
                    {section.features.map((feature) => (
                      <tr
                        key={feature.name}
                        className="border-t border-gray-200"
                      >
                        <th
                          className="py-5 px-4 text-sm font-normal text-gray-500 text-left"
                          scope="row"
                        >
                          {feature.name}
                        </th>
                        <td className="py-5 pr-4">
                          {typeof feature.tiers[tier.name] === 'string' ? (
                            <span className="block text-sm text-gray-700 text-right">
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
                                <MinusIcon
                                  className="ml-auto h-5 w-5 text-gray-400"
                                  aria-hidden="true"
                                />
                              )}

                              <span className="sr-only">
                                {feature.tiers[tier.name] === true
                                  ? 'Yes'
                                  : 'No'}
                              </span>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ))}
            </section>
          ))}
        </div>

        {/* lg+ */}
        <div className="hidden lg:block">
          <table className="w-full h-px table-fixed">
            <caption className="sr-only">Pricing plan comparison</caption>
            <thead>
              <tr>
                <th
                  className="pb-4 px-6 text-sm font-medium text-gray-900 text-left"
                  scope="col"
                >
                  <span className="sr-only">Feature by</span>
                  <span>Plans</span>
                </th>
                {tiers.map((tier) => (
                  <th
                    key={tier.name}
                    className="w-1/4 pb-4 px-6 text-lg leading-6 font-medium text-gray-900 text-left"
                    scope="col"
                  >
                    {tier.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="border-t border-gray-200 divide-y divide-gray-200">
              <tr>
                <th
                  className="py-8 px-6 text-sm font-medium text-gray-900 text-left align-top"
                  scope="row"
                >
                  Pricing
                </th>
                {tiers.map((tier) => (
                  <td key={tier.name} className="h-full py-8 px-6 align-top">
                    <div className="relative h-full table">
                      <p>
                        <span className="text-4xl font-extrabold text-gray-900">
                          ${(isYearly ? 0.8 : 1) * tier.priceMonthly}
                        </span>{' '}
                        <span className="text-base font-medium text-gray-500">
                          /mo
                        </span>
                      </p>
                      <p className="mt-4 mb-16 text-sm text-gray-500">
                        {tier.description}
                      </p>

                      {/* //skeleton */}
                      {loadingUserPlan ? (
                        <Skeleton.Button
                          active={true}
                          size="default"
                          shape="default"
                          block={true}
                          className="absolute bottom-0 flex-grow block w-full rounded-md 5 py-2 text-sm text-center"
                        />
                      ) : (
                        <>
                          {tier?.name &&
                          userPlan.toLowerCase() === tier.name.toLowerCase() ? (
                            <span className="absolute bottom-0 flex-grow block w-full bg-green-600 border border-green-800 rounded-md 5 py-2 text-sm font-semibold text-white text-center">
                              Current Plan
                            </span>
                          ) : (
                            <a
                              onClick={() => {
                                if (tier.name !== 'Free') {
                                  purchase(
                                    isYearly
                                      ? tier.yearlyPriceId
                                      : tier.monthlyPriceId,
                                  )
                                }
                              }}
                              href={tier.href}
                              className="absolute bottom-0 flex-grow block w-full bg-gray-800 border border-gray-800 rounded-md 5 py-2 text-sm font-semibold text-white text-center hover:bg-gray-900"
                            >
                              {tier.name === 'Free'
                                ? `Move To ${tier.name} Version`
                                : `Buy ${tier.name}`}
                            </a>
                          )}
                        </>
                      )}
                    </div>
                  </td>
                ))}
              </tr>
              {sections.map((section) => (
                <Fragment key={section.name}>
                  <tr>
                    <th
                      className="bg-gray-50 py-3 pl-6 text-sm font-medium text-gray-900 text-left"
                      colSpan={4}
                      scope="colgroup"
                    >
                      {section.name}
                    </th>
                  </tr>
                  {section.features.map((feature) => (
                    <tr key={feature.name}>
                      <th
                        className="py-5 px-6 text-sm font-normal text-gray-500 text-left"
                        scope="row"
                      >
                        {feature.name}
                      </th>
                      {tiers.map((tier) => (
                        <td key={tier.name} className="py-5 px-6">
                          {typeof feature.tiers[tier.name] === 'string' ? (
                            <span className="block text-sm text-gray-700">
                              {feature.tiers[tier.name]}
                            </span>
                          ) : (
                            <>
                              {feature.tiers[tier.name] === true ? (
                                <CheckIcon
                                  className="h-5 w-5 text-green-500"
                                  aria-hidden="true"
                                />
                              ) : (
                                <MinusIcon
                                  className="h-5 w-5 text-gray-400"
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
