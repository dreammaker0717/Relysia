import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useTokens(id){
  const [token, setToken] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  async function fetchTokenDetails(){
    const { data } = await axios.get(`https://api.relysia.com/v1/token/${id}`)
    setToken(data.data)
  }
  
  useEffect(() => {
    if(!id) return

    fetchTokenDetails().then().catch(setError).finally(() => setLoading(false))
  }, [id])

  return {token, loading, error}
}
