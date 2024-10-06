import React from 'react'

const Footer = () => {
  return (
    <div className='md:mx-10'>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
      {/*------left side    */}
      <div>
        <p className='cursor-pointer font-bold text-primary flex items-center gap-2 text-2xl mb-5'>MediBook</p>
        <p className='w-full md:w-2/3 text-gray-600 leading-6 '>MediBook offers a comprehensive platform for booking doctor 
        appointments with ease. Users can search for doctors by specialty, location, and availability, view detailed profiles,
         and book appointments instantly. The app provides online consultations, appointment reminders, and secure health record 
         storage. With features like prescription management and emergency services, 
        MediBook simplifies healthcare, ensuring a seamless experience for both patients and doctors.</p>
        </div>

      {/*------center side    */}
      <div>
        <p className='text-xl font-medium mb-5'>COMPANY</p>
        <ul className='flex flex-col gap-2 text-gray-600'>
            <li>Home</li>
            <li>About Us</li>
            <li>Contact Us</li>
            <li>Privacy Policy</li>
        </ul>

      </div>

      {/*------right side    */}
      <div>
        <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
        <ul className='flex flex-col gap-2 text-gray-600'>
            <li>+94 5125-562-545 </li>
            <li>medibook@gmail.com</li>
        </ul>
    </div>
</div>

<div>
    {/*------bottom side    */}
    <hr/>
    <p className='py-5 text-sm text-center'>© 2023 MediBook. All Rights Reserved.</p>
</div>


</div>


  )
}

export default Footer
