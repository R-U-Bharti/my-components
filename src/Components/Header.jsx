import React, { useContext, useState } from 'react'
import { FaHome, FaUser } from 'react-icons/fa'
import { RxCaretRight } from 'react-icons/rx'
import { contextVar } from '@/Context/contextVar'
import profile from '@/assets/profile.svg'
import { IoLockClosed, IoSettingsSharp } from 'react-icons/io5';
import { HiOutlineLogout } from 'react-icons/hi';
import { NavLink, useNavigate } from 'react-router-dom'
import { FaBars } from 'react-icons/fa6'

const Header = () => {

  const { headerText, headerRoute, navToggle, setNavToggle, userDetails, setUserDetails } = useContext(contextVar)

  const [image, setImage] = useState(profile)
  const [toggle, setToggle] = useState(false)

  const navigate = useNavigate()

  const profileMenu = [
    { icon: <FaUser />, path: '', name: "View Profile" },
    { icon: <IoSettingsSharp />, path: '', name: "Edit Profile" },
    { icon: <IoLockClosed />, path: '', name: "Reset Password" },
  ]

  const logoutFun = () => {
    sessionStorage.clear()
    setUserDetails(null)
    navigate('/')
  }

  return (
    <>
      <div className='relative mb-4 flex md:flex-row flex-col-reverse justify-between gap-y-2 md:items-end text-sm'>

        <div className='flex flex-col gap-3'>

          {headerText && <h1 className='text-3xl font-normal text-gray-600'>{headerText}</h1>}

          <div className='flex gap-2 items-center'>
            <div onClick={() => setNavToggle(!navToggle)} className='p-2.5 cursor-pointer rounded-md bg-white w-max'><FaBars /></div>

            <div className='flex items-center font-[400] w-max bg-white p-2 rounded-md'>
              <span className='text-gray-700 font-[500] flex items-center gap-1 cursor-pointer' onClick={() => navigate('/dashboard')}><FaHome /> Home</span>
              <span className='text-zinc-500 text-xl'><RxCaretRight /></span>
              <span className='text-gray-500'>{headerRoute}</span>
            </div>
          </div>

        </div>

        <div onClick={() => setToggle(!toggle)} className='cursor-pointer flex items-center gap-2 bg-white md:w-auto w-max rounded-full px-1.5 py-1'>
          <img src={image} onError={() => setImage(profile)} alt="" srcset="" />
          <span>{userDetails?.first_name}&nbsp;{userDetails?.last_name}</span>
          &nbsp;
          <span className={`transition-all duration-200 ${toggle ? 'rotate-180' : 'rotate-0'}`}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 19C14.9706 19 19 14.9706 19 10C19 5.02944 14.9706 1 10 1C5.02944 1 1 5.02944 1 10C1 14.9706 5.02944 19 10 19Z" stroke="#201F27" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M7 9L10 12L13 9" stroke="#201F27" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>

        </div>

        {toggle && <div className="w-full h-screen bg-black/10 absolute z-50  top-[4em] flex md:justify-end" onClick={() => setToggle(false)}>
          <ul className='bg-[#ffffff] h-max flex flex-col gap-3 text-lg font-normal rounded-lg py-2'>
            {
              profileMenu?.map((elem, index) =>
                <>
                  <li key={index} className='cursor-pointer'>
                    <NavLink
                      to={elem?.path || null}
                      className={({ isActive }) =>
                        (isActive ? ` ` : " ") + `hover:bg-gray-100 py-2 px-4 pr-7 select-none ` + 'flex gap-3 items-center'}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <span>{elem?.icon}</span>
                      <span className='text-sm'>{elem.name}</span>
                    </NavLink>
                  </li>
                </>)
            }
            <li className='cursor-pointer'>
              <div className={`hover:bg-gray-100 py-2 px-4 pr-7 select-none flex gap-3 items-center`} onClick={() => logoutFun()} >
                <span> <HiOutlineLogout /></span>
                <span className='text-sm'>Logout</span>
              </div>
            </li>
          </ul>
        </div>}

      </div>
    </>
  )
}

export default Header