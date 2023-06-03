import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
// get firebase auhtoken from redux
import { getInvoice } from '../../../axios-connect/wallet'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
//import qr code library
import QRCode from 'qrcode.react'


function Pay(props) {
    const router = useRouter()

    // The query object contains the query string parameters
    const { id } = router.query
    //get firebase auth token
    // create a state for invoice/getInvoice
    const [invoice, setInvoice] = React.useState(null)
    const [loading, setloading] = React.useState(false)

    const handleSubmit = async (id) => {
        try {
          const res = await getInvoice(id);
          if (res.statusCode === 200) {
            setInvoice(res)
          } else {
            toast.error('Failure', {
              position: 'bottom-left',
              autoClose: 10000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            })
          }
        } catch (error) {
          console.error(error)
          toast.error('Failure', {
            position: 'bottom-left',
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          })
        } finally {
          setloading(false)
        }
      }
    
    //trigger handleSubmit on page load
    useEffect(() => {
        handleSubmit(id)
    }, [id])

    console.log("myinvoice");
    console.log(invoice);
  
    // Use the id value in your component
    return (
        <div>
            <Head>
                <title>Invoice Pay | Relysia</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <div className="text-center bg-white text-black py-20" >
            <div className="col-12 h-full container mx-auto text-center" >
                myInvoice
                <div>Payment ID: {id}</div>
                <div> {id && <QRCode className='mx-auto my-5' value={id} />} </div>
                <div> TokenId: {invoice && invoice['modes']['ef63d9775da5']['PaymentOption_0']['transactions']['0']['outputs']['stas']['0']['tokenId']} </div>
                <div> Amount: {invoice && invoice['modes']['ef63d9775da5']['PaymentOption_0']['transactions']['0']['outputs']['stas']['0']['tokenAmount']} </div>
                <button className='py-2 px-6 mt-3 bg-green-300 rounded-xl' onClick={() => handleSubmit(id)}>Pay</button>

            </div>
            </div>
        </div>
    )
}

export default Pay