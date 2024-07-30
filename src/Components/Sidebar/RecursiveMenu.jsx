import { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { RxCaretRight } from 'react-icons/rx';
import { TbCaretRightFilled } from 'react-icons/tb';
import { MdOutlineDashboard } from 'react-icons/md';
import { contextVar } from '@/Context/contextVar';

const RecursiveMenu = ({ menus, menuStyle, subMenuStyle, navToggle }) => {

    const { setNavToggle } = useContext(contextVar)

    const [openMenus, setOpenMenus] = useState([]);

    const handleClick = (item, clear) => {

        if (item.path && window.innerWidth < 768 && navToggle)
            setNavToggle(false)

        if (item.subMenu.length === 0) {
            return;
        }

        if (!navToggle)
            setNavToggle(true)

        const isOpen = openMenus.includes(item.name);
        if (isOpen) {
            setOpenMenus(openMenus.filter(name => name !== item.name));
        } else {
            if (clear) {
                setOpenMenus([item.name])
            } else {
                setOpenMenus([...openMenus, item.name]);
            }
        }

    };


    useEffect(() => {
        !navToggle && setOpenMenus([])
    }, [navToggle])

    const renderSubMenu = (subMenus) => {
        return (
            <ul className={`text-sm block rounded rounded-t-none top-full pl-6 py-0.5 ltr:text-left rtl:text-right bg-[#1b334f] pr-3`}>
                {subMenus.map((subItem, index) => (
                    <li key={index} className="relative cursor-pointer">
                        <NavLink
                            to={subItem?.path || null}
                            className={({ isActive }) =>
                                ((isActive && openMenus.includes(subItem.name)) ? `font-bold text-[#1890ff] ` : " ") + `${subMenuStyle} ` + 'flex gap-3 items-center'}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleClick(subItem);
                            }}
                        >
                            {(subItem.subMenu.length > 0) &&
                                <span className={((openMenus.includes(subItem.name)) ? 'transition-all duration-200 ease-in-out rotate-90' : 'transition-all duration-200 ease-in-out rotate-0') + `${!navToggle && 'hidden'}`}><TbCaretRightFilled /></span>}
                            <span className='text-sm'>{subItem.name}</span>
                        </NavLink>
                        {subItem.subMenu && subItem.subMenu.length > 0 && openMenus.includes(subItem.name) && renderSubMenu(subItem.subMenu)}
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <ul id="side-menu" className={`w-full float-none flex flex-col ${!navToggle ? 'items-center' : ''}`}>
            {menus.map((item, index) => (
                <li key={index} className='relative cursor-pointer mb-1 ' onClick={() => handleClick(item)}>
                    <NavLink
                        to={item.path || null}
                        className={({ isActive }) =>
                            ((isActive && item.subMenu.length === 0) ? `bg-[#e6f7ff] text-[#1890ff] ` : " ") + `${menuStyle} ` + 'flex gap-4 items-center'}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleClick(item, true);
                        }}
                    >
                        <span className='text-lg'>{item.icon || <MdOutlineDashboard />}</span>
                        <div className={`flex justify-between items-center flex-1 ${!navToggle && ' hidden'}`}>
                            <span className='text-sm'>{item.name}</span>
                            {(item.path == null || item.path === '') && <span className={((openMenus.includes(item.name)) ? 'transition-all duration-200 ease-in-out rotate-90' : 'transition-all duration-200 ease-in-out rotate-0') + (item.subMenu && item.subMenu.length > 0 && openMenus.includes(item.name) ? '' : ' pl-14')}><RxCaretRight /></span>}
                        </div>
                    </NavLink>
                    {item.subMenu && item.subMenu.length > 0 && openMenus.includes(item.name) && renderSubMenu(item.subMenu)}
                </li>
            ))}
        </ul>
    );
};

export default RecursiveMenu;
