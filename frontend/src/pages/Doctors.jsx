import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate, useParams } from 'react-router-dom'

const Doctors = () => {

  const { speciality } = useParams()
  const [filerDoc, setFilerDoc] = useState([])
  const navigate = useNavigate()

  const {doctors} = useContext(AppContext)

  const applyFilter = () => {
    if (speciality) {
     setFilerDoc(doctors.filter(doc => doc.speciality === speciality))
    } else{
      setFilerDoc(doctors)
    }
  }

  useEffect(() =>{
    applyFilter()
  },[doctors, speciality])

  return (
    <div className='text-gray-600'>
      <p>Browse through the doctors specialist.</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5' >
        <div className=' flex flex-col gap-4 text-sm text-gray-600 '>
          <p onClick={() => speciality === 'General physician' ? navigate('/doctors') : navigate('/doctors/General physician')} className={'w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "General physician" ? "bg-indigo-100 text-black"}'}>General physician</p>
          <p onClick={() => speciality === 'Gynecologist' ? navigate('/doctors') : navigate('/doctors/Gynecologist')} className={'w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Gynecologist" ? "bg-indigo-100 text-black"}'}>Gynecologist</p>
          <p onClick={() => speciality === 'Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist')} className={'w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Dermatologist" ? "bg-indigo-100 text-black"}'}>Dermatologist</p>
          <p onClick={() => speciality === 'Pediatricians' ? navigate('/doctors') : navigate('/doctors/Pediatricians')} className={'w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Pediatricians" ? "bg-indigo-100 text-black"}'}>Pediatricians</p>
          <p onClick={() => speciality === 'Neurologist' ? navigate('/doctors') : navigate('/doctors/Neurologist')} className={'w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Neurologist" ? "bg-indigo-100 text-black"}'}>Neurologist</p>
          <p onClick={() => speciality === 'Gastroenterologist' ? navigate('/doctors') : navigate('/doctors/Gastroenterologist')} className={'w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Gastroenterologist" ? "bg-indigo-100 text-black"}'}>Gastroenterologist</p>
        </div>
        <div className='w-full grid grid-cols-auto gap-4 gap-y-6 '>
          {
            filerDoc.map((item, index) => (
              <div onClick={() => navigate(`/appointments/${item._id}`)}
  className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:transform hover:scale-105 transition-transform duration-500' 
  key={index}
>
  <img className='bg-blue-50 w-full h-auto' src={item.image} alt='' />
  <div className='p-4'>
    <div className='flex items-center gap-1 text-sm text-center text-green-500'>
      <p className='w-2 h-2 rounded-full bg-green-500'></p>
      <p>Available</p>
    </div>
    <p className='text-gray-900 text-lg font-medium '>{item.name}</p>
    <p className='text-gray-600 text-sm'>{item.speciality}</p>
  </div>
</div>

            ))
          }
        </div>
      </div>
  
    </div>
  )
}

export default Doctors
