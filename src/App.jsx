import './App.css'
import 'animate.css'
import { lazy, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { contextVar } from '@/Context/contextVar'

const App = () => {

  const [headerRoute, setHeaderRoute] = useState('')
  const [headerText, setHeaderText] = useState('')
  const [navToggle, setNavToggle] = useState(window.innerWidth > 768 ? true : false)
  const [userDetails, setUserDetails] = useState(JSON.parse(sessionStorage.getItem('userProfile')) || null)

  const contextData = {
    headerRoute, setHeaderRoute,
    headerText, setHeaderText,
    navToggle, setNavToggle,
    userDetails, setUserDetails
  }

  const publicRoutes = [

  ]

  const routes = [

  ]

  // Disable Right Click
  useEffect(() => {
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault()
    })
  })

  return (
    <>

      <Toaster />

      <contextVar.Provider value={contextData}>
        <Routes>

          {
            publicRoutes?.map((elem, index) =>
              <Route key={index} path={elem?.path} element={elem?.element} />
            )
          }

          <Route element={<ProtectedRoutes navToggle={navToggle} />}>
            {
              routes?.map((elem, index) =>
                <Route key={index} path={elem?.path} element={elem?.element} />
              )
            }
          </Route>

        </Routes>
      </contextVar.Provider>
    </>
  )
}

export default App