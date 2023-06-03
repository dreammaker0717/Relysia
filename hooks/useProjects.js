import { useEffect, useState } from 'react'
import { getService, getServiceIDs } from 'axios-connect/api'
import { useSelector } from 'react-redux'
import authSelector from '@/redux/selectors/auth'
import { getAuth } from 'firebase/auth'

export default function useProjects() {
  const { currentUser } = getAuth()
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState()

  useEffect(() => {
    if (!currentUser) return

    setLoading(true)
    getServiceIDs(currentUser)
      .then((response) =>
        Promise.all(
          response.data.data.serviceIds.map((id) =>
            getService(currentUser, id),
          ),
        ),
      )
      .then((responses) => {
        setProjects(responses.map((response) => response.data.data))
      })
      .catch(setError)
      .finally(() => setLoading(false))
  }, [currentUser])

  return { projects, loading, error }
}
