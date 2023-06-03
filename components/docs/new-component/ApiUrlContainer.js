function ApiUrlContainer(props) {
  return (
    <div style={{ padding: '0px 10px' }}>
      <div
        style={{
          minHeight: '40px',
          border: '1px solid #dedede',
          backgroundColor: '#f9f9f9',
          display: 'flex',
          alignItems: 'center',
          padding: '0px 10px',
          overflow: 'hidden',
        }}
      >
        <p style={{ width: '100%', wordWrap: 'break-word' }}>{props.title}</p>
      </div>
    </div>
  )
}

export default ApiUrlContainer
