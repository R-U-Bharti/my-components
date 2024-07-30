import { lazy } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Header from './Header'
const Sidebar = lazy(() => import('./Sidebar/Sidebar'))

const ProtectedRoutes = ({ navToggle }) => {

    let token = window.sessionStorage.getItem('token') || ''

    return (
        <>
            <div className='flex w-screen h-screen'>

                <aside className={`animate__animated animate__slideInLeft animate__faster ${navToggle ? 'w-[75%] md:w-[18%]' : 'w-[10%] md:w-[4%]'} max-w-[90%] group transition-all duration-200 bg-[#132438] *:text-white overflow-auto`}>
                    <Sidebar />
                </aside>

                <main className='flex-1 md:p-4 p-2 overflow-auto bg-[#f2f3f5]'>
                    <Header />
                    {token ? <Outlet /> : <Navigate to="/" />}
                </main>

            </div>
        </>
    )
}

export default ProtectedRoutes