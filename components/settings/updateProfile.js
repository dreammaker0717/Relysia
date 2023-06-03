import { Upload } from 'antd'

import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Avatar } from '@material-ui/core'
import InputwithIcon from '../common/inputs/InputwithIcon'
import MaterialUiCustomButtom from '../common/materialUi-button'
import { firebaseAuthFunc } from '@/config/init'
import { updateProfile } from 'firebase/auth'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { useDispatch } from 'react-redux'
import { updateUserDataAction } from '@/redux/slices/auth'

function UpdateProfile({ userData, ...props }) {
  const [show, setShow] = React.useState('opacity-0')
  React.useEffect(() => {
    setShow('opacity-1')
  }, [])
  const [displayNameIn, setdisplayName] = React.useState(null)
  const [fileList, setFilelist] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const dispatch = useDispatch()

  function beforeUpload(file, sss) {
    const isJpgOrPng = file.type.includes('image')
    if (!isJpgOrPng) {
      toast.error('You can only upload images file!')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      toast.error('Image must smaller than 2MB!')
    }
    if (isJpgOrPng && isLt2M) {
      setFilelist([file])
      return false
    } else {
      return false
    }
  }
  useEffect(() => {
    if (userData) {
      setdisplayName(userData.displayName)
    }
  }, [userData])
  function onChange(e) {
    setdisplayName(e.target.value)
  }

  function handleError(error) {
    setLoading(false)
    console.log(error)
    toast.error(error.message)
  }
  const firebaseUpload = async () => {
    const file = fileList[0]
    if (file) {
      let reader = new FileReader()
      reader.readAsArrayBuffer(file)
      reader.onload = async function () {
        const storage = getStorage()
        const storageRef = ref(storage, `profilePicUsers/${userData.uid}`)
        const metadata = {
          contentType: 'image/jpeg',
        }
        await uploadBytes(storageRef, reader.result, metadata)
          .then(async () => {
            getDownloadURL(storageRef).then(async (url) => {
              let userNow = firebaseAuthFunc.currentUser
              let storedUser = { ...userData }
              storedUser.photoUrl = url
              await updateProfile(userNow, {
                photoURL: url,
              }).then(function () {
                dispatch(updateUserDataAction(storedUser))
                setLoading(false)
                setFilelist([])
                toast.success('Profile picture changed')
              })
            })
            setLoading(false)
          })
          .catch((err) => {
            console.log('err **', err)
          })
      }
    } else {
      setLoading(false)
    }
  }
  async function updatedisplayName() {
    setLoading(true)
    let userNow = firebaseAuthFunc.currentUser
    let storedUser = { ...userData }
    storedUser.displayName = displayNameIn
    await updateProfile(userNow, {
      displayName: displayNameIn?.trim(),
    })
      .then(function () {
        dispatch(updateUserDataAction(storedUser))
        setLoading(false)
        toast.success('Username Changed')
      })
      .catch(handleError)
  }

  function handeFunction() {
    setLoading(true)
    if (userData) {
      if (userData?.displayName !== displayNameIn?.trim()) {
        updatedisplayName()
      }
      if (fileList.length > 0) {
        firebaseUpload()
      } else {
        setLoading(false)
      }
    } else {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1>UPDATE YOUR PROFILE</h1>
      <span className="text-sm">
        Your username - To be displayed for other users.
      </span>

      <div className="w-full my-6">
        <InputwithIcon
          onChange={onChange}
          name="Username"
          type="text"
          iconState="profile"
          //  helperText="Please Enter Email"
          value={displayNameIn}
        />
      </div>
      <div className="w-full my-6">
        <h1>Upload Profile Image</h1>
        <span className="text-sm">
          Please upload a maximum image size of 2MB
        </span>
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          beforeUpload={beforeUpload}
          onRemove={() => setFilelist([])}
          showUploadList={false}
        >
          {userData && (
            <div>
              {fileList.length === 0 ? (
                <Avatar src={userData.photoUrl} />
              ) : (
                <Avatar src={URL.createObjectURL(fileList[0])} />
              )}{' '}
            </div>
          )}
        </Upload>
        <div className="w-[100%]">
          <Upload
            name="avatarButton"
            beforeUpload={beforeUpload}
            onRemove={() => setFilelist([])}
            showUploadList={false}
          >
            <div>
              <MaterialUiCustomButtom
                background="linear-gradient(134.44deg, #3DB8F5 3.12%, #1F42EF 100%)"
                // afterTextIcon={<img src="/images/inputIcons/uploadDoc.svg" />}
                iconState={'uploadDoc'}
                label="Upload   "
                // loading={loading}
              />{' '}
            </div>
          </Upload>
        </div>
      </div>
      <MaterialUiCustomButtom
        label="Save Settings"
        onClick={handeFunction}
        loading={loading}
      />
    </div>
  )
}

export default UpdateProfile
