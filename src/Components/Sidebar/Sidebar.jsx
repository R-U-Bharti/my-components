
// 👉 Importing Packages 👈
import RecursiveMenu from './RecursiveMenu';
import { useNavigate } from 'react-router-dom';
import { IoIosDocument } from 'react-icons/io';
import { SlMagnifier, SlPeople } from 'react-icons/sl';
import { TiGroup } from 'react-icons/ti';
import { FaExpandArrowsAlt, FaTruck, FaUser } from 'react-icons/fa';
import { ImCart, ImHammer2 } from 'react-icons/im';
import { RiDashboardFill } from 'react-icons/ri';
import { IoPersonOutline } from 'react-icons/io5';
import { GoAlertFill, GoArrowSwitch } from 'react-icons/go';
import { PiMapPinFill } from 'react-icons/pi';
import { HiWrenchScrewdriver } from 'react-icons/hi2';
import { useContext } from 'react';
import { contextVar } from '@/Context/contextVar';

const SideBar = () => {

    const navigate = useNavigate()

    const { navToggle, setNavToggle } = useContext(contextVar)

    const menus = [
        {
            icon: <IoIosDocument />, name: "Reports", path: "", subMenu: [
                { name: "LR Register", path: "", subMenu: [] },
                {
                    name: "Customers Reports", path: "", subMenu: [
                        { name: "Unbilled Report", path: "", subMenu: [] },
                        { name: "Billing Report", path: "", subMenu: [] },
                    ]
                },
                {
                    name: "Vendor Reports", path: "", subMenu: [
                        { name: "Unbilled Report", path: "", subMenu: [] },
                        { name: "Vendor Billing Report", path: "", subMenu: [] },
                        { name: "History Report", path: "", subMenu: [] },
                        { name: "TDS Report", path: "", subMenu: [] },
                    ]
                },
                {
                    name: "Finance Reports", path: "", subMenu: [
                        { name: "LR Wise Outstanding", path: "", subMenu: [] },
                        { name: "Customer Wise Outstanding", path: "", subMenu: [] },
                        { name: "Trip Settelment Register", path: "", subMenu: [] },
                        { name: "Vendor Outstanding Report", path: "", subMenu: [] },
                        { name: "All Driver Transfer Report", path: "", subMenu: [] },
                    ]
                },
                {
                    name: "Vehicle Performance Reports", path: "", subMenu: [
                        { name: "Vehicle wise Cost Per Km", path: "", subMenu: [] },
                        { name: "Vehicle Contribution Report", path: "", subMenu: [] },
                        { name: "Own Vehicle Profitability Report", path: "", subMenu: [] },
                        { name: "Market Vehicle Profitability Report", path: "", subMenu: [] },
                    ]
                },
            ]
        },
        {
            icon: <SlPeople />, name: "Customer", path: "", subMenu: [
                { name: "Add Customer", path: "/customer/addCustomer", subMenu: [] },
                { name: "View Customer", path: "/customer/viewCustomer", subMenu: [] },
                { name: "Add Consignor /Consignee", path: "/customer/addConsignorConsignee", subMenu: [] },
                { name: "View Consignor /Consignee", path: "", subMenu: [] },
                { name: "Add Contact", path: "/customer/addCustomerContact", subMenu: [] },
                { name: "View Contact", path: "", subMenu: [] },
            ]
        },
        {
            icon: <TiGroup />, name: "Vendor", path: "", subMenu: [
                { name: "Add Vendor", path: "/vendor/addVendor", subMenu: [] },
                { name: "View Vendor", path: "", subMenu: [] },
                { name: "Pair Truck Vendor", path: "", subMenu: [] },
                { name: "Pair Market Truck Driver", path: "", subMenu: [] },
                { name: "Unpair Market Truck Driver", path: "", subMenu: [] },
                { name: "Unpair Market Truck Vendor", path: "", subMenu: [] },
            ]
        },
        {
            icon: <FaExpandArrowsAlt />, name: "Reverse Auction", path: "", subMenu: [
                { name: "Send Inquiry to Vendors", path: "", subMenu: [] },
                { name: "Vendor Quotes", path: "", subMenu: [] },
                { name: "Inquiry's Auction History", path: "", subMenu: [] },
                { name: "Vendor's Auction History", path: "", subMenu: [] },
            ]
        },
        {
            icon: <ImHammer2 />, name: "Contract", path: "", subMenu: [
                { name: "Add Contract", path: "", subMenu: [] },
                { name: "View Contract List", path: "", subMenu: [] },
            ]
        },
        {
            icon: <RiDashboardFill />, name: "Inquiry", path: "", subMenu: [
                { name: "Add Inquiry", path: "/inquiry/addInquiry", subMenu: [] },
                {
                    name: "Inquiry table", path: "", subMenu: [
                        { name: "Inquiry", path: "", subMenu: [] },
                        { name: "Indent", path: "", subMenu: [] },
                    ]
                },
                {
                    name: "Break Down Inquiry", path: "", subMenu: [
                        { name: "Unverified Break Down", path: "", subMenu: [] },
                        { name: "Verified Break Down", path: "", subMenu: [] },
                    ]
                },
                { name: "Placement Table", path: "", subMenu: [] },
            ]
        },
        {
            icon: <FaTruck />, name: "Trucks", path: "", subMenu: [
                { name: "Add Trucks", path: "/trucks/addTruck", subMenu: [] },
                { name: "View Trucks", path: "", subMenu: [] },
                { name: "Add Truck Tyre", path: "", subMenu: [] },
                { name: "Pair Truck Driver", path: "/trucks/pairTruckDriver", subMenu: [] },
                { name: "Unpair Truck Driver", path: "/trucks/unpairTruckDriver", subMenu: [] },
                { name: "Truck Driver Rate Master", path: "", subMenu: [] },
            ]
        },
        {
            icon: <IoPersonOutline />, name: "Driver", path: "", subMenu: [
                { name: "Add Driver", path: "/driver/addDriver", subMenu: [] },
                { name: "View Driver", path: "", subMenu: [] },
            ]
        },
        {
            icon: <GoArrowSwitch />, name: "Allocation", path: "", subMenu: [
                { name: "Placement", path: "", subMenu: [] },
                { name: "Trip Costing", path: "", subMenu: [] },
                { name: "Paired Truck Driver Status", path: "", subMenu: [] },
                { name: "Stand Alone SLA", path: "", subMenu: [] },
                { name: "SLA Detailed Report", path: "", subMenu: [] },
            ]
        },
        {
            icon: <ImCart />, name: "Shipments", path: "", subMenu: [
                { name: "Quick Shipment", path: "", subMenu: [] },
                { name: "All Shipments", path: "", subMenu: [] },
                { name: "Shipment Pre Pickup", path: "", subMenu: [] },
                { name: "Complete Loading", path: "", subMenu: [] },
                { name: "Complete Unloading", path: "", subMenu: [] },
                { name: "Upload POD", path: "", subMenu: [] },
            ]
        },
        {
            icon: <GoAlertFill />, name: "Alerts", path: "", subMenu: [
                { name: "Overview", path: "", subMenu: [] },
                { name: "Alerts", path: "", subMenu: [] },
                { name: "Shipment", path: "", subMenu: [] },
                { name: "Reports", path: "", subMenu: [] },
            ]
        },
        {
            icon: <PiMapPinFill />, name: "GPS", path: "", subMenu: [
                { name: "Fill Form", path: "", subMenu: [] },
                { name: "Upload Form", path: "", subMenu: [] },
                { name: "GPS Raw Data", path: "", subMenu: [] },
                { name: "Map", path: "", subMenu: [] },
                { name: "Search Nearest Gps", path: "", subMenu: [] },
                { name: "Shipment ETA Report", path: "", subMenu: [] },
                { name: "Sim Swap", path: "", subMenu: [] },
            ]
        },
        {
            icon: <PiMapPinFill />, name: "GPS Analytics", path: "", subMenu: [
                { name: "GPS Raw Analytics", path: "", subMenu: [] },
                { name: "GPS Summary Report", path: "", subMenu: [] },
                { name: "Vehicle Daily Log Report", path: "", subMenu: [] },
            ]
        },
        {
            icon: <HiWrenchScrewdriver />, name: "Repair", path: "", subMenu: [
                { name: "Spare Tyre", path: "", subMenu: [] },
                { name: "Spare Tyre Table", path: "", subMenu: [] },
            ]
        },
        { icon: <SlMagnifier />, name: "Daily Shipment Report", path: "/daily", subMenu: [] },
        {
            icon: <FaUser />, name: "Custom User", path: "", subMenu: [
                { name: "Add Customer User", path: "", subMenu: [] },
                { name: "View Users", path: "", subMenu: [] },
            ]
        }
    ]

    let mcolor = '#e6f7ff'    // menu color
    let tcolor = '#1890ff'      // text color

    // 👉 CSS constants 👈
    const menuStyle = `block py-2 px-4 hover:bg-[${mcolor}] hover:text-[${tcolor}] rounded-md animate__animated animate__fadeIn animate__faster `
    const subMenuStyle = `block w-full py-2 clear-both whitespace-nowrap hover:text-[${tcolor}] rounded-md animate__animated animate__fadeIn animate__faster `

    return (
        <>
            <nav className='w-full *:select-none *:focus:outline-none'>

                <header className={`${navToggle ? 'px-4' : 'px-2 justify-center'} py-2 flex items-center gap-2 font-semibold mb-4 mt-2 cursor-pointer`} onClick={() => navigate('/dashboard')}>
                    <img src='/logo.svg' className={`w-9 after:content-['Future Logic']`} alt="" srcset="" />
                    <span className={`md:text-lg text-sm ${navToggle ? 'block' : 'hidden'}`}>Future Logic</span>
                </header>

                <RecursiveMenu
                    mcolor={mcolor}
                    tcolor={tcolor}
                    navToggle={navToggle}
                    menus={menus}
                    menuStyle={menuStyle}
                    subMenuStyle={subMenuStyle}
                />

            </nav>
        </>
    )
}
export default SideBar