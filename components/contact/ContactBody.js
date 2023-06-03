import React from 'react'

export default function ContactBody() {
  return (
    <div className="bg-gray-900">
      <div className="w-full container pt-10 mx-auto">
        <div>
          <div className="mb-4">
            <h1 className="fontSofiaPro text-3xl text-center mb-3">Contact Us</h1>
            <p className="fontSofiaPro mb-10 text-center w-1/2 mx-auto">
              Please complete the form and our team will be in touch with you
              shortly. If you prefer, you can also join us on the bitcoinSV
              discord or send us an email. We look forward to hearing from you.
            </p>
            <h3 className="text-2xl text-center mb-3"> Vaionex Corporation </h3>
            <div className="flex flex-col mb-4 text-center">
              <p color="primary" size="large" className="ml-0 pl-0 text-white ">
                2035 Sunset Lake Road, Suite B-2, Newark, DE 19702
              </p>
              <p color="primary" size="large" className="ml-0 pl-0 text-white">
                Admin [at] Relysia.com
              </p>
            </div>
          </div>
        </div>
        <div>
          <iframe
            className="clickup-embed clickup-dynamic-height"
            src="https://forms.clickup.com/24418489/f/q965t-13888/ORGF3VO4T8PXDGB5AL"
            onWheel=""
            width="100%"
            height="900px"
            //remove outline
            style={{
              background: 'transparent',
              border: '0px solid #ccc',
              outline: 'none',
            }}
          />
        </div>
      </div>
    </div>
  )
}
