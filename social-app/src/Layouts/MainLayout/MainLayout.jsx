import { Outlet } from 'react-router-dom'
import Footer from '../../components/Footer/Footer'
import Navbar from '../../components/Navbar/Navbar'
import Sidebar from '../../components/Sidebar/Sidebar'

export default function MainLayout() {
  return (
    <>
    <Navbar/>
    <Outlet/>
    <Footer/>
    </>
  )
}
