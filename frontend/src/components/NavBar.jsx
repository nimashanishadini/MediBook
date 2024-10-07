import React, { useState } from 'react';  
import { assets } from '../assets/assets';
import { NavLink, useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();

  // State hooks
  const [showMenu, setShowMenu] = useState(false);
  const [token, setToken] = useState(true);

  return (
    <div className='flex items-center justify-between text-sm py-5 mb-5 border-b border-b-gray-400'>
      {/* Logo */}
      <div onClick={() => navigate('/')} className=' cursor-pointer font-bold text-primary flex items-center gap-2 text-2xl'> MediBook </div> 

      {/* Navigation Links */}
      <ul className='hidden md:flex gap-5 items-start font-medium'>
        <NavLink to='/'>
          <li className='py-1'>HOME</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>

        <NavLink to='/doctors'>
          <li className='py-1'>ALL DOCTORS</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>

        <NavLink to='/about'>
          <li className='py-1'>ABOUT</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>

        <NavLink to='/contact'>
          <li className='py-1'>CONTACT</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>
      </ul>

      {/* Profile Section */}
      <div className='flex items-center gap-4'>
        {token ? 
          <div className='flex items-center gap-2 cursor-pointer group relative'>
            <img src={assets.profile_pic} alt='' className='w-8 h-8 rounded-full'/>
            <img src={assets.dropdown_icon} alt='Dropdown' className='w-4 h-4'/>
            
          <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 hidden group-hover:block  '>
            <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
              <p onClick={()=>navigate('myprofile')} className='hover:text-black cursor-pointer'>My Profile</p>
              <p onClick={()=>navigate('myappoinments')}className='hover:text-black cursor-pointer'>My Appoinments</p>
              <p onClick={()=>setToken(false)}className='hover:text-black cursor-pointer'>Logout</p>
            </div>


          </div>



          </div>
         : 
          <button  onClick={() => navigate('/login')} 
            className='bg-primary text-white px-8 py-3 rounded-full hidden font-light md:block'>
            Create Account
          </button>
        }

        <img src={assets.menu_icon} alt='Menu' className='w-6 h-6 md:hidden cursor-pointer' onClick={()=>setShowMenu(true)}/>
        {/*mobile menu-------*/}
        <div className={`${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
  <div className='flex items-center justify-between px-5 py-6'>
    <p className='cursor-pointer font-bold text-primary flex items-center gap-2 text-2xl' > MediBook</p>
    <img className='w-7' src={assets.cross_icon} alt='Cross' onClick={() => setShowMenu(false)} />
  </div>
  <ul className='flex flex-col items-center gap-5 font-medium text-lg '>
    <NavLink  onClick={() => setShowMenu(false)} to='/'><p className='px-4 py-2 rounded  inline-block'>HOME</p></NavLink>
    <NavLink  onClick={() => setShowMenu(false)} to='/doctors'><p className='px-4 py-2 rounded  inline-block'>ALL DOCTORS</p></NavLink>
    <NavLink  onClick={() => setShowMenu(false)} to='/about'><p className='px-4 py-2 rounded  inline-block'>ABOUT</p></NavLink>
    <NavLink  onClick={() => setShowMenu(false)} to='/contact'><p className='px-4 py-2 rounded  inline-block'>CONTACT</p></NavLink>
  </ul>
</div>

      </div>
    </div>
  );
}

export default NavBar;
