function CodeContainer(props) {
  return (
    <div style={{ padding: '0px 10px' }}>
      <div
        style={{
          minHeight: '40px',
          border: '1px solid #dedede',
          backgroundColor: '#f9f9f9',
          display: 'flex',
          alignItems: 'center',
          paddingLeft: '10px',
          overflow: 'hidden',
        }}
      >
        <pre style={{ width: '100%' }}>{props.title}</pre>
      </div>
    </div>
  )
}

export default CodeContainer
