export const CreatenewWalletIcon = (props) => {
  const { activeState } = props
  return (
    <div
      key="newWalletIconSideBar"
      id="newWalletIconSideBar"
      className="svgIconsContainerSidebar"
    >
      <div className={`svGonSidebar `}>
        <svg
          key="newWalletIconSideBarsvg"
          id="newWalletIconSideBarsvg"
          viewBox="0 0 80 80"
          width="80"
          height="80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            width="80"
            height="80"
            rx="16"
            fill="#D8EBFD"
            fillOpacity=".3"
          />
          <path
            opacity=".8"
            d="m41.2 27.4-4 9h-3.7c-1 0-1.8.2-2.6.5l2.4-5.5v-.1l.1-.3.1-.2c1.8-4 3.7-5 7.7-3.4Z"
            fill="#38F"
          />
          <path
            d="M48.4 36.7c-.6-.2-1.2-.3-1.9-.3h-9.2l3.9-9 .6.2 3 1.2c1.6.7 2.7 1.4 3.4 2.3l.4.4.2.6.1.4c.4 1.1.2 2.5-.5 4.2Z"
            fill="#38F"
          />
          <path
            opacity=".4"
            d="M53 43v3.3c-.3 4.7-2.9 7-7.8 7H33.8c-4.2-.3-6.5-2.6-6.7-6.8l-.1-1V43a6.5 6.5 0 0 1 6.5-6.5h13A6.5 6.5 0 0 1 53 43Z"
            fill="#38F"
          />
          <path
            opacity=".6"
            d="m33.3 31.4-2.4 5.5c-2.3 1-4 3.4-4 6V39c0-3.8 2.8-7 6.4-7.6ZM53 39v4c0-3-2-5.5-4.6-6.3.7-1.7.9-3.1.5-4.2V32c2.4 1.3 4.1 4 4.1 7Z"
            fill="#38F"
          />
          <path
            d="M43.3 43.6H41v-2.3c0-.5-.5-1-1-1a1 1 0 0 0-1 1v2.3h-2.3a1 1 0 0 0-1 1c0 .5.4 1 1 1H39V48c0 .5.5 1 1 1s1-.5 1-1v-2.4h2.3c.6 0 1-.5 1-1 0-.6-.4-1-1-1Z"
            fill="#38F"
          />
        </svg>
        <div
          className={`svGonSidebar22 ${
            activeState ? 'activesvG' : 'activesvG2'
          }`}
        >
          <svg
            width="80"
            height="80"
            fill="none"
            viewBox="0 0 80 80"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="80" height="80" rx="16" fill="url(#a)" />
            <path
              opacity=".8"
              d="m41.2 27.4-4 9h-3.7c-1 0-1.8.2-2.6.5l2.4-5.5v-.1l.1-.3.1-.2c1.8-4 3.7-5 7.7-3.4Z"
              fill="#fff"
            />
            <path
              d="M48.4 36.7c-.6-.2-1.2-.3-1.9-.3h-9.2l3.9-9 .6.2 3 1.2c1.6.7 2.7 1.4 3.4 2.3l.4.4.2.6.1.4c.4 1.1.2 2.5-.5 4.2Z"
              fill="#fff"
            />
            <path
              opacity=".4"
              d="M53 43v3.3c-.3 4.7-2.9 7-7.8 7H33.8c-4.2-.3-6.5-2.6-6.7-6.8l-.1-1V43a6.5 6.5 0 0 1 6.5-6.5h13A6.5 6.5 0 0 1 53 43Z"
              fill="#fff"
            />
            <path
              opacity=".6"
              d="m33.3 31.4-2.4 5.5c-2.3 1-4 3.4-4 6V39c0-3.8 2.8-7 6.4-7.6ZM53 39v4c0-3-2-5.5-4.6-6.3.7-1.7.9-3.1.5-4.2V32c2.4 1.3 4.1 4 4.1 7Z"
              fill="#fff"
            />
            <path
              d="M43.3 43.6H41v-2.3c0-.5-.5-1-1-1a1 1 0 0 0-1 1v2.3h-2.3a1 1 0 0 0-1 1c0 .5.4 1 1 1H39V48c0 .5.5 1 1 1s1-.5 1-1v-2.4h2.3c.6 0 1-.5 1-1 0-.6-.4-1-1-1Z"
              fill="#fff"
            />
            <defs>
              <linearGradient
                id="a"
                x1="1.7"
                y1="3.3"
                x2="80"
                y2="80"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#3DB8F5" />
                <stop offset="1" stop-color="#1F42EF" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  )
}

// export const WalletIcon = (props) => {
//   const { activeState } = props
//   return (
//     <div className="svgIconsContainerSidebar">
//       <div className={`svGonSidebar `}>
//       <svg
//           width="80"
//           height="80"
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <rect width="80" height="80" rx="16" fill="#D8EBFD" />
//           <path
//             opacity=".8"
//             d="m41.2 27.4-4 9h-3.7c-1 0-1.8.2-2.6.5l2.4-5.5v-.1l.1-.3.1-.2c1.8-4 3.7-5 7.7-3.4Z"
//             fill="#38F"
//           />
//           <path
//             d="M48.4 36.7c-.6-.2-1.2-.3-1.9-.3h-9.2l3.9-9 .6.2 3 1.2c1.6.7 2.7 1.4 3.4 2.3l.4.4.2.6.1.4c.4 1.1.2 2.5-.5 4.2Z"
//             fill="#38F"
//           />
//           <path
//             opacity=".4"
//             d="M53 43v3.3c-.3 4.7-2.9 7-7.8 7H33.8c-4.2-.3-6.5-2.6-6.7-6.8l-.1-1V43a6.5 6.5 0 0 1 6.5-6.5h13A6.5 6.5 0 0 1 53 43Z"
//             fill="#38F"
//           />
//           <path
//             opacity=".6"
//             d="m33.3 31.4-2.4 5.5c-2.3 1-4 3.4-4 6V39c0-3.8 2.8-7 6.4-7.6ZM53 39v4c0-3-2-5.5-4.6-6.3.7-1.7.9-3.1.5-4.2V32c2.4 1.3 4.1 4 4.1 7Z"
//             fill="#38F"
//           />
//         </svg>
//         <div
//           className={`svGonSidebar22 ${
//             activeState ? 'activesvG' : 'activesvG2'
//           }`}
//         >
//            <svg
//             width="80"
//             height="80"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <rect width="80" height="80" rx="16" fill="url(#a)" />
//             <path
//               opacity=".8"
//               d="m41.2 27.4-4 9h-3.7c-1 0-1.8.2-2.6.5l2.4-5.5v-.1l.1-.3.1-.2c1.8-4 3.7-5 7.7-3.4Z"
//               fill="#fff"
//             />
//             <path
//               d="M48.4 36.7c-.6-.2-1.2-.3-1.9-.3h-9.2l3.9-9 .6.2 3 1.2c1.6.7 2.7 1.4 3.4 2.3l.4.4.2.6.1.4c.4 1.1.2 2.5-.5 4.2Z"
//               fill="#fff"
//             />
//             <path
//               opacity=".4"
//               d="M53 43v3.3c-.3 4.7-2.9 7-7.8 7H33.8c-4.2-.3-6.5-2.6-6.7-6.8l-.1-1V43a6.5 6.5 0 0 1 6.5-6.5h13A6.5 6.5 0 0 1 53 43Z"
//               fill="#fff"
//             />
//             <path
//               opacity=".6"
//               d="m33.3 31.4-2.4 5.5c-2.3 1-4 3.4-4 6V39c0-3.8 2.8-7 6.4-7.6ZM53 39v4c0-3-2-5.5-4.6-6.3.7-1.7.9-3.1.5-4.2V32c2.4 1.3 4.1 4 4.1 7Z"
//               fill="#fff"
//             />
//             <defs>
//               <linearGradient
//                 id="a"
//                 x1="1.7"
//                 y1="3.3"
//                 x2="80"
//                 y2="80"
//                 gradientUnits="userSpaceOnUse"
//               >
//                 <stop stop-color="#3DB8F5" />
//                 <stop offset="1" stop-color="#1F42EF" />
//               </linearGradient>
//             </defs>
//           </svg>
//         </div>
//       </div>
//     </div>
//   )
// }
export const WalletIcon = (props) => {
  const { activeState } = props
  return (
    <div className="svgIconsContainerSidebar">
      <div className={`svGonSidebar `}>
        <svg
          width="80"
          height="80"
          fill="none"
          viewBox="0 0 80 80"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            width="80"
            height="80"
            rx="16"
            fill="#D8EBFD"
            fill-opacity=".3"
          />
          <path
            opacity=".8"
            d="m41.2003 27.36-.04.0934-3.8667 8.9733h-3.8c-.9067 0-1.76.1733-2.56.52l2.3333-5.5733.0534-.12.08-.2134c.04-.0933.0666-.1733.1066-.24 1.7467-4.04 3.72-4.96 7.6934-3.44Z"
            fill="#0075FF"
          />
          <path
            d="M48.3863 36.6932c-.6-.1733-1.2267-.2667-1.88-.2667H37.293l3.8666-8.9733.04-.0933c.1867.0666.3867.16.5867.2266l2.9467 1.24c1.64.68 2.7866 1.3867 3.4933 2.24.12.16.2267.3067.3333.48.12.1867.2134.3734.2667.5734.0533.12.0933.2266.12.3466.3467 1.1334.1333 2.5067-.56 4.2267Z"
            fill="#0075FF"
          />
          <path
            opacity=".4"
            d="M53.013 42.9334v2.6c0 .2667-.0133.5334-.0267.7867-.2533 4.6667-2.8533 7.0133-7.7866 7.0133h-10.4c-.3334 0-.64-.0266-.9467-.0666-4.24-.28-6.5067-2.5467-6.8-6.7867-.04-.32-.0667-.6267-.0667-.9467v-2.6c0-2.68 1.6267-4.9866 3.9467-5.9866.8-.3467 1.6533-.52 2.56-.52h13.0133c.6534 0 1.28.0933 1.88.2666 2.6667.8134 4.6267 3.2934 4.6267 6.24Z"
            fill="#0075FF"
          />
          <path
            opacity=".6"
            d="m33.2663 31.3735-2.3333 5.5734c-2.32 1-3.9467 3.3066-3.9467 5.9866v-3.9066c0-3.7867 2.6934-6.9467 6.28-7.6534ZM53.0134 39.0265v3.9067c0-2.9467-1.96-5.4267-4.6267-6.24.6934-1.72.9067-3.0933.56-4.2267-.0267-.12-.0666-.2266-.12-.3466 2.4934 1.2933 4.1867 3.92 4.1867 6.9066Z"
            fill="#0075FF"
          />
        </svg>
        <div
          className={`svGonSidebar22 ${
            activeState ? 'activesvG' : 'activesvG2'
          }`}
        >
          <svg
            viewBox="0 0 80 80"
            width="80"
            height="80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="80" height="80" rx="16" fill="url(#a)" />
            <path
              opacity=".8"
              d="m41.2 27.4-4 9h-3.7c-1 0-1.8.2-2.6.5l2.4-5.5v-.1l.1-.3.1-.2c1.8-4 3.7-5 7.7-3.4Z"
              fill="#fff"
            />
            <path
              d="M48.4 36.7c-.6-.2-1.2-.3-1.9-.3h-9.2l3.9-9 .6.2 3 1.2c1.6.7 2.7 1.4 3.4 2.3l.4.4.2.6.1.4c.4 1.1.2 2.5-.5 4.2Z"
              fill="#fff"
            />
            <path
              opacity=".4"
              d="M53 43v3.3c-.3 4.7-2.9 7-7.8 7H33.8c-4.2-.3-6.5-2.6-6.7-6.8l-.1-1V43a6.5 6.5 0 0 1 6.5-6.5h13A6.5 6.5 0 0 1 53 43Z"
              fill="#fff"
            />
            <path
              opacity=".6"
              d="m33.3 31.4-2.4 5.5c-2.3 1-4 3.4-4 6V39c0-3.8 2.8-7 6.4-7.6ZM53 39v4c0-3-2-5.5-4.6-6.3.7-1.7.9-3.1.5-4.2V32c2.4 1.3 4.1 4 4.1 7Z"
              fill="#fff"
            />
            <defs>
              <linearGradient
                id="a"
                x1="1.7"
                y1="3.3"
                x2="80"
                y2="80"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#3DB8F5" />
                <stop offset="1" stop-color="#1F42EF" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  )
}

export const ZapierIcon = (props) => {
  const { activeState } = props
  return (
    <div className="svgIconsContainerSidebar">
      <div className={`svGonSidebar `}>
        <svg
          width="80"
          height="80"
          fill="none"
          viewBox="0 0 80 80"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            width="80"
            height="80"
            rx="16"
            fill="#D8EBFD"
            fillOpacity=".3"
          />
          <path
            opacity=".4"
            d="M48.3 53.3H31.7a5 5 0 0 1-5-5V31.7a5 5 0 0 1 5-5h16.6a5 5 0 0 1 5 5v16.6a5 5 0 0 1-5 5Z"
            fill="#38F"
          />
          <path
            d="M47.9 38.7h-4.7l3.3-3.3a8 8 0 0 0-1.9-2l-3.3 3.4V32L40 32l-1.3.1v4.7l-3.3-3.3a7.7 7.7 0 0 0-2 1.9l3.4 3.3H32L32 40l.1 1.3h4.7l-3.3 3.3a8 8 0 0 0 1.9 2l3.3-3.4V48l1.3.1 1.3-.1v-4.7l3.3 3.3 1-.8 1-1-3.4-3.4H48L48 40l-.1-1.3ZM42 40c0 .6-.1 1.2-.3 1.7a4.8 4.8 0 0 1-3.4 0 4.8 4.8 0 0 1 0-3.4 4.8 4.8 0 0 1 3.4 0c.2.5.3 1.1.3 1.7Z"
            fill="#38F"
          />
        </svg>
        <div
          className={`svGonSidebar22 ${
            activeState ? 'activesvG' : 'activesvG2'
          }`}
        >
          <svg
            width="80"
            height="80"
            fill="none"
            viewBox="0 0 80 80"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="80" height="80" rx="16" fill="url(#a)" />
            <path
              opacity=".4"
              d="M48.3 53.3H31.7a5 5 0 0 1-5-5V31.7a5 5 0 0 1 5-5h16.6a5 5 0 0 1 5 5v16.6a5 5 0 0 1-5 5Z"
              fill="#fff"
            />
            <path
              d="M47.9 38.7h-4.7l3.3-3.3a8 8 0 0 0-1.9-2l-3.3 3.4V32L40 32l-1.3.1v4.7l-3.3-3.3a7.7 7.7 0 0 0-2 1.9l3.4 3.3H32L32 40l.1 1.3h4.7l-3.3 3.3a8 8 0 0 0 1.9 2l3.3-3.4V48l1.3.1 1.3-.1v-4.7l3.3 3.3 1-.8 1-1-3.4-3.4H48L48 40l-.1-1.3ZM42 40c0 .6-.1 1.2-.3 1.7a4.8 4.8 0 0 1-3.4 0 4.8 4.8 0 0 1 0-3.4 4.8 4.8 0 0 1 3.4 0c.2.5.3 1.1.3 1.7Z"
              fill="#fff"
            />
            <defs>
              <linearGradient
                id="a"
                x1="1.7"
                y1="3.3"
                x2="80"
                y2="80"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#3DB8F5" />
                <stop offset="1" stop-color="#1F42EF" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  )
}
export const SettingsIcon = (props) => {
  const { activeState } = props
  return (
    <div className="svgIconsContainerSidebar">
      <div className={`svGonSidebar `}>
        <svg
          width="80"
          height="80"
          fill="none"
          viewBox="0 0 80 80"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            width="80"
            height="80"
            rx="16"
            fill="#D8EBFD"
            fillOpacity=".3"
          />
          <path
            opacity=".4"
            d="M45.6 26.7H34.4c-4.8 0-7.7 2.9-7.7 7.7v11.2c0 4.8 2.9 7.7 7.7 7.7h11.2c4.8 0 7.7-2.9 7.7-7.7V34.4c0-4.8-2.9-7.7-7.7-7.7Z"
            fill="#38F"
          />
          <path
            d="M44.8 49.7a1 1 0 0 1-1-1v-5.2c0-.6.4-1 1-1 .5 0 1 .4 1 1v5.2c0 .5-.5 1-1 1ZM44.8 35a1 1 0 0 1-1-1v-2.7c0-.5.4-1 1-1 .5 0 1 .5 1 1V34c0 .6-.5 1-1 1ZM35.2 49.7a1 1 0 0 1-1-1V46c0-.6.5-1 1-1 .6 0 1 .4 1 1v2.6c0 .5-.4 1-1 1ZM35.2 37.5a1 1 0 0 1-1-1v-5.2c0-.5.5-1 1-1 .6 0 1 .5 1 1v5.2c0 .6-.4 1-1 1Z"
            fill="#38F"
          />
          <path
            d="M44.8 33.8a3.6 3.6 0 0 0 0 7.2 3.6 3.6 0 0 0 0-7.2ZM35.2 39a3.6 3.6 0 1 0 0 7.2 3.6 3.6 0 0 0 0-7.2Z"
            fill="#38F"
          />
        </svg>
        <div
          className={`svGonSidebar22 ${
            activeState ? 'activesvG' : 'activesvG2'
          }`}
        >
          <svg
            width="80"
            height="80"
            fill="none"
            viewBox="0 0 80 80"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="80" height="80" rx="16" fill="url(#a)" />
            <path
              opacity=".4"
              d="M45.6 26.7H34.4c-4.8 0-7.7 2.9-7.7 7.7v11.2c0 4.8 2.9 7.7 7.7 7.7h11.2c4.8 0 7.7-2.9 7.7-7.7V34.4c0-4.8-2.9-7.7-7.7-7.7Z"
              fill="#fff"
            />
            <path
              d="M44.8 49.7a1 1 0 0 1-1-1v-5.2c0-.6.4-1 1-1 .5 0 1 .4 1 1v5.2c0 .5-.5 1-1 1ZM44.8 35a1 1 0 0 1-1-1v-2.7c0-.5.4-1 1-1 .5 0 1 .5 1 1V34c0 .6-.5 1-1 1ZM35.2 49.7a1 1 0 0 1-1-1V46c0-.6.5-1 1-1 .6 0 1 .4 1 1v2.6c0 .5-.4 1-1 1ZM35.2 37.5a1 1 0 0 1-1-1v-5.2c0-.5.5-1 1-1 .6 0 1 .5 1 1v5.2c0 .6-.4 1-1 1Z"
              fill="#fff"
            />
            <path
              d="M44.8 33.8a3.6 3.6 0 0 0 0 7.2 3.6 3.6 0 0 0 0-7.2ZM35.2 39a3.6 3.6 0 1 0 0 7.2 3.6 3.6 0 0 0 0-7.2Z"
              fill="#fff"
            />
            <defs>
              <linearGradient
                id="a"
                x1="1.7"
                y1="3.3"
                x2="80"
                y2="80"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#3DB8F5" />
                <stop offset="1" stop-color="#1F42EF" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  )
}
export const MintIcon = (props) => {
  const { activeState } = props
  return (
    <div className="svgIconsContainerSidebar">
      <div className={`svGonSidebar `}>
        <svg
          width="80"
          height="80"
          fill="none"
          viewBox="0 0 80 80"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            width="80"
            height="80"
            rx="16"
            fill="#D8EBFD"
            fillOpacity=".3"
          />
          <path
            opacity=".4"
            d="M40 53.3a13.3 13.3 0 1 0 0-26.6 13.3 13.3 0 0 0 0 26.6Z"
            fill="#38F"
          />
          <path
            d="M46 39.5c.5-.7.8-1.5.8-2.4a4 4 0 0 0-3.9-3.9h-1.2v-1.9c0-.5-.4-1-1-1a1 1 0 0 0-1 1v2h-1.6v-2a1 1 0 1 0-2 0v2H33.5a1 1 0 0 0-1 1c0 .5.5 1 1 1h1.3v9.5h-1.3a1 1 0 0 0-1 1c0 .5.5 1 1 1H36.1v1.9c0 .5.5 1 1 1 .6 0 1-.5 1-1v-2H39.8v2c0 .5.4 1 1 1 .5 0 1-.5 1-1v-2H44c2.3 0 4.3-1.7 4.3-3.8 0-1.5-1-2.8-2.3-3.4Zm-7.5-4.3h4.4c1.1 0 2 1 2 2s-1 1.8-2 1.8h-6.2v-3.8h1.8Zm5.5 9.6h-7.3V41H44c1.3 0 2.4.9 2.4 1.9 0 1-1 1.9-2.3 1.9Z"
            fill="#38F"
          />
        </svg>{' '}
        <div
          className={`svGonSidebar22 ${
            activeState ? 'activesvG' : 'activesvG2'
          }`}
        >
          <svg
            width="80"
            height="80"
            fill="none"
            viewBox="0 0 80 80"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="80" height="80" rx="16" fill="url(#a)" />
            <path
              opacity=".4"
              d="M40 53.3a13.3 13.3 0 1 0 0-26.6 13.3 13.3 0 0 0 0 26.6Z"
              fill="#fff"
            />
            <path
              d="M46 39.5c.5-.7.8-1.5.8-2.4a4 4 0 0 0-3.9-3.9h-1.2v-1.9c0-.5-.4-1-1-1a1 1 0 0 0-1 1v2h-1.6v-2a1 1 0 1 0-2 0v2H33.5a1 1 0 0 0-1 1c0 .5.5 1 1 1h1.3v9.5h-1.3a1 1 0 0 0-1 1c0 .5.5 1 1 1H36.1v1.9c0 .5.5 1 1 1 .6 0 1-.5 1-1v-2H39.8v2c0 .5.4 1 1 1 .5 0 1-.5 1-1v-2H44c2.3 0 4.3-1.7 4.3-3.8 0-1.5-1-2.8-2.3-3.4Zm-7.5-4.3h4.4c1.1 0 2 1 2 2s-1 1.8-2 1.8h-6.2v-3.8h1.8Zm5.5 9.6h-7.3V41H44c1.3 0 2.4.9 2.4 1.9 0 1-1 1.9-2.3 1.9Z"
              fill="#fff"
            />
            <defs>
              <linearGradient
                id="a"
                x1="1.7"
                y1="3.3"
                x2="80"
                y2="80"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#3DB8F5" />
                <stop offset="1" stop-color="#1F42EF" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  )
}
export const ManageIcon = (props) => {
  const { activeState } = props
  return (
    <div className="svgIconsContainerSidebar">
      <div className={`svGonSidebar `}>
        <svg
          width="80"
          height="80"
          fill="none"
          viewBox="0 0 80 80"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            width="80"
            height="80"
            rx="16"
            fill="#D8EBFD"
            fillOpacity=".3"
          />
          <path
            opacity=".4"
            d="M48.9 26.7h-2.5c-3 0-4.5 1.5-4.5 4.4v2.5c0 3 1.6 4.5 4.5 4.5h2.5c2.9 0 4.4-1.6 4.4-4.5v-2.5c0-2.9-1.5-4.4-4.4-4.4ZM33.7 42H31c-2.9 0-4.4 1.4-4.4 4.3V49c0 2.9 1.5 4.4 4.4 4.4h2.5c3 0 4.5-1.5 4.5-4.4v-2.5c0-3-1.5-4.5-4.4-4.5Z"
            fill="#38F"
          />
          <path
            d="M32.4 38.1a5.7 5.7 0 1 0 0-11.4 5.7 5.7 0 0 0 0 11.4ZM47.6 53.3a5.7 5.7 0 1 0 0-11.4 5.7 5.7 0 0 0 0 11.4Z"
            fill="#38F"
          />
        </svg>{' '}
        <div
          className={`svGonSidebar22 ${
            activeState ? 'activesvG' : 'activesvG2'
          }`}
        >
          <svg
            width="80"
            height="80"
            fill="none"
            viewBox="0 0 80 80"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="80" height="80" rx="16" fill="url(#a)" />
            <path
              opacity=".4"
              d="M48.9 26.7h-2.5c-3 0-4.5 1.5-4.5 4.4v2.5c0 3 1.6 4.5 4.5 4.5h2.5c2.9 0 4.4-1.6 4.4-4.5v-2.5c0-2.9-1.5-4.4-4.4-4.4ZM33.7 42H31c-2.9 0-4.4 1.4-4.4 4.3V49c0 2.9 1.5 4.4 4.4 4.4h2.5c3 0 4.5-1.5 4.5-4.4v-2.5c0-3-1.5-4.5-4.4-4.5Z"
              fill="#fff"
            />
            <path
              d="M32.4 38.1a5.7 5.7 0 1 0 0-11.4 5.7 5.7 0 0 0 0 11.4ZM47.6 53.3a5.7 5.7 0 1 0 0-11.4 5.7 5.7 0 0 0 0 11.4Z"
              fill="#fff"
            />
            <defs>
              <linearGradient
                id="a"
                x1="1.7"
                y1="3.3"
                x2="80"
                y2="80"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#3DB8F5" />
                <stop offset="1" stop-color="#1F42EF" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  )
}
export const FriendsIcon = (props) => {
  const { activeState } = props
  return (
    <div className="svgIconsContainerSidebar">
      <div className={`svGonSidebar `}>
        <svg
          width="80"
          height="80"
          fill="none"
          viewBox="0 0 80 80"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            width="80"
            height="80"
            rx="16"
            fill="#D8EBFD"
            fillOpacity=".3"
          />
          <path
            opacity=".4"
            d="M53.3 34.4v11.2c0 3.7-1.7 6.3-4.7 7.3-.9.3-2 .4-3 .4H34.4c-1 0-2.1-.1-3-.4-3-1-4.7-3.6-4.7-7.3V34.4c0-4.8 2.9-7.7 7.7-7.7h11.2c4.8 0 7.7 2.9 7.7 7.7Z"
            fill="#38F"
          />
          <path
            d="M48.6 52.9c-.9.3-2 .4-3 .4H34.4c-1 0-2.1-.1-3-.4.5-3.5 4.2-6.3 8.6-6.3 4.4 0 8.1 2.8 8.6 6.3ZM44.8 39.4a4.8 4.8 0 1 1-9.6 0 4.8 4.8 0 0 1 9.6 0Z"
            fill="#38F"
          />
        </svg>{' '}
        <div
          className={`svGonSidebar22 ${
            activeState ? 'activesvG' : 'activesvG2'
          }`}
        >
          <svg
            width="80"
            height="80"
            fill="none"
            viewBox="0 0 80 80"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="80" height="80" rx="16" fill="url(#a)" />
            <path
              opacity=".4"
              d="M53.3 34.4v11.2c0 3.7-1.7 6.3-4.7 7.3-.9.3-2 .4-3 .4H34.4c-1 0-2.1-.1-3-.4-3-1-4.7-3.6-4.7-7.3V34.4c0-4.8 2.9-7.7 7.7-7.7h11.2c4.8 0 7.7 2.9 7.7 7.7Z"
              fill="#fff"
            />
            <path
              d="M48.6 52.9c-.9.3-2 .4-3 .4H34.4c-1 0-2.1-.1-3-.4.5-3.5 4.2-6.3 8.6-6.3 4.4 0 8.1 2.8 8.6 6.3ZM44.8 39.4a4.8 4.8 0 1 1-9.6 0 4.8 4.8 0 0 1 9.6 0Z"
              fill="#fff"
            />
            <defs>
              <linearGradient
                id="a"
                x1="1.7"
                y1="3.3"
                x2="80"
                y2="80"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#3DB8F5" />
                <stop offset="1" stop-color="#1F42EF" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  )
}
export const ConnectIcon = (props) => {
  const { activeState } = props
  return (
    <div className="svgIconsContainerSidebar">
      <div className={`svGonSidebar `}>
        <svg
          width="80"
          height="80"
          fill="none"
          viewBox="0 0 80 80"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            width="80"
            height="80"
            rx="16"
            fill="#D8EBFD"
            fillOpacity=".3"
          />
          <path
            opacity=".4"
            d="M45.6 26.7H34.4c-4.8 0-7.7 2.9-7.7 7.7v11.2c0 4.8 2.9 7.7 7.7 7.7h11.2c4.8 0 7.7-2.9 7.7-7.7V34.4c0-4.8-2.9-7.7-7.7-7.7Z"
            fill="#38F"
          />
          <path
            d="M35 46.4h-.2a5.4 5.4 0 0 1-3.4-1.7 6 6 0 0 1 0-8.1l3-3.1a5.4 5.4 0 0 1 7.8 0 6 6 0 0 1 0 8.1l-1.5 1.5a1 1 0 0 1-1.4 0 1 1 0 0 1 0-1.3l1.4-1.6a4 4 0 0 0 0-5.3 3.5 3.5 0 0 0-5 0l-2.9 3a4 4 0 0 0 0 5.4c.6.6 1.4 1 2.2 1 .5.1 1 .6.9 1.2 0 .5-.5.9-1 .9Z"
            fill="#38F"
          />
          <path
            d="M41.7 48.2c-1.4 0-2.8-.6-3.9-1.7a6 6 0 0 1 0-8.1l1.5-1.5a1 1 0 0 1 1.4 0c.4.3.4 1 0 1.3l-1.4 1.6a4 4 0 0 0 0 5.3 3.5 3.5 0 0 0 5 0l2.9-3a4 4 0 0 0 0-5.4c-.6-.6-1.4-1-2.2-1a1 1 0 0 1-.9-1.2c0-.5.5-1 1.1-.9 1.3.2 2.5.8 3.4 1.7a6 6 0 0 1 0 8.1l-3 3.1a5.4 5.4 0 0 1-3.9 1.7Z"
            fill="#38F"
          />
        </svg>
        <div
          className={`svGonSidebar22 ${
            activeState ? 'activesvG' : 'activesvG2'
          }`}
        >
          <svg
            width="80"
            height="80"
            fill="none"
            viewBox="0 0 80 80"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="80" height="80" rx="16" fill="url(#a)" />
            <path
              opacity=".4"
              d="M45.6 26.7H34.4c-4.8 0-7.7 2.9-7.7 7.7v11.2c0 4.8 2.9 7.7 7.7 7.7h11.2c4.8 0 7.7-2.9 7.7-7.7V34.4c0-4.8-2.9-7.7-7.7-7.7Z"
              fill="#fff"
            />
            <path
              d="M35 46.4h-.2a5.4 5.4 0 0 1-3.4-1.7 6 6 0 0 1 0-8.1l3-3.1a5.4 5.4 0 0 1 7.8 0 6 6 0 0 1 0 8.1l-1.5 1.5a1 1 0 0 1-1.4 0 1 1 0 0 1 0-1.3l1.4-1.6a4 4 0 0 0 0-5.3 3.5 3.5 0 0 0-5 0l-2.9 3a4 4 0 0 0 0 5.4c.6.6 1.4 1 2.2 1 .5.1 1 .6.9 1.2 0 .5-.5.9-1 .9Z"
              fill="#fff"
            />
            <path
              d="M41.7 48.2c-1.4 0-2.8-.6-3.9-1.7a6 6 0 0 1 0-8.1l1.5-1.5a1 1 0 0 1 1.4 0c.4.3.4 1 0 1.3l-1.4 1.6a4 4 0 0 0 0 5.3 3.5 3.5 0 0 0 5 0l2.9-3a4 4 0 0 0 0-5.4c-.6-.6-1.4-1-2.2-1a1 1 0 0 1-.9-1.2c0-.5.5-1 1.1-.9 1.3.2 2.5.8 3.4 1.7a6 6 0 0 1 0 8.1l-3 3.1a5.4 5.4 0 0 1-3.9 1.7Z"
              fill="#fff"
            />
            <defs>
              <linearGradient
                id="a"
                x1="1.7"
                y1="3.3"
                x2="80"
                y2="80"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#3DB8F5" />
                <stop offset="1" stop-color="#1F42EF" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  )
}

export const NFTIcon = ({activeState}) => {
  return  <div className="svgIconsContainerSidebar">
    <div className={`svGonSidebar `}>
      <svg width="80" height="81" viewBox="0 0 80 81" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect y="0.817383" width="80" height="80" rx="16" fill="#D8EBFD" fillOpacity="0.3"/>
        <rect opacity="0.4" x="26.6797" y="27.4922" width="26.64" height="26.65" rx="6" fill="#0075FF"/>
        <path d="M45.2499 40.143L41.8743 31.8514C41.5232 30.9906 40.2432 31.2171 40.2092 32.1459L39.8298 41.372L44.457 41.3324C45.0686 41.3324 45.4877 40.7094 45.2499 40.143Z" fill="#0075FF"/>
        <path d="M39.0141 49.5396L39.8298 41.372L35.2138 41.4009C34.5965 41.4066 34.1774 42.0296 34.4153 42.596L37.3547 49.7831C37.6945 50.6213 38.9292 50.4401 39.0141 49.5396Z" fill="#0075FF"/>
      </svg>

      <div
        className={`svGonSidebar22 ${
          activeState ? 'activesvG' : 'activesvG2'
        }`}
      >
        <svg width="80" height="81" viewBox="0 0 80 81" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect y="0.817383" width="80" height="80" rx="16" fill="url(#paint0_linear_4690_9112)"/>
          <rect opacity="0.4" x="26.6797" y="27.4922" width="26.64" height="26.65" rx="6" fill="white"/>
          <path d="M45.2499 40.143L41.8743 31.8514C41.5232 30.9906 40.2432 31.2171 40.2092 32.1459L39.8298 41.372L44.457 41.3324C45.0686 41.3324 45.4878 40.7094 45.2499 40.143Z" fill="white"/>
          <path d="M39.0141 49.5396L39.8298 41.372L35.2138 41.4009C34.5965 41.4066 34.1774 42.0296 34.4153 42.596L37.3547 49.7831C37.6945 50.6213 38.9292 50.4401 39.0141 49.5396Z" fill="white"/>
          <defs>
            <linearGradient id="paint0_linear_4690_9112" x1="2.97189" y1="-27.5159" x2="80.7462" y2="-27.1466" gradientUnits="userSpaceOnUse">
              <stop stop-color="#3DB8F5"/>
              <stop offset="1" stop-color="#1F42EF"/>
            </linearGradient>
          </defs>
        </svg>


      </div>
    </div>
  </div>

}

export const InfraStructureIcon = (props) => {
  const { activeState } = props
  return (
    <div className="svgIconsContainerSidebar">
      <div className={`svGonSidebar `}>
        <svg
          width="80"
          height="80"
          fill="none"
          viewBox="0 0 80 80"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            width="80"
            height="80"
            rx="16"
            fill="#D8EBFD"
            fillOpacity=".3"
          />
          <path
            opacity=".4"
            d="M46.7 51.3H33.3c-4 0-6.6-2-6.6-6.6v-9.4c0-4.6 2.6-6.6 6.6-6.6h13.4c4 0 6.6 2 6.6 6.6v9.4c0 4.6-2.6 6.6-6.6 6.6Z"
            fill="#38F"
          />
          <path
            d="M32 46.3a1 1 0 0 1-1-1V34.7c0-.6.5-1 1-1s1 .4 1 1v10.6c0 .6-.5 1-1 1ZM36 41a1 1 0 0 1-1-1v-5.3c0-.6.5-1 1-1s1 .4 1 1V40c0 .5-.5 1-1 1ZM36 46.3a1 1 0 0 1-1-1V44c0-.5.5-1 1-1s1 .5 1 1v1.3c0 .6-.5 1-1 1ZM44 37a1 1 0 0 1-1-1v-1.3c0-.6.5-1 1-1s1 .4 1 1V36c0 .5-.5 1-1 1ZM40 46.3a1 1 0 0 1-1-1V34.7c0-.6.5-1 1-1s1 .4 1 1v10.6c0 .6-.5 1-1 1ZM44 46.3a1 1 0 0 1-1-1V40c0-.5.5-1 1-1s1 .5 1 1v5.3c0 .6-.5 1-1 1ZM48 46.3a1 1 0 0 1-1-1V34.7c0-.6.5-1 1-1s1 .4 1 1v10.6c0 .6-.5 1-1 1Z"
            fill="#38F"
          />
        </svg>
        <div
          className={`svGonSidebar22 ${
            activeState ? 'activesvG' : 'activesvG2'
          }`}
        >
          <svg
            width="80"
            height="80"
            fill="none"
            viewBox="0 0 80 80"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="80" height="80" rx="16" fill="url(#a)" />
            <path
              opacity=".4"
              d="M46.7 51.3H33.3c-4 0-6.6-2-6.6-6.6v-9.4c0-4.6 2.6-6.6 6.6-6.6h13.4c4 0 6.6 2 6.6 6.6v9.4c0 4.6-2.6 6.6-6.6 6.6Z"
              fill="#fff"
            />
            <path
              d="M32 46.3a1 1 0 0 1-1-1V34.7c0-.6.5-1 1-1s1 .4 1 1v10.6c0 .6-.5 1-1 1ZM36 41a1 1 0 0 1-1-1v-5.3c0-.6.5-1 1-1s1 .4 1 1V40c0 .5-.5 1-1 1ZM36 46.3a1 1 0 0 1-1-1V44c0-.5.5-1 1-1s1 .5 1 1v1.3c0 .6-.5 1-1 1ZM44 37a1 1 0 0 1-1-1v-1.3c0-.6.5-1 1-1s1 .4 1 1V36c0 .5-.5 1-1 1ZM40 46.3a1 1 0 0 1-1-1V34.7c0-.6.5-1 1-1s1 .4 1 1v10.6c0 .6-.5 1-1 1ZM44 46.3a1 1 0 0 1-1-1V40c0-.5.5-1 1-1s1 .5 1 1v5.3c0 .6-.5 1-1 1ZM48 46.3a1 1 0 0 1-1-1V34.7c0-.6.5-1 1-1s1 .4 1 1v10.6c0 .6-.5 1-1 1Z"
              fill="#fff"
            />
            <defs>
              <linearGradient
                id="a"
                x1="1.7"
                y1="3.3"
                x2="80"
                y2="80"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#3DB8F5" />
                <stop offset="1" stop-color="#1F42EF" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  )
}
export const CollapseIcon = (props) => {
  return (
    <div className="svgIconsContainerSidebar">
      <div className={`svGonSidebar `}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="80"
          height="80"
          fill="none"
          viewBox="0 0 80 80"
        >
          <rect
            width="80"
            height="80"
            fill="#FFCCD0"
            fillOpacity=".3"
            rx="16"
          />
          <path
            fill="#FE2C3D"
            d="M56 40c0 8.837-7.163 16-16 16s-16-7.163-16-16 7.163-16 16-16 16 7.163 16 16z"
            opacity=".4"
          />
          <path
            fill="#FE2C3D"
            d="M36.77 39.306h-4.796a2.54 2.54 0 01-2.537-2.536v-4.796a2.54 2.54 0 012.537-2.537h4.796a2.54 2.54 0 012.536 2.537v4.796a2.54 2.54 0 01-2.536 2.536zm-4.796-7.993a.662.662 0 00-.662.661v4.796c0 .364.297.661.662.661h4.796a.663.663 0 00.661-.661v-4.796a.663.663 0 00-.661-.662h-4.796zM47.993 39.306h-4.73a2.572 2.572 0 01-2.57-2.569v-4.73a2.572 2.572 0 012.57-2.57h4.73a2.572 2.572 0 012.569 2.57v4.73a2.572 2.572 0 01-2.569 2.57zm-4.73-7.993a.695.695 0 00-.695.693v4.731c0 .383.312.694.694.694h4.731a.695.695 0 00.694-.694v-4.73a.695.695 0 00-.694-.694h-4.73zM36.77 50.563h-4.796a2.54 2.54 0 01-2.537-2.537V43.23a2.54 2.54 0 012.537-2.536h4.796a2.54 2.54 0 012.536 2.536v4.796a2.54 2.54 0 01-2.536 2.536zm-4.796-7.994a.663.663 0 00-.662.661v4.796c0 .365.297.661.662.661h4.796a.662.662 0 00.661-.661V43.23a.663.663 0 00-.661-.661h-4.796zM47.993 50.563h-4.73a2.572 2.572 0 01-2.57-2.57v-4.73a2.572 2.572 0 012.57-2.57h4.73a2.572 2.572 0 012.569 2.57v4.73a2.572 2.572 0 01-2.569 2.57zm-4.73-7.994a.695.695 0 00-.695.694v4.73c0 .383.312.694.694.694h4.731a.695.695 0 00.694-.693v-4.731a.695.695 0 00-.694-.694h-4.73z"
          />
        </svg>
        <div className={`svGonSidebar22 ${true ? 'activesvG' : 'activesvG2'}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
            fill="none"
            viewBox="0 0 80 80"
          >
            <rect width="80" height="80" fill="url(#paint0_linear)" rx="16" />
            <path
              fill="#fff"
              d="M56 40c0 8.837-7.163 16-16 16s-16-7.163-16-16 7.163-16 16-16 16 7.163 16 16z"
              opacity=".4"
            />
            <path
              fill="#fff"
              d="M36.77 39.306h-4.796a2.54 2.54 0 01-2.537-2.536v-4.796a2.54 2.54 0 012.537-2.537h4.796a2.54 2.54 0 012.536 2.537v4.796a2.54 2.54 0 01-2.536 2.536zm-4.796-7.993a.662.662 0 00-.662.661v4.796c0 .364.297.661.662.661h4.796a.663.663 0 00.661-.661v-4.796a.663.663 0 00-.661-.662h-4.796zM47.993 39.306h-4.73a2.572 2.572 0 01-2.57-2.569v-4.73a2.572 2.572 0 012.57-2.57h4.73a2.572 2.572 0 012.569 2.57v4.73a2.572 2.572 0 01-2.569 2.57zm-4.73-7.993a.695.695 0 00-.695.693v4.731c0 .383.312.694.694.694h4.731a.695.695 0 00.694-.694v-4.73a.695.695 0 00-.694-.694h-4.73zM36.77 50.563h-4.796a2.54 2.54 0 01-2.537-2.537V43.23a2.54 2.54 0 012.537-2.536h4.796a2.54 2.54 0 012.536 2.536v4.796a2.54 2.54 0 01-2.536 2.536zm-4.796-7.994a.663.663 0 00-.662.661v4.796c0 .365.297.661.662.661h4.796a.662.662 0 00.661-.661V43.23a.663.663 0 00-.661-.661h-4.796zM47.993 50.563h-4.73a2.572 2.572 0 01-2.57-2.57v-4.73a2.572 2.572 0 012.57-2.57h4.73a2.572 2.572 0 012.569 2.57v4.73a2.572 2.572 0 01-2.569 2.57zm-4.73-7.994a.695.695 0 00-.695.694v4.73c0 .383.312.694.694.694h4.731a.695.695 0 00.694-.693v-4.731a.695.695 0 00-.694-.694h-4.73z"
            />
            <defs>
              <linearGradient
                id="paint0_linear"
                x1="1.7"
                y1="3.3"
                x2="80"
                y2="80"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#3DB8F5" />
                <stop offset="1" stop-color="#1F42EF" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  )
}
