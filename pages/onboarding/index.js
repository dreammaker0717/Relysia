import { useMemo, useState } from 'react'
import CustomInput from '../../components/common/inputs/custom-input'
import { RadioGroup, Switch } from '@headlessui/react'
import styles from './index.module.css'
import { setup } from '../../axios-connect/api'
import { ProjectSetupAPI } from '../../axios-connect/createProjectApi'
import { useRouter } from 'next/router'
import Spinner from '../../components/common/Spinner'
import * as Scroll from 'react-scroll'
import { toast } from 'react-toastify'
import {
  GoogleLogin,
  GoogleOAuthProvider,
  useGoogleLogin,
} from '@react-oauth/google'
import { CheckCircleIcon } from '@heroicons/react/24/outline'
import { Tooltip } from 'antd'

const barcodeIcon = '/assets/images/barcode.svg'
const settingsIcon = '/assets/images/settings.svg'
const medalStarIcon = '/assets/images/medal-star.svg'

function CustomSwitch({ enabled = false, setEnabled = () => {} }) {
  return (
    <Switch
      checked={enabled}
      onChange={setEnabled}
      className={`${enabled ? 'gradient-background' : 'bg-fifth'}
          relative flex-shrink-0 h-6 w-12 rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
    >
      <span
        aria-hidden="true"
        className={`translate-y-0.5 ${
          enabled ? 'translate-x-3' : '-translate-x-3'
        }
            pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
      />
    </Switch>
  )
}

function NameAndIcon({ onSubmit, values, fields, onFieldChange }) {
  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
      {fields.map(({ title, key, helperText, type = 'text' }) => (
        <div className={styles.formGroup}>
          <label className={styles.label}>{title}</label>
          <CustomInput
            inputType={type}
            icon={barcodeIcon}
            placeholder={helperText}
            onChange={(e) => onFieldChange(key, e.target.value)}
            value={values[key]}
            required
          />
        </div>
      ))}
      {/*<select className={styles.formGroup}>*/}
      {/*  {countryList.map(name => <option>{name}</option>)}*/}
      {/*</select>*/}
      <div
        className={styles.formGroup}
        onChange={(e) => setCountry(e.target.value)}
      >
        <input
          className="gradient-background rounded-lg py-2 w-48"
          type="submit"
          value="Looks good!"
        />
      </div>
    </form>
  )
}
function Config({
  onSubmit,
  firebaseConfig,
  setFirebaseConfig,
  configURL,
  setConfigURL,
  type,
  setType,
}) {
  const options = [
    {
      name: 'Fee Manager',
      type: 'FEE_MANAGER',
      title: 'App pays transaction fees',
    },
    {
      name: 'Classic',
      type: 'CLASSIC_MODE',
      title: 'User pays transaction fees',
    },
  ]

  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
      <div>
        <div className="flex flex-col gap-2">
          <h3>Paymail Domain</h3>
          <CustomInput
            inputType="text"
            pattern="[a-zA-Z0-9]+\.[a-zA-Z]+"
            placeholder="vaionex.com"
            icon={barcodeIcon}
            value={configURL}
            onChange={(e) => setConfigURL(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h3>Plan Type</h3>
        <RadioGroup
          className="flex gap-4 flex-wrap"
          value={type}
          onChange={setType}
        >
          {options.map((option) => (
            <RadioGroup.Option value={option.type}>
              {({ checked }) => (
                <Tooltip
                  color="white"
                  placement="top"
                  title={option.title}
                  overlayInnerStyle={{ color: 'black' }}
                >
                  <div
                    className={`p-2 mb-1 rounded-lg cursor-pointer first-letter:uppercase ${
                      checked ? 'gradient-background' : 'bg-third'
                    }`}
                  >
                    {option.name}
                  </div>
                </Tooltip>
              )}
            </RadioGroup.Option>
          ))}
        </RadioGroup>
      </div>
      {/*<div>*/}
      {/*  <div className='flex flex-col gap-2'>*/}
      {/*    <h3>API Key</h3>*/}
      {/*    <CustomInput icon={barcodeIcon} value={apiKey} onChange={(e) => setApiKey(e.target.value)} required/>*/}
      {/*  </div>*/}
      {/*</div>*/}
      <div className="flex flex-col gap-2">
        <input
          className={`gradient-background rounded-lg py-2 w-48`}
          type="submit"
          value="Looks good!"
        />
      </div>
    </form>
  )
}

function ProjectSetup({ projectName, setFirebaseConfig, onSubmit }) {
  const [status, setStatus] = useState('')
  const [creating, setCreating] = useState(false)
  const [created, setCreated] = useState(false)

  const canSubmit = created

  function Heading({ children }) {
    return <h2 className="text-2xl mb-3">{children}</h2>
  }

  async function handleGoogleLoginSuccess({ access_token }) {
    setCreating(true)
    try {
      await createProject(access_token)
      setCreated(true)
    } catch (e) {
      toast(
        'Unexpected error while creating project. Please try again later.',
        { type: 'error' },
      )
      console.log(e)
    }
    setCreating(false)
  }

  const login = useGoogleLogin({
    onSuccess: handleGoogleLoginSuccess,
    flow: 'implicit',
    scope: 'https://www.googleapis.com/auth/cloud-platform',
  })

  async function createProject(token) {
    const delay = (ms) => new Promise((res) => setTimeout(res, ms))
    const api = new ProjectSetupAPI(token, projectName)

    setStatus('Creating Project')
    await api.createGCPProject()
    await delay(5000)

    setStatus('Checking project creation status')
    await api.checkProjectCreationStatus()
    await delay(5000)

    setStatus('Enabling Firebase')
    await api.enableFirestoreAPI()
    await delay(5000)

    setStatus('Creating Database')
    await api.createDatabase()
    await delay(5000)

    setStatus('Adding Firebase to Project')
    await api.addFirebaseInProject()
    await delay(5000)

    setStatus('Setting up Webapp')
    const projectConfig = await api.setupWebapp()
    setFirebaseConfig(projectConfig)
    await delay(5000)

    setStatus('Adding Indexes')
    await api.addFirestoreIndex()
    await delay(5000)

    setStatus('Adding Security Rules')
    await api.addSecurityRules()
  }

  function CreateProjectButton() {
    if (creating)
      return (
        <div className="flex items-center gap-2">
          <Spinner />
          <div>{status}...</div>
        </div>
      )
    if (created)
      return (
        <div className="flex items-center gap-2">
          <CheckCircleIcon className="text-red-500 w-5 h-5" />
          Project Setup Complete
        </div>
      )
    return (
      <button onClick={login} className="gradient-background py-1 px-3 rounded">
        Setup Firebase Project
      </button>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <Heading>1. Enable Firebase</Heading>
        <p className="leading-tight">
          To create your project, we need to ensure you have accepted Firebase's
          terms and service agreement
        </p>
        <p className="leading-tight">
          To do that you need to go to{' '}
          <a
            className="underline text-red-500"
            href="https://console.firebase.google.com/"
          >
            Firebase Console
          </a>{' '}
          and make sure you have already created at least one project
        </p>
        <video
          src="/videos/onboarding/create-firebase-project.mp4"
          controls
          className="mt-5"
        />
      </div>
      <div>
        <Heading>2. Setup Firebase</Heading>
        <CreateProjectButton />
      </div>
      <div>
        <Heading>3. Enable Authentication</Heading>
        <p className="leading-tight">
          For the final step, you need to enable Authorization for your newly
          created Relysia Project. Go to{' '}
          <a
            className="underline text-red-500"
            href="https://console.firebase.google.com/"
          >
            Firebase Console
          </a>{' '}
          , select your newly created Relysia project and enable authentication.
        </p>
      </div>
      <button
        onClick={onSubmit}
        className={`
          ${canSubmit ? 'gradient-background' : 'bg-gray-500'} py-1 px-3 rounded
        `}
        disabled={!canSubmit}
      >
        Next
      </button>
    </div>
  )
}

function Final({ onSubmit, loading }) {
  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
      <div>
        <h3>That's all.</h3>
        <h3>It's time to skyrocket your business! 🚀</h3>
      </div>
      <div className="flex flex-col gap-2">
        {loading ? (
          <Spinner />
        ) : (
          <input
            className="gradient-background rounded-lg py-2 w-56"
            type="submit"
            value="Create my dashboard"
          />
        )}
      </div>
    </form>
  )
}

export default function () {
  const legalFields = [
    {
      title: 'Project Name',
      helperText: 'Amazing Project',
      key: 'name',
    },
    {
      title: 'Organization Name',
      helperText: 'Vaionex Corporation',
      key: 'organisation',
    },
    {
      title: 'Organization Mailing Address',
      helperText: '123 Main Street, Suite 100, New York, NY 10001',
      key: 'mailingAddress',
    },
    {
      title: 'Organization Email',
      helperText: 'admin@company.com',
      key: 'email',
      type: 'email',
    },
  ]
  const [currentFormIndex, setCurrentFormIndex] = useState(0)
  const [legal, setLegal] = useState({
    legalForm: 'limited',
    governingLaw: 'US',
    issuerCountry: 'US',
    jurisdiction: 'US',
  })
  const [type, setType] = useState('FEE_MANAGER')
  const [firebaseConfig, setFirebaseConfig] = useState('')
  const [apiKey, setApiKey] = useState('-')
  const [configURL, setConfigURL] = useState('')

  const [loading, setLoading] = useState(false)

  const router = useRouter()

  function handleFieldChange(key, value) {
    setLegal((legal) => {
      const temp = { ...legal }

      if (key === 'name') temp[key] = value.replaceAll(' ', '')
      else temp[key] = value
      return temp
    })
  }

  const steps = [
    {
      icon: barcodeIcon,
      Component: NameAndIcon,
      props: {
        fields: legalFields,
        values: legal,
        onFieldChange: handleFieldChange,
        onSubmit: handleOnSubmit,
      },
    },
    {
      icon: settingsIcon,
      Component: Config,
      props: {
        apiKey,
        setApiKey,
        configURL,
        setConfigURL,
        type,
        setType,
        onSubmit: handleOnSubmit,
      },
    },
    {
      icon: settingsIcon,
      Component: ProjectSetup,
      props: {
        projectName: legal.name,
        setFirebaseConfig,
        onSubmit: handleOnSubmit,
      },
    },
    {
      icon: medalStarIcon,
      Component: Final,
      props: { onSubmit: handleOnSubmit, loading },
    },
  ]

  const CurrentForm = useMemo(
    () => steps[currentFormIndex].Component,
    [currentFormIndex],
  )
  const currentFormProps = steps[currentFormIndex].props

  function handleOnSubmit(e) {
    e.preventDefault()

    const name = legal.name
    let regex = /^[a-z0-9]([-a-z0-9]{2,29}[a-z0-9])?$/
    if (!regex.test(name)) {
      toast.error('Project name is invalid')
      return
    } 
    const legalWithoutName = { ...legal }
    delete legalWithoutName['name']
    delete firebaseConfig['locationId']

    if (currentFormIndex < steps.length - 1) {
      setCurrentFormIndex(currentFormIndex + 1)
      const scroll = Scroll.animateScroll
      scroll.scrollToTop()
    } else {
      setLoading(true)
      const requestBody = {
        projectName: name,
        firebaseConfig,
        type,
        feeManagerConfig: {
          active: type === 'FEE_MANAGER',
          limit: 10000,
        },
        paymailDomain: configURL,

        mapi: apiKey,
        tokenIssueConfig: {
          satsPerToken: 1,
        },
        legal: legalWithoutName,
      }
      setup(requestBody)
        .then((result) => {
          return router.push('/dashboard')
        })
        .catch((err) => {
          console.log(err)
          console.log(err.response)
          toast.error('Unable to create dashboard')
        })
        .finally(() => {
          setLoading(false)
        })
    }

    return false
  }

  return (
    <div className="flex bg-black/30 min-h-screen">
      <div
        className="w-1/2 px-24 xl:px-48 py-16 hidden lg:block bg-no-repeat bg-center bg-cover"
        style={{ backgroundImage: 'url("/assets/images/onboarding.png")' }}
      >
        <div className="">
          <h1 className="text-5xl mb-6">Make it your own.</h1>
          <p className="text-xl">
            You can choose between a variety of functions, enable and disable
            user functionalities and endpoints, tailored to your very own
            Application.{' '}
          </p>
        </div>
      </div>
      <div className="lg:w-1/2 py-16 sm:px-24 px-12">
        <h2 className="text-3xl">Get started</h2>
        <p>Let's start configuring your new project!</p>
        <div className="flex justify-between my-12">
          {steps.map((step, index) => (
            <div className="flex items-center">
              <div
                className={`flex justify-center items-center w-10 h-10 rounded-full ${
                  index <= currentFormIndex ? 'gradient-background' : 'bg-third'
                }`}
              >
                <img src={step.icon} />
              </div>
              {currentFormIndex === index ? (
                <span className="ml-2">
                  {index + 1} of {steps.length}
                </span>
              ) : null}
            </div>
          ))}
        </div>
        <CurrentForm {...currentFormProps} />
      </div>
    </div>
  )
}
