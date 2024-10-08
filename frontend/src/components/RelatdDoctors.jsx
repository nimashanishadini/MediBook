import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const RelatedDoctors = ({ speciality }) => { // Assuming speciality is passed as a prop
  const { doctors } = useContext(AppContext)
  const [relDocs, setRelDocs] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter((doc) => doc.speciality === speciality)
      setRelDocs(doctorsData) // Update the state with filtered doctors
    }
  }, [doctors, speciality])

  return (
  
      <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
      <h1 className='text-3xl font-medium'>Top Doctors to Book</h1>
      <p className='sm:w-1/3 text-center text-sm'>Simply browse through our extensive list of trusted doctors.</p>
      
      <div className='w-full grid grid-cols-5 sm:grid-cols-5 gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
        {relDocs.slice(0,5).map((item, index) => (
          <div onClick={()=> {navigate(`/appointments/${item._id}`); scrollTo(0,0)}}
            className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:transform hover:scale-105 transition-transform duration-500' 
            key={index}
          >
            <img className='bg-blue-50 w-full h-auto' src={item.image} alt={item.name} />
            <div className='p-4'>
              <div className='flex items-center gap-1 text-sm text-center text-green-500'>
                <p className='w-2 h-2 rounded-full bg-green-500'></p>
                <p>Available</p>
              </div>
              <p className='text-gray-900 text-lg font-medium '>{item.name}</p>
              <p className='text-gray-600 text-sm'>{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>

      <button onClick={()=> {navigate('/doctors'); scrollTo(0,0)}} className='bg-blue-400 text-gray-600 px-12 py-3 rounded-full mt-10'>
        More
      </button>
    </div>
 
  )
}

export default RelatedDoctors
