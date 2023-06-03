import React, { useState } from 'react'
import ImgCrop from 'antd-img-crop'
import { Upload } from 'antd'
import { ToastContainer, toast } from 'react-toastify'
import * as Icon from 'react-feather'

function UpdateImagePortrait(props) {
  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess('ok')
    }, 0)
  }

  const onPreview = async (file) => {
    let src = file.url
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader()
        reader.readAsDataURL(file.originFileObj)
        reader.onload = () => resolve(reader.result)
      })
    }
    const image = new Image()
    image.src = src
    const imgWindow = window.open(src)
    imgWindow.document.write(image.outerHTML)
  }

  const onChangeImage = ({ fileList: newFileList }) => {
    if (newFileList[0] && newFileList[0].size > 625000) {
      toast.error('Image must smaller than 5MB!', {
        position: 'bottom-left',
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
    } else {
      props.setimageFile(newFileList)
    }
  }

  return (
    <div>
      <ToastContainer />
      <ImgCrop rotate aspect={1 / 1}>
        <Upload
          customRequest={dummyRequest}
          listType="picture-card"
          fileList={props.imageFile}
          onChange={onChangeImage}
          onPreview={onPreview}
        >
          {props.imageFile.length < 1 && (
            <>
              {props.photoUrl ? (
                <img
                  style={{ height: 'auto', width: 'inherit' }}
                  src={props.photoUrl}
                />
              ) : (
                <Icon.Plus />
              )}
            </>
          )}
        </Upload>
      </ImgCrop>
    </div>
  )
}

export default UpdateImagePortrait
