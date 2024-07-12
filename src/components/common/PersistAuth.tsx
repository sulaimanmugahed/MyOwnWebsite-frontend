import { useEffect, useState } from "react"
import { useAuth } from "../../hooks/UseAuth"
import { useRefreshToken } from "../../hooks/UseRefreshToken"
import { Outlet } from "react-router-dom"




const PersistAuth = () => {

  const refresh = useRefreshToken()
  const [isLoading, setIsLoading] = useState(true)
  const { accessToken } = useAuth()


  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh()

      } catch (err) {
        console.log(err)
      }
      finally {
        setIsLoading(false)

      }
    }

    !accessToken ? verifyRefreshToken() : setIsLoading(false)
  }, [])

 

  return (
    <>
      {
        !isLoading &&
        <Outlet />
      }
    </>
  )

}

export default PersistAuth