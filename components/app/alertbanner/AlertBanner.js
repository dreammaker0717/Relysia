import React from 'react'

const AlertBanner = ({isMobile,handleNoticeClick}) => {
  return (
    <div
    id="topAlertBanner"
    style={{
      display: localStorage.getItem('release_noticed') ? 'none' : '',
      height: localStorage.getItem('release_noticed') && '0px',
    }}
    onClick={handleNoticeClick}
  >
    <div
      style={{
        display: localStorage.getItem('release_noticed') ? 'none' : '',
        height: localStorage.getItem('release_noticed') && '0px',
      }}
      className="alertBanner_dashboard_container"
    >                                   
      <div className="alertBanner_dashboard">
        <div style={{ color: 'white', paddingBlock: '13px' }}>
          You are using the Beta release, you may encounter bugs or
          issues, don't hesitate to contact us anytime!
        </div>
        {!isMobile && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="pl-2 mt-3 w-6 h-6"
          >
            <line
              x1="1"
              y1="11"
              x2="11"
              y2="1"
              stroke="white"
              stroke-width="2"
            />
            <line
              x1="1"
              y1="1"
              x2="11"
              y2="11"
              stroke="white"
              stroke-width="2"
            />
          </svg>
        )}
      </div>
    </div>
  </div>
  )
}

export default AlertBanner