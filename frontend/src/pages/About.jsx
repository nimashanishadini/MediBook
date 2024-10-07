import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>
      
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p> ABOUT <span className='text-gray-700 font-medium'>US</span></p>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-12'>
        <img className='w-full md:max-w-[360px]' src={assets.about_image} alt=''/>
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
          <p>MediBook offers a comprehensive platform for booking doctor 
            appointments with ease. Users can search for doctors by specialty, location, and availability, view detailed profiles, and book appointments instantly. </p>
          <p>The app provides online consultations, appointment reminders, and secure health record storage. With features like prescription management and emergency services, 
            MediBook simplifies healthcare, ensuring a seamless experience
             for both patients and doctors.</p>
          <b className='text-gray-800'>Our Vision </b>
          <p> MediBook envisions a future where healthcare is accessible, efficient, and patient-centered. By leveraging technology, the platform aims to empower individuals to seamlessly
             manage their health, connect with the best medical professionals, and receive care without barriers. MediBook strives to transform healthcare by simplifying the patient experience, 
              improving care coordination, and fostering a healthier,
             more connected society.</p>
        </div>
      </div>

      <div className='text-xl my-4'>
        <p> Why <span className='text-gray-700 font-semibold'> Choose Us </span></p>
      </div>

      <div className='flex flex-col md:flex-row gap-5  mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300text-gray-600 cursor-pointer'>
          <b>Efficiency:</b>
          <p>Streamlined Appoinments Scheduling <br/>That Fits Into Your Busy Lifestyle.</p>
        </div>

        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300text-gray-600 cursor-pointer'>
          <b>Convenience</b>
          <p>Access To A Network Of Trusted <br/> heathcare professsionals in your area.</p>
        </div>

        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300text-gray-600 cursor-pointer'>
          <b>Personalization</b>
          <p>Yailored recommendations and remainders to help you stay on top of your health</p>
        </div>
      </div>
    </div>
  )
}

export default About
