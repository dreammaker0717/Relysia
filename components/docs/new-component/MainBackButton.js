import Link from '../../common/active-link'

function MainBackButton(props) {
  return (
    <div style={{ height: '100px', display: 'flex', alignItems: 'center' }}>
      <div style={{ display: 'inline-flex' }}>
        <Link activeClassName="active" href="/docs">
          <a>
            <p>Go Back</p>
          </a>
        </Link>
        <h6 style={{ marginLeft: '10px' }}>{props.title}</h6>
      </div>
    </div>
  )
}

export default MainBackButton
