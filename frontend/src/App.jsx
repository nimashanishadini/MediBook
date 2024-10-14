import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import MyProfile from './pages/MyProfile'
import MyAppoinments from './pages/MyAppoinments'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Appointments from './pages/Appointments'
import Payment from './components/payment'



const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/doctors/:speciality' element={<Doctors />} />
        <Route path='/login' element={<Login />} />
        <Route path='/myprofile' element={<MyProfile />} />
        <Route path='/myappoinments' element={<MyAppoinments />} />
        <Route path='/appointments/:docId' element={<Appointments />} /> 
        <Route path='/payment' element={<Payment />} />
      
    
      </Routes>
      <Footer/>
    
    </div>
  )
}

export default App
