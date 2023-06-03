import React from 'react'
import Switch from 'react-switch'
import Router from 'next/router'
const AdddetailsSet = '/static/images/dashboard/dasboardSucess.svg'
const dummyImg = '/assets/images/docs/platform/wallet.svg'
const copyImg = '/assets/images/copy.png'
const settingImg = '/assets/images/setting.png'
const publicIcon = '/assets/images/publicIcon.png'
const privateIcon = '/assets/images/privateIcon.png'
const editIcon = '/assets/images/edit.png'
const UrlSet = '/static/images/dashboard/urlsucess.svg'
const PermissionSet = '/static/images/dashboard/permissionSet.svg'

const permissionData = [
  {
    label: 'User Public Profile',
    desc: "Get user's handle, display name and profile picture.",
    icon: publicIcon,
  },
  {
    label: 'Private Profile',
    desc: "Get user's email address and phone number.",
    icon: privateIcon,
  },
]
export default function AppInfoTemplate({ selectedApp }) {
  const {
    name,
    clientSecret,
    id,
    email,
    longDescription,
    shortDescription,
    successRedirectURL,
    permissions,
    errorRedirectURL,
  } = selectedApp

  const copyToClip = (val) => {
    // console.log(val, 'uuuuuuuuuuuuu')
    navigator.clipboard.writeText(val)
  }

  const handleClick = (id) => {
    Router.push(`/app/dashboard?id=${id}`)
  }
  return (
    <>
      <div>
        <div className="title-container flex justify-between px-3">
          <div className="flex items-center">
            <img src={dummyImg} className="icon-image" />

            <div>
              <div className="font-extrabold text-uppercase text-sm">
                {name}
              </div>

              <p className="text-xs">{shortDescription}</p>
            </div>
          </div>
          <div className="flex items-center">
            <Switch
              checked={true}
              onColor={'#0075FF'}
              height={15}
              width={30}
              onChange={() => {}}
            />
            <img
              src={settingImg}
              className="setting-img"
              onClick={() => handleClick(id)}
            />
          </div>
        </div>

        <div className="flex justify-between mb-5">
          <div className="wrapper-keys">
            <div className="font-extrabold">SECRET ID</div>
            <div className="secret-id flex justify-between px-3">
              <div className="label">{id}</div>
              <img
                src={copyImg}
                className="copy-img"
                onClick={() => copyToClip(id)}
              />
            </div>
          </div>
          <div className="wrapper-keys">
            <div className="font-extrabold">SECRET KEY</div>
            <div className="secret-id flex justify-between px-3">
              <div className="label">{clientSecret}</div>{' '}
              <img
                src={copyImg}
                className="copy-img"
                onClick={() => copyToClip(clientSecret)}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between ">
          <div className="detail-child">
            <div className="flex items-center section-detail px-2">
              <img src={AdddetailsSet} className="detail-img" />
              <p className="info-title">APP DETAILS</p>
            </div>
            <div>
              <div className="label-name">APP NAME</div>
              <div className="label-value">{name}</div>
            </div>
            <div>
              <div className="label-name">EMAIL PUBLISHER</div>
              <div className="label-value">{email}</div>
            </div>
            <div>
              <div className="label-name">SHORT DESCRIPTION</div>
              <div className="label-value">{shortDescription}</div>
            </div>
            <div>
              <div className="label-name">LONG DESCRIPTION</div>
              <div className="label-value">{longDescription}</div>
            </div>
          </div>

          <div className="detail-child">
            <div className="flex items-center section-detail">
              <img src={UrlSet} className="detail-img" />
              <p className="info-title">REDIRECT URL</p>
            </div>
            <div>
              <div className="label-name">AUTHORIZE ORIGIN URL</div>
              <div className="label-value">{successRedirectURL}</div>
            </div>
            <div>
              <div className="label-name">URL DECLINE REDIRECT</div>
              <div className="label-value">{errorRedirectURL}</div>
            </div>
            <div>
              <div className="flex items-center section-detail">
                <img src={PermissionSet} className="detail-img" />
                <p className="info-title">APP PERMISSION</p>
              </div>
              {permissionData.map((val) => (
                <div className="flex card-container items-center">
                  <img src={val.icon} className="permission-icon" />
                  <div className="flex  justify-between flex-1 items-center">
                    <div>
                      <p className="permission-label">{val.label}</p>
                      <p className="permission-desc">{val.desc}</p>
                    </div>
                    <Switch
                      checked={true}
                      onChange={() => {}}
                      onColor={'#0075FF'}
                      height={15}
                      width={30}
                    />
                  </div>
                </div>
              ))}
              <div
                className="flex items-center"
                onClick={() => handleClick(id)}
              >
                <p className="more">More Setting</p>
                <img src={editIcon} className="edit" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .wallet {
            background: rgba(65, 124, 241, 0.05);
            border-radius: 16px;
            cursor: pointer;
          }
          .subHeading {
            color: #666f99;
          }
          .icon-image {
            width: 30px;
            height: 30px;
            margin-right: 10px;
          }
          .setting-img {
            width: 24px;
            height: 24px;
            margin-left: 10px;
            cursor: pointer;
          }
          .title-container {
            background-color: rgba(65, 124, 241, 0.05);
            border-radius: 8px;
            padding: 15px 10px;
            margin-bottom: 20px;
          }
          .secret-id {
            background-color: rgba(65, 124, 241, 0.05);
            border-radius: 8px;
            padding: 10px;
            overflow: hidden;
          }
          .wrapper-keys {
            width: 48%;
          }
          .label {
            width: 90%;
            overflow: hidden;
          }
          .copy-img {
            cursor: pointer;
          }
          .section-detail {
            background-color: rgba(65, 124, 241, 0.05);
            border-radius: 8px;
            padding: 10px 10px;
            margin-bottom: 30px;
          }
          .detail-child {
            width: 48%;
            margin: 0;
          }
          .detail-img {
            width: 48px;
            height: 48px;
          }
          .info-title {
            font-size: 14px;
            color: #0075ff !constant;
            font-weight: 800;
            margin-left: 24px;
            // margin-bottom:20px
          }
          .label-value {
            font-size: 14px;
            color: #666f99;
            margin-bottom: 30px;
          }
          .label-name {
            font-size: 14px;
            margin-bottom: 10px;
            font-weight: 800;
          }
          .permission-label {
            font-weight: 800;
            font-size: 14;
          }
          .permission-desc {
            font-size: 14px;
            color: #666f99;
          }
          .permission-icon {
            width: 32px;
            height: 32px;
            margin-right: 20px;
          }
          .card-container {
            background-color: rgba(65, 124, 241, 0.05);
            border-radius: 8px;
            padding: 20px 10px;
            margin-bottom: 20px;
          }
          .more {
            color: #666f99;
            font-size: 12px;
            text-decoration: underline;
            margin-right: 10px;
            cursor: pointer;
          }
          .edit {
            width: 16px;
            height: 16px;
            cursor: pointer;
          }
        `}
      </style>
    </>
  )
}
