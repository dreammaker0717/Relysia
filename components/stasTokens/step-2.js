import Image from 'next/image'
import Dropzone from 'react-dropzone'
export default function TokenStep2(props) {
  return (
    <div>
      <Dropzone
        onDrop={props.beforeUploaded}
        accept={['image/*', '.glb']}
        minSize={0}
        maxSize={3145728}
        maxFiles={1}
        multiple={false}
      >
        {({
          getRootProps,
          getInputProps,
          isDragActive,
          isDragAccept,
          isDragReject,
        }) => {
          const additionalClass = isDragAccept
            ? props.classes.dropZoneActive
            : isDragReject
            ? props.classes.dropZoneReject
            : ''

          return (
            <div
              {...getRootProps({
                className: `${props.classes.dropZone} ${additionalClass}`,
              })}
            >
              <input {...getInputProps()} />

              {props.fileList && props.fileList.length ? (
                <img
                  style={{ maxHeight: '150px' }}
                  src={URL.createObjectURL(props.fileList[0])}
                />
              ) : (
                <>
                  {' '}
                  <Image
                    src="/images/tokens/uploadSVG.svg"
                    width={57}
                    height={66}
                    alt="upload"
                    key={`imgg-upload`}
                  />
                  <p className="text-lg font-bold">Upload your document</p>
                  <p>Drag & drop files</p>
                  <p>or browser your file here</p>
                </>
              )}
            </div>
          )
        }}
      </Dropzone>
    </div>
  )
}
