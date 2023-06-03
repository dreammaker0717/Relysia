import DashboardLayout from 'pages/dashboard/[id]/DashboadLayout'
import styles from 'pages/dashboard/[id]/index.module.css'
import { useMemo, useState } from 'react'
import Switch from 'react-switch'

function Step({subtext, title, icon, active = false}){
  return <div className='flex items-center'>
    <div className={`flex justify-center items-center w-12 h-12 mr-4 rounded-full ${active ? 'bg-blue-600' : 'bg-blue-100'}`}>
      <img src={icon} />
    </div>
    <div>
      <div className='text-sm text-blue-500'>{subtext}</div>
      <div className='text-sm font-bold'>{title}</div>
    </div>
  </div>
}
function Permission({title, description, img, enabled, onToggle}){
  const bgHighlight = styles['bg-highlight']

  return <div className={`${bgHighlight} flex justify-between items-center rounded-lg p-4 w-96 `}>
    <div className='flex'>
      <div className='h-10 w-10 mr-4'>
        {img && <img src={img} /> }
      </div>
      <div>
        <div className='uppercase text-sm font-bold'>{title}</div>
        <div className='text-sm font-semibold opacity-50'>{description}</div>
      </div>
    </div>
    <Switch checked={enabled} onChange={() => onToggle(title)} checkedIcon={false} uncheckedIcon={false} onColor='#0075FF' offColor='#DFE5EC' height={24} width={48} handleDiameter={16}/>
  </div>
}

const group = 'flex flex-col'
const label = 'block m-0 font-bold uppercase'
const input = 'px-4 py-2 bg-blue-50 rounded-xl'
const button = 'py-2 w-full bg-blue-600 rounded-xl text-white'


function AppDetails({file, setFile, onSubmit}){
  return <form className='flex flex-col gap-4' onSubmit={onSubmit}>
    <div className={`${group}`}>
      <label className={`${label}`} >App Name</label>
      <input className={`${input}`} placeholder='App Name' />
    </div>
    <div className={`${group}`}>
      <label className={`${label}`} >Email Publisher</label>
      <input className={`${input}`} placeholder='Email Publisher' />
    </div>
    <div className={`${group}`}>
      <label className={`${label}`} >Environment</label>
      <input className={`${input}`} placeholder='Development' />
    </div>
    <div className={`${group}`}>
      <label className={`${label}`} >Description</label>
      <input className={`${input}`} placeholder='Description' />
    </div>
    <div>
      <div className={`${label}`}>Upload app icon</div>
      <div className='text-sm text-gray-500'>Please upload a maximum image size of 2MB to create a thumbnail</div>
      <input className='hidden' id='file' type='file' accept='image/*' onChange={e => setFile(e.target.files[0] || null)} />
      <label className='flex flex-col justify-center items-center w-24 h-24 mt-4 rounded-lg bg-gray-50' htmlFor='file'>
        <img src='/assets/images/document-upload.svg' alt='Document Upload' />
        <span>Upload</span>
      </label>
      <span>{file?.name || ''}</span>
    </div>
    <div>
      <input className={`${button}`} type='submit' value='Next'/>
    </div>
  </form>
}

function RedirectionURLs({onSubmit}){
  return <form className='flex flex-col gap-4' onSubmit={onSubmit}>
    <div className={`${group}`}>
      <label className={`${label}`} >Authorize origin url</label>
      <input className={`${input}`} placeholder='https:// ...' />
    </div>
    <div className={`${group}`}>
      <label className={`${label}`} >url decline redirect</label>
      <input className={`${input}`} placeholder='https:// ...' />
    </div>
    <div>
      <input className={`${button}`} type='submit' value='Next'/>
    </div>
  </form>
}

function AppPermissions({permissions, onToggle, onSubmit}){
  return <form className='grid grid-cols-2 gap-4' onSubmit={onSubmit}>
    {permissions.map(({ title, description, img, enabled }) => <Permission title={title} img={img} description={description} enabled={enabled} onToggle={() => onToggle(title)} />  )}
  </form>
}

export default function (){
  const [permissions, setPermissions] = useState([
    {title: 'User Public Profile', description: "Get user's handle, display name and profile picture", enabled: true, img: null},
    {title: 'Private Profile', description: "Get user's email address and phone number", enabled: true, img: null},
    {title: 'Pay', description: "Trigger payments from user@apos wallet within allowed limit", enabled: true, img: null},
    {title: 'Encrypt', description: "Encrypt and decrypt with user keys", enabled: true, img: null},
    {title: 'Sign Data', description: "Sign data with your identity", enabled: true, img: null},
    {title: 'Friend List', description: "Get a list of user's HandCash friends", enabled: true, img: null},
  ])
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [file, setFile] = useState(null)


  const steps = [
    {title: 'App Details', icon: '/assets/images/mobile.svg', Component: () => <AppDetails file={file} setFile={setFile} onSubmit={handleSubmit} />},
    {title: 'Redirections URL', icon: '/assets/images/send-square-2.svg', Component: () => <RedirectionURLs onSubmit={handleSubmit} /> },
    {title: 'App Permission', icon: '/assets/images/security-safe.svg', Component: () => <AppPermissions onSubmit={handleSubmit} permissions={permissions} onToggle={handleOnPermissionToggle}/>},
  ]



  const CurrentStepForm = useMemo(() => steps[currentStepIndex].Component, [currentStepIndex, file])

  function handleSubmit(e){
    e.preventDefault()

    if(currentStepIndex < steps.length - 1) setCurrentStepIndex(currentStepIndex + 1)
  }

  function handleOnPermissionToggle(title){
    const index = permissions.findIndex(permission => permission.title === title)
    if(index < 0) return

    const temp = [...permissions]
    temp[index].enabled = !temp[index].enabled

    setPermissions(temp)
  }

  return <DashboardLayout>
    <div className='mb-8'>
      <h1 className='text-black text-4xl'>Connect your app</h1>
      <h2 className='text-black text-lg font-light'>Connect your app to use the Relysia infrastructure technology</h2>
    </div>
    <div className='flex'>
      <div className='flex flex-col gap-12 mr-24 hidden md:flex'>
        {
          steps.map(({ title , icon}, i) => <Step title={title} subtext={`Step ${i + 1} of ${steps.length}`} icon={icon} active={currentStepIndex >= i} /> )
        }
      </div>
      <div>
        {
          CurrentStepForm ? <CurrentStepForm /> : null
        }
      </div>

    </div>
    
  </DashboardLayout>
}