import PropTypes from 'prop-types'
import styles from './index.module.css'

const BlogSocialIcon = ({ iconType }) => {
  const icons = {
    instagram: (
      <svg
        width="32"
        height="32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="5.268"
          y="5.263"
          width="21.514"
          height="21.514"
          rx="3"
          fill="#fff"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M20.712 8.49h-9.511a2.757 2.757 0 00-2.754 2.754v9.512a2.757 2.757 0 002.754 2.754h9.511a2.757 2.757 0 002.754-2.754v-9.512a2.757 2.757 0 00-2.754-2.753zm-4.755 12.454A4.95 4.95 0 0111.013 16a4.95 4.95 0 014.944-4.944A4.95 4.95 0 0120.9 16a4.95 4.95 0 01-4.944 4.944zm3.933-10.036c0 .645.525 1.17 1.17 1.17a1.171 1.171 0 10-1.17-1.17z"
          fill="url(#paint0_linear)"
        />
        <path
          d="M15.958 13.145A2.859 2.859 0 0013.102 16a2.859 2.859 0 002.856 2.855A2.858 2.858 0 0018.812 16a2.858 2.858 0 00-2.854-2.855z"
          fill="url(#paint1_linear)"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 15.957C0 7.145 7.145 0 15.957 0c8.812 0 15.957 7.145 15.957 15.957 0 8.812-7.145 15.957-15.957 15.957C7.145 31.914 0 24.769 0 15.957zm20.713 9.642a4.848 4.848 0 004.843-4.843v-9.512a4.848 4.848 0 00-4.843-4.843h-9.512a4.848 4.848 0 00-4.842 4.843v9.512a4.848 4.848 0 004.842 4.843h9.512z"
          fill="url(#paint2_linear)"
        />
        <defs>
          <linearGradient
            id="paint0_linear"
            x1="7.474"
            y1="16.724"
            x2="25.09"
            y2="23.51"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#E70060" />
            <stop offset=".974" stopColor="#FC8F0C" />
          </linearGradient>
          <linearGradient
            id="paint1_linear"
            x1="12.733"
            y1="16.275"
            x2="19.43"
            y2="18.855"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#E70060" />
            <stop offset=".974" stopColor="#FC8F0C" />
          </linearGradient>
          <linearGradient
            id="paint2_linear"
            x1="-2.068"
            y1="17.494"
            x2="35.364"
            y2="31.914"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#E70060" />
            <stop offset=".974" stopColor="#FC8F0C" />
          </linearGradient>
        </defs>
      </svg>
    ),
    twitter: (
      <svg
        width="32"
        height="32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.886 31.772c8.774 0 15.886-7.112 15.886-15.886S24.66 0 15.886 0 0 7.112 0 15.886s7.112 15.886 15.886 15.886z"
          fill="url(#paint1_linear)"
        />
        <path
          d="M26.509 11.38a7.576 7.576 0 01-2.182.598 3.808 3.808 0 001.67-2.1 7.6 7.6 0 01-2.411.92 3.798 3.798 0 00-6.47 3.464 10.78 10.78 0 01-7.828-3.967 3.797 3.797 0 001.175 5.07 3.77 3.77 0 01-1.72-.476v.048a3.8 3.8 0 003.046 3.723 3.785 3.785 0 01-1.714.066 3.801 3.801 0 003.547 2.637A7.618 7.618 0 018 22.935a10.74 10.74 0 005.82 1.706c6.985 0 10.804-5.786 10.804-10.804 0-.165-.003-.329-.01-.491a7.702 7.702 0 001.895-1.965z"
          fill="#fff"
        />
        <defs>
          <linearGradient
            id="paint1_linear"
            x1="-2.059"
            y1="17.416"
            x2="35.208"
            y2="31.772"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#E70060" />
            <stop offset=".974" stopColor="#FC8F0C" />
          </linearGradient>
        </defs>
      </svg>
    ),
    facebook: (
      <svg
        width="32"
        height="32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.886 31.772c8.774 0 15.886-7.112 15.886-15.886S24.66 0 15.886 0 0 7.112 0 15.886s7.112 15.886 15.886 15.886z"
          fill="url(#paint2_linear)"
        />
        <path
          d="M19.88 16.508h-2.835v10.385h-4.294V16.508h-2.043v-3.65h2.043v-2.361c0-1.69.802-4.334 4.333-4.334l3.181.013V9.72h-2.308c-.379 0-.911.19-.911.995v2.148h3.21l-.376 3.646z"
          fill="#fff"
        />
        <defs>
          <linearGradient
            id="paint2_linear"
            x1="-2.059"
            y1="17.416"
            x2="35.208"
            y2="31.772"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#E70060" />
            <stop offset=".974" stopColor="#FC8F0C" />
          </linearGradient>
        </defs>
      </svg>
    ),
  }

  return icons[iconType]
}

BlogSocialIcon.propTypes = {
  iconType: PropTypes.string.isRequired,
}

export default BlogSocialIcon
