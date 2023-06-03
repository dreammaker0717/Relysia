import Link from '../../common/active-link'

function GoBackAndNextButton(props) {
  const { listData, value } = props.data

  return (
    <div style={{ height: '60px', marginTop: '20px' }}>
      <div style={{ height: '1px', backgroundColor: '#000000' }}></div>
      <div
        style={{
          display: 'flex',
          height: '90%',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'inline-flex' }}>
          <p>hello</p>
          <Link
            activeClassName="active"
            href={`${
              value === null
                ? '/docs'
                : value === 0
                ? '/docs'
                : `${listData[value - 1].id}`
            }`}
          >
            <a>
              <p style={{ marginLeft: '10px' }}>
                {value === null
                  ? 'overview'
                  : value === 0
                  ? 'Overview'
                  : `${listData[value - 1].title}`}
              </p>
            </a>
          </Link>
        </div>

        <div
          style={{
            display: `${
              value == null
                ? 'none'
                : value === listData.length - 1
                ? 'none'
                : 'inline-flex'
            }`,
          }}
        >
          <p>ho</p>
          <Link
            activeClassName="active"
            href={`${
              value === listData.length - 1 || value === null
                ? ''
                : `/docs/${listData[value + 1].id}`
            }`}
          >
            <a>
              <p style={{ marginLeft: '10px' }}>
                {value === listData.length - 1
                  ? ' '
                  : `${listData[value + 1].title}`}
              </p>
            </a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default GoBackAndNextButton
