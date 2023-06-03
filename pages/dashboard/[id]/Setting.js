import styles from 'pages/dashboard/[id]/index.module.css'

export default function Setting({ title, subtext, img, enabled }) {
  const bgHighlight = styles['bg-highlight']

  return (
    <div
      className={`${bgHighlight} flex justify-between items-center rounded-lg p-4 w-96 cursor-pointer`}
    >
      <div className="flex items-center justify-center h-16 w-16 ml-4 mr-4">
        {img && <img src={img} />}
      </div>
      <div className="mr-8">
        <div className="uppercase text-sm font-bold">{title}</div>
        <div className="text-sm font-semibold opacity-50">{subtext}</div>
      </div>
      <div
        className={`flex flex-grow transition-all duration-200 w-6 h-5 p-1 aspect-square rounded-full border-2 ${
          enabled ? 'border-blue-500' : 'border-gray-500'
        }`}
      >
        <div
          className={`transition-all duration-200 w-full h-full bg-blue-500 rounded-full ${
            enabled ? 'opacity-100' : 'opacity-0'
          }`}
        ></div>
      </div>
    </div>
  )
}
