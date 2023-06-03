import React, { useState } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import Slide from '@material-ui/core/Slide'
import { tokensFirebaseStorage } from '@/config/init'

import { ToastContainer, toast } from 'react-toastify'
import { PlusIcon } from '@heroicons/react/24/solid'
import { makeStyles } from '@material-ui/core/styles'
import { Upload, message } from 'antd'
import ImgCrop from 'antd-img-crop'
import { v4 as uuidv4 } from 'uuid'

const useStyles = makeStyles((theme) => ({
  select: {
    '&:before': {
      borderColor: '#f48665',
    },
    '&:after': {
      borderColor: '#f48665',
    },
  },
  icon: {
    fill: '#f48665',
  },
}))

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function MintTokenDialog(props) {
  const classes = useStyles()

  const [loading, setloading] = useState(false)
  const [tokenName, settokenName] = useState('')
  const [tokenSupply, settokenSupply] = useState('')
  const [tokenWebUrl, settokenWebUrl] = useState('')
  const [tokenDesc, settokenDesc] = useState('')
  const [imageFile, setimageFile] = useState([])

  const handleClose = () => {
    props.setdialogState(false)
  }

  const mintTokenFunc = async () => {
    setloading(true)
    if (props.walletComputerObj) {
      let imageId = uuidv4()
      let uploadTask = tokensFirebaseStorage.child('tokensLogos/' + imageId)
      uploadTask.put(imageFile[0].originFileObj)
      let logo = `https://firebasestorage.googleapis.com/v0/b/relysia-cdbf8/o/nftTemp%2F${imageId}?alt=media`
      try {
        const publicKey = props.walletComputerObj.db.wallet
          .getPublicKey()
          .toString()
        const TokenSc = `class Token {
          constructor(to, supply, name, description, tokenImage, websiteUrl) {
            this.coins = supply;
            this._owners = [to];
            this.name = name;
            this.description = description;
            this.tokenImage = tokenImage;
            this.websiteUrl = websiteUrl;
          }
        
          send(amount, to) {
            if (this.coins < amount) throw new Error();
            this.coins -= amount;
            return new Token(to, amount, this.name, this.description, this.tokenImage, this.websiteUrl);
          }
        }
        `
        const token = await props.walletComputerObj.new(TokenSc, [
          publicKey,
          tokenSupply,
          tokenName,
          tokenDesc,
          logo,
          tokenWebUrl,
        ])
        let tokenData = JSON.parse(JSON.stringify(token))
        // console.log(
        //   `Minted ${token.name} with supply ${tokenSupply} and id ${token._id}`
        // );

        setTimeout(() => {
          setimageFile([])
          settokenName('')
          settokenWebUrl('')
          settokenDesc('')
          settokenSupply('')

          toast.success(`Minted ${token.name} token successfully!`, {
            position: 'bottom-left',
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          })
          setloading(false)
          handleClose()
          props.getTokens()
        }, 1000)
      } catch (err) {
        // console.log("catch err", err);
        toast.error(err.message, {
          position: 'bottom-left',
          autoClose: 10000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        })

        setloading(false)
      }
    }
  }

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess('ok')
    }, 0)
  }

  const onChangeImage = ({ fileList: newFileList }) => {
    if (newFileList[0] && newFileList[0].size > 625000) {
      message.error('Image must smaller than 5MB!')
    } else {
      setimageFile(newFileList)
    }
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

  return (
    <Dialog
      open={props.dialogState}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
      fullWidth
      style={{ zIndex: 1000 }}
      maxWidth="sm"
      className="custom-dialog"
    >
      {/* <PerfectScrollbar style={{ maxHeight: "90vh" }}> */}
      <h5 style={{ padding: '18px 24px 5px 24px' }}>Mint Token</h5>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          mintTokenFunc()
        }}
      >
        <DialogContent>
          <>
            <div className="form-group">
              <label>Token Name</label>

              <input
                onChange={(e) => {
                  settokenName(e.target.value)
                }}
                value={tokenName}
                type="text"
                className="form-control"
                placeholder="Enter token name"
                required
              />
            </div>
            <div className="form-group">
              <label>Token Supply</label>

              <input
                onChange={(e) => {
                  settokenSupply(e.target.value)
                }}
                value={tokenSupply}
                type="number"
                className="form-control"
                placeholder="Enter the desired token supply"
                required
              />
            </div>

            <div className="form-group">
              <label>Website URL</label>

              <input
                onChange={(e) => {
                  settokenWebUrl(e.target.value)
                }}
                value={tokenWebUrl}
                type="text"
                className="form-control"
                placeholder="URL"
                required
              />
            </div>

            <div className="form-group">
              <label>Token Description</label>

              <textarea
                onChange={(e) => {
                  settokenDesc(e.target.value)
                }}
                value={tokenDesc}
                type="text"
                className="form-control"
                placeholder="Description"
                required
                rows="3"
              />
            </div>

            <div className="form-group">
              <label>Token Logo</label>
              <div>
                <ImgCrop rotate>
                  <Upload
                    customRequest={dummyRequest}
                    listType="picture-card"
                    fileList={imageFile}
                    onChange={onChangeImage}
                    onPreview={onPreview}
                  >
                    {imageFile.length < 1 && (
                      <PlusIcon className="h-6 w-6 text-blue-500" />
                    )}
                  </Upload>
                </ImgCrop>
              </div>
            </div>
          </>
        </DialogContent>
        <DialogActions style={{ marginTop: 10, height: 50 }}>
          {(() => {
            if (loading) {
              return (
                <div style={{ width: 80 }}>
                  {/* <CustomLoader width={25} height={25} /> */}
                </div>
              )
            } else {
              return (
                <button type="submit" className="btn btn-primary btn-small">
                  Mint
                </button>
              )
            }
          })()}
        </DialogActions>
      </form>
      <ToastContainer />
      {/* </PerfectScrollbar> */}
    </Dialog>
  )
}
