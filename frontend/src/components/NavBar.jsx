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
      <div onClick={() => navigate('/')} className='cursor-pointer font-bold text-primary flex items-center gap-2 text-2xl'> MediBook </div> 

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
      </div>
    </div>
  );
}

export default NavBar;
