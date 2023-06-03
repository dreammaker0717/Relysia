import { useState, useEffect } from 'react'
import { RadioGroup } from '@headlessui/react'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { useSelector } from 'react-redux'
import authSelector from '@/redux/selectors/auth'
import { getProjectSetup, setProjectSetup } from 'axios-connect/wallet'
import { toast } from 'react-toastify'
import Spinner from 'components/common/Spinner'

const feeManagerOptions = [
  {
    id: 1,
    title: 'Classical',
    description: 'Let users pay for transaction fees with BSV.',
    icon: '/images/infrastructureSettings/classicalIcon.svg',
    value: 'CLASSIC_MODE',
  },
  {
    id: 2,
    title: 'Fee Manager',
    description: 'Fee manager pays the fee',
    icon: '/images/infrastructureSettings/minerIcon.svg',
    value: 'FEE_MANAGER',
  },
  // {
  //   id: 3,
  //   title: 'Dynamic',
  //   description:
  //     'Cover the costs of your users to a certain limit (FeeManager).',
  //   icon: '/images/infrastructureSettings/dynamicIcon.svg',
  // },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Settings = (props) => {
  const { userData, checked } = useSelector(authSelector)
  const [projectData, setprojectData] = useState(null)
  const [staticProjectData, setstaticProjectData] = useState(null)
  const [loading, setloading] = useState(false)

  useEffect(() => {
    if (userData && props.id) {
      const getProjectData = async () => {
        let projectSetupRes = await getProjectSetup(props.id)
        var { data, status } = projectSetupRes

        if (status === 'success' && data) {
          setprojectData(data)
          setstaticProjectData(data)
        } else {
        }
      }
      getProjectData()
    }
  }, [userData, props.id])

  const handleFieldChange = (e, nestedVal) => {
    if (nestedVal) {
      let cData = { ...projectData }
      cData[nestedVal] = {
        ...cData[nestedVal],
        [e.target.name]: e.target.value,
      }
      setprojectData(cData)
    } else {
      setprojectData({
        ...projectData,
        [e.target.name]: e.target.value,
      })
    }
  }

  const getObjWithDiffVal = () => {
    let result = {}

    for (var key in staticProjectData) {
      if (
        JSON.stringify(staticProjectData[key]) !==
        JSON.stringify(projectData[key])
      ) {
        result[key] = projectData[key]
      }

      // if (!objKeys.includes(key)) {
      //   result[key] = data[key]
      // }
    }

    return result
  }

  const submitForm = async (e) => {
    //submit form
    e.preventDefault()
    setloading(true)

    try {
      let projectDataDiffVal = getObjWithDiffVal()
      if (projectDataDiffVal && Object.keys(projectDataDiffVal).length === 0) {
        setloading(false)

        toast.success('Settings successfully updated!', {
          position: 'bottom-left',
          autoClose: 10000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        })

        return null
      }
      let projectSetupRes = await setProjectSetup(props.id, projectDataDiffVal)
      var { data, status } = projectSetupRes

      if (status === 'success') {
        setloading(false)
        setstaticProjectData({ ...projectData })
        toast.success('Settings successfully updated!', {
          position: 'bottom-left',
          autoClose: 10000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        })
      } else {
        setloading(false)
        if (toast.isActive('loadingToast')) {
          toast.dismiss('loadingToast')
        }
        let errorMessage = `Error Happened while updating`
        if (data?.msg) errorMessage = data.msg
        if (
          data?.msg &&
          data.msg.includes('"legal.email" must be a valid email')
        ) {
          errorMessage = 'Please provide a valid email.'
        }
        toast.error(errorMessage, {
          position: 'bottom-left',
          autoClose: 10000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        })
      }
    } catch (err) {
      console.log('catch err', err)
      setloading(false)

      toast.error(err.message, {
        position: 'bottom-left',
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
    }
  }
  return (
    <div>
      <div className="mt-4">
        <h1 className="text-black text-4xl">Settings</h1>
        <h2 className="text-black text-lg font-light">Manage project</h2>
      </div>

      <div className="mt-8">
        <form onSubmit={submitForm}>
          {/* //project Details */}
          <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
            <div className="space-y-6 sm:space-y-5">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Project Details
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500 font-light">
                  Update your project details.
                </p>
              </div>

              <div className="space-y-6 sm:space-y-5">
                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="projectName"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    ServiceId
                  </label>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <input
                      type="text"
                      name="serviceId"
                      disabled={true}
                      id="serviceId"
                      className="block w-full max-w-lg rounded-md border p-2 border-gray-300 bg-green-50 shadow-sm sm:text-sm"
                      value={props.id}
                    />
                  </div>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="projectName"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Project Name
                  </label>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <input
                      type="text"
                      name="projectName"
                      id="projectName"
                      autoComplete="given-name"
                      className="block w-full max-w-lg rounded-md border p-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      value={projectData?.projectName}
                      onChange={handleFieldChange}
                      required
                    />
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-5">
                  <label
                    htmlFor="paymailDomain"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Paymail Domain
                  </label>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <div className="mt-1 sm:col-span-2 sm:mt-0">
                      <input
                        type="text"
                        name="paymailDomain"
                        id="paymailDomain"
                        className="block w-full max-w-lg rounded-md border p-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        value={projectData?.paymailDomain}
                        onChange={handleFieldChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-5">
                  <label
                    htmlFor="mapi"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Mapi
                  </label>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <div className="mt-1 sm:col-span-2 sm:mt-0">
                      <input
                        type="text"
                        name="mapi"
                        id="mapi"
                        className="block w-full max-w-lg rounded-md border p-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        value={projectData?.mapi}
                        onChange={handleFieldChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className="sm:grid sm:grid-cols-3 sm:items-center sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="photo"
                  className="block text-sm font-medium text-gray-700"
                >
                  Company logo
                  <p className="mt-1 text-sm text-gray-500 font-light">
                    This will be displayed on your account.
                  </p>
                </label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <div className="flex items-center">
                    <span className="h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                      <svg
                        className="h-full w-full text-gray-300"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </span>
                    <button
                      type="button"
                      className="ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Change
                    </button>
                  </div>
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Company details
                  <p className="mt-1 text-sm text-gray-500 font-light">
                    Write a short company details.{' '}
                  </p>
                </label>

                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <textarea
                    id="about"
                    name="about"
                    rows={3}
                    className="block border p-2 w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    defaultValue={''}
                  />
                  <p className="mt-2 text-sm text-gray-500 font-light">
                    275 characters left
                  </p>
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="user-role"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Your role
                </label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <select
                    id="user-role"
                    name="user-role"
                    autoComplete="country-name"
                    style={{ backgroundColor: 'transparent' }}
                    className="block border p-2 w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    <option>Product Manager</option>
                    <option>Product Designer</option>
                    <option>Product Owner</option>
                  </select>
                  <div className="relative flex items-start mt-2 ml-1">
                    <div className="flex h-5 items-center">
                      <input
                        id="comments"
                        name="comments"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="comments"
                        className="text-gray-500 text-sm"
                      >
                        Show my job title in my profile
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pb-3 sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-b sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Recovery mail
                  <p className="mt-1 text-sm text-gray-500 font-light">
                    For all relysia related needs including account recovery,
                    offer emails and the latest Relysia updates.
                  </p>
                </label>
                <div className="relative mt-1 sm:col-span-2 sm:mt-0 md:mt-2">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <MailIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    autoComplete="given-name"
                    placeholder="you@example.com"
                    className="block border p-2 pl-10 w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div> */}
            </div>
          </div>

          {/* //firebase config */}
          <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5 mt-14">
            <div className="space-y-6 sm:space-y-5">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Firebase Config
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500 font-light">
                  Update your firebase project details.
                </p>
              </div>

              <div className="space-y-6 sm:space-y-5">
                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="projectId"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Project Id
                  </label>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <input
                      required
                      type="text"
                      name="projectId"
                      id="projectId"
                      autoComplete="given-name"
                      className="block w-full max-w-lg rounded-md border p-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      value={projectData?.firebaseConfig?.projectId}
                      onChange={(e) => handleFieldChange(e, 'firebaseConfig')}
                    />
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-5">
                  <label
                    htmlFor="appId"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    App Id
                  </label>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <div className="mt-1 sm:col-span-2 sm:mt-0">
                      <input
                        required
                        className="block w-full max-w-lg rounded-md border p-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        type="text"
                        name="appId"
                        id="appId"
                        value={projectData?.firebaseConfig?.appId}
                        onChange={(e) => handleFieldChange(e, 'firebaseConfig')}
                      />
                    </div>
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-5">
                  <label
                    htmlFor="apiKey"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Api Key
                  </label>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <div className="mt-1 sm:col-span-2 sm:mt-0">
                      <input
                        required
                        className="block w-full max-w-lg rounded-md border p-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        type="text"
                        name="apiKey"
                        id="apiKey"
                        value={projectData?.firebaseConfig?.apiKey}
                        onChange={(e) => handleFieldChange(e, 'firebaseConfig')}
                      />
                    </div>
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-5">
                  <label
                    htmlFor="authDomain"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Auth Domain
                  </label>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <div className="mt-1 sm:col-span-2 sm:mt-0">
                      <input
                        required
                        className="block w-full max-w-lg rounded-md border p-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        type="text"
                        name="authDomain"
                        id="authDomain"
                        value={projectData?.firebaseConfig?.authDomain}
                        onChange={(e) => handleFieldChange(e, 'firebaseConfig')}
                      />
                    </div>
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-5">
                  <label
                    htmlFor="storageBucket"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Storage Bucket
                  </label>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <div className="mt-1 sm:col-span-2 sm:mt-0">
                      <input
                        required
                        className="block w-full max-w-lg rounded-md border p-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        type="text"
                        name="storageBucket"
                        id="storageBucket"
                        value={projectData?.firebaseConfig?.storageBucket}
                        onChange={(e) => handleFieldChange(e, 'firebaseConfig')}
                      />
                    </div>
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-5">
                  <label
                    htmlFor="messagingSenderId"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Messaging Sender Id
                  </label>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <div className="mt-1 sm:col-span-2 sm:mt-0">
                      <input
                        required
                        className="block w-full max-w-lg rounded-md border p-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        type="text"
                        name="messagingSenderId"
                        id="messagingSenderId"
                        value={projectData?.firebaseConfig?.messagingSenderId}
                        onChange={(e) => handleFieldChange(e, 'firebaseConfig')}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* //fee manager selection */}
          <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5 mt-14">
            <div className="space-y-6 sm:space-y-5">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Fee Manager
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500 font-light">
                  To create the optimal user experience for your user, you need
                  to decide what options the user will prefer for your
                  application.{' '}
                </p>
              </div>

              <div className="space-y-6 sm:space-y-5">
                <div>
                  <RadioGroup
                    // value={selectedFeeManager}
                    value={projectData?.type}
                    onChange={(e) => {
                      setprojectData({
                        ...projectData,
                        type: e.value,
                      })
                    }}
                  >
                    <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
                      {feeManagerOptions.map((feeManagerEle) => (
                        <RadioGroup.Option
                          key={feeManagerEle.id}
                          value={feeManagerEle}
                          className={({}) =>
                            classNames(
                              projectData?.type === feeManagerEle.value
                                ? 'border-indigo-500 ring-2 ring-indigo-500'
                                : 'border-gray-300',

                              'relative flex cursor-pointer rounded-lg border bg-white  shadow-sm focus:outline-none transition-colors',
                            )
                          }
                        >
                          <>
                            <span className="flex flex-1">
                              <span className="flex flex-col w-full">
                                <RadioGroup.Label
                                  as="span"
                                  className={() =>
                                    classNames(
                                      projectData?.type === feeManagerEle.value
                                        ? 'border-indigo-500 ring-2 ring-indigo-500 bg-blue-50'
                                        : 'border-gray-300',

                                      'block text-sm font-medium text-gray-900 rounded-t-lg p-4 border border-l-0 border-r-0 border-t-0 transition-all',
                                    )
                                  }
                                >
                                  <div className="flex items-center	">
                                    <img
                                      style={{
                                        transition: 'all 0.3s ease-in-out',
                                        marginRight: '7px',
                                        filter: 'grayscale(0)',
                                      }}
                                      src={feeManagerEle.icon}
                                    />
                                    <span>{feeManagerEle.title}</span>
                                  </div>
                                </RadioGroup.Label>
                                <RadioGroup.Description
                                  as="span"
                                  className="mt-1 flex items-center text-sm text-gray-500 p-4"
                                >
                                  {feeManagerEle.description}
                                </RadioGroup.Description>
                              </span>
                            </span>
                            <CheckCircleIcon
                              className={classNames(
                                projectData?.type === feeManagerEle.value
                                  ? 'opacity-100'
                                  : 'opacity-0',
                                'h-5 w-5 text-indigo-600 transition-all',
                              )}
                              aria-hidden="true"
                              style={{
                                position: 'absolute',
                                top: 18,
                                right: 10,
                              }}
                            />
                          </>
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>
          </div>

          {/* //firebase config */}
          <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5 mt-14">
            <div className="space-y-6 sm:space-y-5">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Organization Config
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500 font-light">
                  Update your organization details.
                </p>
              </div>

              <div className="space-y-6 sm:space-y-5">
                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="legal-organisation"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Organization Name
                  </label>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <input
                      type="text"
                      name="organisation"
                      id="legal-organisation"
                      autoComplete="given-name"
                      className="block w-full max-w-lg rounded-md border p-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      value={projectData?.legal?.organisation}
                      onChange={(e) => handleFieldChange(e, 'legal')}
                      required
                    />
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-5">
                  <label
                    htmlFor="organisation-email"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Email
                  </label>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <div className="mt-1 sm:col-span-2 sm:mt-0">
                      <input
                        className="block w-full max-w-lg rounded-md border p-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        type="email"
                        name="email"
                        id="organisation-email"
                        value={projectData?.legal?.email}
                        onChange={(e) => handleFieldChange(e, 'legal')}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-5">
                  <label
                    htmlFor="organisation-mailingAddress"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Mailing Address
                  </label>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <div className="mt-1 sm:col-span-2 sm:mt-0">
                      <input
                        required
                        className="block w-full max-w-lg rounded-md border p-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        type="text"
                        name="mailingAddress"
                        id="organisation-mailingAddress"
                        value={projectData?.legal?.mailingAddress}
                        onChange={(e) => handleFieldChange(e, 'legal')}
                      />
                    </div>
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-5">
                  <label
                    htmlFor="organisation-issuerCountry"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Issuer Country
                  </label>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <div className="mt-1 sm:col-span-2 sm:mt-0">
                      <input
                        required
                        className="block w-full max-w-lg rounded-md border p-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        type="text"
                        name="issuerCountry"
                        id="organisation-issuerCountry"
                        value={projectData?.legal?.issuerCountry}
                        onChange={(e) => handleFieldChange(e, 'legal')}
                      />
                    </div>
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-5">
                  <label
                    htmlFor="organisation-jurisdiction"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Jurisdiction
                  </label>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <div className="mt-1 sm:col-span-2 sm:mt-0">
                      <input
                        required
                        className="block w-full max-w-lg rounded-md border p-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        type="text"
                        name="jurisdiction"
                        id="organisation-jurisdiction"
                        value={projectData?.legal?.jurisdiction}
                        onChange={(e) => handleFieldChange(e, 'legal')}
                      />
                    </div>
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-5">
                  <label
                    htmlFor="organisation-legalForm"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Legal Form
                  </label>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <div className="mt-1 sm:col-span-2 sm:mt-0">
                      <input
                        required
                        className="block w-full max-w-lg rounded-md border p-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        type="text"
                        name="legalForm"
                        id="organisation-legalForm"
                        value={projectData?.legal?.legalForm}
                        onChange={(e) => handleFieldChange(e, 'legal')}
                      />
                    </div>
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-5">
                  <label
                    htmlFor="organisation-governingLaw"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Governing Law
                  </label>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <div className="mt-1 sm:col-span-2 sm:mt-0">
                      <input
                        required
                        className="block w-full max-w-lg rounded-md border p-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        type="text"
                        name="governingLaw"
                        id="organisation-governingLaw"
                        value={projectData?.legal?.governingLaw}
                        onChange={(e) => handleFieldChange(e, 'legal')}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* //submit */}
          <div className="my-10 ">
            <div className="flex justify-end">
              <button
                disabled={loading}
                type="submit"
                className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                {loading && <Spinner className={`mr-2`} />}
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Settings
